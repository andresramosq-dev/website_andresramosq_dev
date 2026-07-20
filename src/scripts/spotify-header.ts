type PlaybackData = {
	isPaused?: boolean;
	is_paused?: boolean;
	isBuffering?: boolean;
	playingURI?: string;
};

type SpotifyEmbedController = {
	play: () => void;
	pause: () => void;
	resume: () => void;
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
	booting: boolean;
	pendingPlay: boolean;
	lastPaused: boolean;
	lastState: PlayerState;
	uiAbort: AbortController | null;
};

declare global {
	interface Window {
		onSpotifyIframeApiReady?: (api: SpotifyIFrameAPI) => void;
		__spotifyIframeApi?: SpotifyIFrameAPI;
		__spotifyHdrBoot?: Array<(api: SpotifyIFrameAPI) => void>;
		__spotifyGlobal?: SpotifyGlobal;
	}
}

const EMBED_WIDTH = 860;
const EMBED_HEIGHT = 380;

function globalState(): SpotifyGlobal {
	if (!window.__spotifyGlobal) {
		window.__spotifyGlobal = {
			controller: null,
			embedReady: false,
			booting: false,
			pendingPlay: false,
			lastPaused: true,
			lastState: 'paused',
			uiAbort: null,
		};
	}
	return window.__spotifyGlobal;
}

function whenSpotifyApi(): Promise<SpotifyIFrameAPI> {
	if (window.__spotifyIframeApi) {
		return Promise.resolve(window.__spotifyIframeApi);
	}

	return new Promise((resolve) => {
		(window.__spotifyHdrBoot = window.__spotifyHdrBoot || []).push((api) => {
			resolve(api);
		});
	});
}

function pausedFromData(data?: PlaybackData): boolean | null {
	if (!data) return null;
	if (typeof data.isPaused === 'boolean') return data.isPaused;
	if (typeof data.is_paused === 'boolean') return data.is_paused;
	return null;
}

function setEqActive(eq: HTMLElement | null, active: boolean) {
	if (!eq) return;
	eq.classList.toggle('hdr-eq--active', active);
}

function currentUi() {
	return {
		playBtn: document.querySelector<HTMLButtonElement>('[data-hdr-play]'),
		eq: document.querySelector<HTMLElement>('[data-eq]'),
	};
}

function setUiState(state: PlayerState, g: SpotifyGlobal) {
	g.lastState = state;
	const { playBtn, eq } = currentUi();
	if (!playBtn) return;

	playBtn.dataset.state = state;
	const label =
		state === 'playing' ? 'Pause' : state === 'loading' ? 'Connecting to Spotify' : 'Play';
	playBtn.setAttribute('aria-label', label);
	playBtn.setAttribute('aria-busy', state === 'loading' ? 'true' : 'false');
	setEqActive(eq, state === 'playing');
}

function applyPaused(paused: boolean, g: SpotifyGlobal) {
	g.lastPaused = paused;
	g.pendingPlay = false;
	setUiState(paused ? 'paused' : 'playing', g);
}

function onPlaybackData(data: PlaybackData | undefined, g: SpotifyGlobal) {
	if (data?.isBuffering) {
		setUiState('loading', g);
		return;
	}
	const paused = pausedFromData(data);
	if (paused !== null) applyPaused(paused, g);
}

function wireController(ctrl: SpotifyEmbedController, host: HTMLElement, g: SpotifyGlobal) {
	g.controller = ctrl;

	ctrl.addListener('ready', () => {
		g.embedReady = true;
		g.booting = false;
		host.dataset.spotifyReady = 'true';
		if (g.pendingPlay) {
			setUiState('loading', g);
			ctrl.resume();
		} else {
			applyPaused(g.lastPaused, g);
		}
	});

	ctrl.addListener('playback_started', () => {
		applyPaused(false, g);
	});

	ctrl.addListener('playback_update', (e) => {
		onPlaybackData(e.data, g);
	});
}

function ensureEmbed(host: HTMLElement, playlistUrl: string | undefined, uri: string | undefined) {
	const g = globalState();
	if (g.controller || g.booting) return;

	g.booting = true;

	const options: { width: number; height: number; uri?: string; url?: string } = {
		width: EMBED_WIDTH,
		height: EMBED_HEIGHT,
	};
	if (playlistUrl) options.url = playlistUrl;
	else if (uri) options.uri = uri;

	void whenSpotifyApi().then((api) => {
		api.createController(host, options, (ctrl) => {
			wireController(ctrl, host, g);
		});
	});
}

function bindUi() {
	const g = globalState();
	const { playBtn } = currentUi();
	if (!playBtn) return;

	g.uiAbort?.abort();
	g.uiAbort = new AbortController();
	const { signal } = g.uiAbort;

	playBtn.addEventListener(
		'click',
		() => {
			if (!g.controller || !g.embedReady) {
				g.pendingPlay = true;
				setUiState('loading', g);
				return;
			}

			if (g.lastPaused) {
				setUiState('loading', g);
				g.controller.resume();
			} else {
				g.controller.pause();
			}
		},
		{ signal },
	);

	if (g.embedReady) {
		setUiState(g.lastPaused ? 'paused' : 'playing', g);
	} else {
		setUiState('paused', g);
	}
}

function musicMount() {
	return document.querySelector<HTMLElement>('[data-spotify-page-player]');
}

function vaultEl() {
	return document.getElementById('spotify-audio-vault');
}

function pinHostHidden(host: HTMLElement) {
	host.classList.add('spotify-header-sink--hidden');
	host.classList.remove('spotify-header-sink--page');
	host.setAttribute('aria-hidden', 'true');
	host.style.cssText = '';
}

function showHostOnMusicPage(host: HTMLElement) {
	host.classList.remove('spotify-header-sink--hidden');
	host.classList.add('spotify-header-sink--page');
	host.setAttribute('aria-hidden', 'false');
	host.style.cssText = '';
	for (const frame of host.querySelectorAll('iframe')) {
		frame.removeAttribute('style');
	}
}

function placeHost(host: HTMLElement) {
	const mount = musicMount();
	const vault = vaultEl();

	if (mount) {
		mount.appendChild(host);
		showHostOnMusicPage(host);
		return;
	}

	if (vault) {
		vault.appendChild(host);
		pinHostHidden(host);
	}
}

function init() {
	const host = document.getElementById('spotify-header-embed-host');
	const uri = host?.dataset.spotifyUri;
	const playlistUrl = host?.dataset.spotifyUrl;

	if (!host || (!uri && !playlistUrl)) return;

	placeHost(host);
	bindUi();
	ensureEmbed(host, playlistUrl, uri);
}

init();
document.addEventListener('astro:page-load', init);
document.addEventListener('astro:after-swap', init);
