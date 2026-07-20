type PlaybackData = {
	isPaused?: boolean;
	is_paused?: boolean;
	isBuffering?: boolean;
};

type SpotifyEmbedController = {
	resume: () => void;
	pause: () => void;
	addListener: (event: string, cb: (payload: { data?: PlaybackData }) => void) => void;
};

type SpotifyIFrameAPI = {
	createController: (
		element: HTMLElement,
		options: { uri?: string; url?: string; width: number; height: number },
		callback: (controller: SpotifyEmbedController) => void,
	) => void;
};

type PlayerState = 'paused' | 'playing' | 'loading';

type SpotifyGlobal = {
	controller: SpotifyEmbedController | null;
	embedReady: boolean;
	booting: boolean;
	pendingPlay: boolean;
	lastPaused: boolean;
	uiAbort: AbortController | null;
};

declare global {
	interface Window {
		__spotifyIframeApi?: SpotifyIFrameAPI;
		__spotifyHdrBoot?: Array<(api: SpotifyIFrameAPI) => void>;
		__spotifyGlobal?: SpotifyGlobal;
		__spotifyGlobalInit?: () => void;
		onSpotifyIframeApiReady?: (api: SpotifyIFrameAPI) => void;
	}
}

const EMBED_WIDTH = 860;
const EMBED_HEIGHT = 380;

function state(): SpotifyGlobal {
	if (!window.__spotifyGlobal) {
		window.__spotifyGlobal = {
			controller: null,
			embedReady: false,
			booting: false,
			pendingPlay: false,
			lastPaused: true,
			uiAbort: null,
		};
	}
	return window.__spotifyGlobal;
}

function whenApi(): Promise<SpotifyIFrameAPI> {
	if (window.__spotifyIframeApi) return Promise.resolve(window.__spotifyIframeApi);
	return new Promise((resolve) => {
		(window.__spotifyHdrBoot = window.__spotifyHdrBoot || []).push(resolve);
	});
}

function isPaused(data?: PlaybackData): boolean | null {
	if (!data) return null;
	if (typeof data.isPaused === 'boolean') return data.isPaused;
	if (typeof data.is_paused === 'boolean') return data.is_paused;
	return null;
}

function ui() {
	return {
		btn: document.querySelector<HTMLButtonElement>('[data-hdr-play]'),
		eq: document.querySelector<HTMLElement>('[data-eq]'),
	};
}

function setEq(playing: boolean) {
	const { eq } = ui();
	if (eq) eq.classList.toggle('hdr-eq--active', playing);
}

function setUi(playerState: PlayerState) {
	const { btn } = ui();
	if (!btn) return;
	btn.dataset.state = playerState;
	const label =
		playerState === 'playing' ? 'Pause' : playerState === 'loading' ? 'Connecting' : 'Play';
	btn.setAttribute('aria-label', label);
	btn.setAttribute('aria-busy', playerState === 'loading' ? 'true' : 'false');
	setEq(playerState === 'playing');
}

function applyPaused(paused: boolean) {
	const s = state();
	s.lastPaused = paused;
	s.pendingPlay = false;
	setUi(paused ? 'paused' : 'playing');
}

function wire(ctrl: SpotifyEmbedController) {
	const s = state();
	s.controller = ctrl;

	ctrl.addListener('ready', () => {
		s.embedReady = true;
		s.booting = false;
		if (s.pendingPlay) {
			setUi('loading');
			ctrl.resume();
		} else {
			applyPaused(s.lastPaused);
		}
	});

	ctrl.addListener('playback_started', () => applyPaused(false));

	ctrl.addListener('playback_update', (e) => {
		if (e.data?.isBuffering) {
			setUi('loading');
			return;
		}
		const p = isPaused(e.data);
		if (p !== null) applyPaused(p);
	});
}

function ensurePlayer(host: HTMLElement) {
	const s = state();
	if (s.controller || s.booting) return;

	s.booting = true;
	const url = host.dataset.spotifyUrl;
	const uri = host.dataset.spotifyUri;
	const options: { width: number; height: number; uri?: string; url?: string } = {
		width: EMBED_WIDTH,
		height: EMBED_HEIGHT,
	};
	if (url) options.url = url;
	else if (uri) options.uri = uri;

	void whenApi().then((api) => {
		if (s.controller) return;
		api.createController(host, options, wire);
	});
}

let layoutBound = false;
let positionRaf = 0;
let slotObserver: ResizeObserver | null = null;

function mountRootOnBody() {
	const root = document.getElementById('spotify-global-root');
	if (!root || root.parentElement === document.body) return;
	document.body.appendChild(root);
}

/** One iframe on <body>; on /music align over the slot (never inside a clipped wrapper). */
function syncPlayerLayout() {
	const root = document.getElementById('spotify-global-root');
	const slot = document.querySelector<HTMLElement>('[data-spotify-global-slot]');
	if (!root) return;

	mountRootOnBody();

	if (slot) {
		const r = slot.getBoundingClientRect();
		if (r.width < 8) {
			schedulePlayerLayout();
			return;
		}
		root.classList.add('spotify-global-root--page');
		root.classList.remove('spotify-global-root--dock');
		root.style.top = `${Math.round(r.top)}px`;
		root.style.left = `${Math.round(r.left)}px`;
		root.style.width = `${Math.round(r.width)}px`;
		root.setAttribute('aria-hidden', 'false');
		document.body.dataset.spotifyView = 'music';
	} else {
		root.classList.add('spotify-global-root--dock');
		root.classList.remove('spotify-global-root--page');
		root.style.top = '';
		root.style.left = '';
		root.style.width = '';
		root.setAttribute('aria-hidden', 'true');
		delete document.body.dataset.spotifyView;
	}
}

function watchMusicSlot() {
	const slot = document.querySelector<HTMLElement>('[data-spotify-global-slot]');
	slotObserver?.disconnect();
	slotObserver = null;
	if (!slot) return;
	slotObserver = new ResizeObserver(() => schedulePlayerLayout());
	slotObserver.observe(slot);
}

function schedulePlayerLayout() {
	cancelAnimationFrame(positionRaf);
	positionRaf = requestAnimationFrame(syncPlayerLayout);
}

function bindLayoutListeners() {
	if (layoutBound) return;
	layoutBound = true;
	window.addEventListener('resize', schedulePlayerLayout, { passive: true });
	window.addEventListener('scroll', schedulePlayerLayout, { passive: true });
	document.addEventListener('astro:page-load', () => {
		schedulePlayerLayout();
		watchMusicSlot();
	});
}

function bindUi() {
	const s = state();
	const { btn } = ui();
	if (!btn) return;

	s.uiAbort?.abort();
	s.uiAbort = new AbortController();

	btn.addEventListener(
		'click',
		() => {
			const host = document.getElementById('spotify-global-host');
			if (host) ensurePlayer(host);

			if (!s.controller || !s.embedReady) {
				s.pendingPlay = true;
				setUi('loading');
				return;
			}

			if (s.lastPaused) {
				setUi('loading');
				s.controller.resume();
			} else {
				s.controller.pause();
			}
		},
		{ signal: s.uiAbort.signal },
	);

	setUi(s.embedReady ? (s.lastPaused ? 'paused' : 'playing') : 'paused');
}

function init() {
	const host = document.getElementById('spotify-global-host');
	if (!host) return;

	bindLayoutListeners();
	watchMusicSlot();
	requestAnimationFrame(() => {
		requestAnimationFrame(schedulePlayerLayout);
	});
	ensurePlayer(host);
	bindUi();
}

window.__spotifyGlobalInit = init;

init();
document.addEventListener('astro:page-load', init);
