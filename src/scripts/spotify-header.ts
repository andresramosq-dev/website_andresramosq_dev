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

let layoutObserver: ResizeObserver | null = null;
let reflowHandler: (() => void) | null = null;

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

function ensureHostInVault(host: HTMLElement, vault: HTMLElement) {
	if (host.parentElement !== vault) {
		vault.appendChild(host);
	}
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

function togglePlayback(g: SpotifyGlobal) {
	if (!g.controller) return;
	if (g.lastPaused) {
		setUiState('loading', g);
		g.controller.resume();
	} else {
		g.controller.pause();
	}
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
				const host = document.getElementById('spotify-header-embed-host');
				if (host) {
					ensureEmbed(host, host.dataset.spotifyUrl, host.dataset.spotifyUri);
				}
				return;
			}
			togglePlayback(g);
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

function clearPlacementWatch() {
	layoutObserver?.disconnect();
	layoutObserver = null;
	if (reflowHandler) {
		window.removeEventListener('scroll', reflowHandler);
		window.removeEventListener('resize', reflowHandler);
		reflowHandler = null;
	}
}

function hideVault(vault: HTMLElement) {
	vault.classList.add('spotify-audio-vault--hidden');
	vault.classList.remove('spotify-audio-vault--music');
	vault.setAttribute('aria-hidden', 'true');
	Object.assign(vault.style, {
		position: 'fixed',
		left: '-10000px',
		top: '0',
		width: `${EMBED_WIDTH}px`,
		height: `${EMBED_HEIGHT}px`,
		opacity: '0',
		pointerEvents: 'none',
		zIndex: '-1',
	});
}

function positionVaultOnMusic(vault: HTMLElement, mount: HTMLElement) {
	const place = () => {
		const rect = mount.getBoundingClientRect();
		const width = Math.max(rect.width, 280);
		Object.assign(vault.style, {
			position: 'fixed',
			left: `${rect.left}px`,
			top: `${rect.top}px`,
			width: `${width}px`,
			height: `${EMBED_HEIGHT}px`,
			opacity: '1',
			pointerEvents: 'auto',
			zIndex: '20',
		});
	};

	place();
	if (!layoutObserver) {
		layoutObserver = new ResizeObserver(place);
		layoutObserver.observe(mount);
	}
	if (!reflowHandler) {
		reflowHandler = place;
		window.addEventListener('scroll', reflowHandler, { passive: true });
		window.addEventListener('resize', reflowHandler);
	}
}

function syncVaultPlacement() {
	const vault = vaultEl();
	const host = document.getElementById('spotify-header-embed-host');
	const mount = musicMount();

	if (!vault || !host) return;

	ensureHostInVault(host, vault);
	clearPlacementWatch();

	const onMusic = Boolean(mount);
	if (onMusic && mount) {
		vault.classList.remove('spotify-audio-vault--hidden');
		vault.classList.add('spotify-audio-vault--music');
		vault.setAttribute('aria-hidden', 'false');
		positionVaultOnMusic(vault, mount);
	} else {
		hideVault(vault);
	}
}

function init() {
	const host = document.getElementById('spotify-header-embed-host');
	const vault = vaultEl();
	const uri = host?.dataset.spotifyUri;
	const playlistUrl = host?.dataset.spotifyUrl;

	if (!host || !vault || (!uri && !playlistUrl)) return;

	ensureHostInVault(host, vault);
	syncVaultPlacement();
	bindUi();
	ensureEmbed(host, playlistUrl, uri);
}

init();
document.addEventListener('astro:page-load', init);
document.addEventListener('astro:after-swap', init);
document.addEventListener('astro:before-swap', clearPlacementWatch);
