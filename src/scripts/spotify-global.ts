type PlaybackData = {
	isPaused?: boolean;
	is_paused?: boolean;
	isBuffering?: boolean;
};

type SpotifyEmbedController = {
	resume: () => void;
	pause: () => void;
	togglePlay: () => void;
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
	started: boolean;
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

const W = 300;
const H = 80;

function g(): SpotifyGlobal {
	if (!window.__spotifyGlobal) {
		window.__spotifyGlobal = {
			controller: null,
			embedReady: false,
			started: false,
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

function paused(data?: PlaybackData): boolean | null {
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

function setEq(on: boolean) {
	const { eq } = ui();
	if (eq) eq.classList.toggle('hdr-eq--active', on);
}

function setState(state: PlayerState) {
	const { btn } = ui();
	if (!btn) return;
	btn.dataset.state = state;
	const label =
		state === 'playing' ? 'Pause' : state === 'loading' ? 'Connecting' : 'Play';
	btn.setAttribute('aria-label', label);
	btn.setAttribute('aria-busy', state === 'loading' ? 'true' : 'false');
	setEq(state === 'playing');
}

function applyPaused(isPaused: boolean) {
	const state = g();
	state.lastPaused = isPaused;
	state.pendingPlay = false;
	setState(isPaused ? 'paused' : 'playing');
}

function wire(ctrl: SpotifyEmbedController) {
	const state = g();
	state.controller = ctrl;

	ctrl.addListener('ready', () => {
		state.embedReady = true;
		if (state.pendingPlay) {
			setState('loading');
			ctrl.resume();
		} else {
			applyPaused(state.lastPaused);
		}
	});

	ctrl.addListener('playback_started', () => applyPaused(false));

	ctrl.addListener('playback_update', (e) => {
		if (e.data?.isBuffering) {
			setState('loading');
			return;
		}
		const p = paused(e.data);
		if (p !== null) applyPaused(p);
	});
}

function bootEmbed(host: HTMLElement) {
	const state = g();
	if (state.started) return;
	state.started = true;

	const url = host.dataset.spotifyUrl;
	const uri = host.dataset.spotifyUri;
	const options: { width: number; height: number; uri?: string; url?: string } = {
		width: W,
		height: H,
	};
	if (url) options.url = url;
	else if (uri) options.uri = uri;

	void whenApi().then((api) => {
		api.createController(host, options, wire);
	});
}

function bindUi() {
	const state = g();
	const { btn } = ui();
	if (!btn) return;

	state.uiAbort?.abort();
	state.uiAbort = new AbortController();

	btn.addEventListener(
		'click',
		(e) => {
			e.preventDefault();
			const host = document.getElementById('spotify-global-host');
			if (host) bootEmbed(host);

			if (!state.controller || !state.embedReady) {
				state.pendingPlay = true;
				setState('loading');
				return;
			}

			if (state.lastPaused) {
				setState('loading');
				state.controller.resume();
			} else {
				state.controller.pause();
			}
		},
		{ signal: state.uiAbort.signal },
	);

	setState(state.embedReady ? (state.lastPaused ? 'paused' : 'playing') : 'paused');
}

function init() {
	const host = document.getElementById('spotify-global-host');
	if (!host) return;
	bootEmbed(host);
	bindUi();
}

window.__spotifyGlobalInit = init;

init();
document.addEventListener('astro:page-load', init);
