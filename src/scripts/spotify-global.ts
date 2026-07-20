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
	panelOpen: boolean;
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

/** Compact bar for header play/pause only (panel uses full official iframe). */
const API_EMBED_WIDTH = 320;
const API_EMBED_HEIGHT = 152;

function state(): SpotifyGlobal {
	if (!window.__spotifyGlobal) {
		window.__spotifyGlobal = {
			controller: null,
			embedReady: false,
			booting: false,
			pendingPlay: false,
			lastPaused: true,
			panelOpen: false,
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
		close: document.querySelector<HTMLButtonElement>('[data-spotify-float-close]'),
		openLink: document.querySelector<HTMLAnchorElement>('[data-spotify-open]'),
		root: document.getElementById('spotify-global-root'),
	};
}

function apiHost(): HTMLElement | null {
	return document.getElementById('spotify-api-host');
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

function setFloatOpen(open: boolean) {
	const s = state();
	const { root } = ui();
	s.panelOpen = open;
	if (!root) return;
	root.dataset.open = open ? 'true' : 'false';
	root.setAttribute('aria-hidden', open ? 'false' : 'true');

	if (open && s.controller && !s.lastPaused) {
		s.controller.pause();
		applyPaused(true);
	}
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

function ensureApiPlayer() {
	const host = apiHost();
	const s = state();
	if (!host || s.controller || s.booting) return;

	s.booting = true;
	const url = host.dataset.spotifyUrl;
	const uri = host.dataset.spotifyUri;
	const options: { width: number; height: number; uri?: string; url?: string } = {
		width: API_EMBED_WIDTH,
		height: API_EMBED_HEIGHT,
	};
	if (url) options.url = url;
	else if (uri) options.uri = uri;

	void whenApi().then((api) => {
		if (s.controller) return;
		api.createController(host, options, wire);
	});
}

function togglePlay() {
	const s = state();
	ensureApiPlayer();

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
}

function bindUi() {
	const s = state();
	const { btn, close, openLink } = ui();

	s.uiAbort?.abort();
	s.uiAbort = new AbortController();
	const { signal } = s.uiAbort;

	btn?.addEventListener('click', togglePlay, { signal });

	close?.addEventListener('click', () => setFloatOpen(false), { signal });

	openLink?.addEventListener(
		'click',
		(e) => {
			e.preventDefault();
			setFloatOpen(true);
		},
		{ signal },
	);

	setUi(s.embedReady ? (s.lastPaused ? 'paused' : 'playing') : 'paused');
	setFloatOpen(s.panelOpen);
}

function init() {
	if (!apiHost()) return;
	bindUi();
}

window.__spotifyGlobalInit = init;

init();
document.addEventListener('astro:page-load', init);
