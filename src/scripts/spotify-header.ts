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
	bootStartedAt: number;
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
		__spotifyRunInit?: () => void;
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
			bootStartedAt: 0,
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

	if (g.controller || g.embedReady) return;
	if (g.booting && host.querySelector('iframe')) return;
	if (g.booting) return;

	g.booting = true;
	g.bootStartedAt = Date.now();

	const options: { width: number; height: number; uri?: string; url?: string } = {
		width: EMBED_WIDTH,
		height: EMBED_HEIGHT,
	};
	if (playlistUrl) options.url = playlistUrl;
	else if (uri) options.uri = uri;

	void whenSpotifyApi().then((api) => {
		if (g.controller) return;
		api.createController(host, options, (ctrl) => {
			wireController(ctrl, host, g);
		});
	});
}

function togglePlayback(g: SpotifyGlobal) {
	if (!g.controller) return;
	setUiState('loading', g);
	if (g.lastPaused) {
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
			const host = document.getElementById('spotify-header-embed-host');
			if (host) {
				ensureEmbed(host, host.dataset.spotifyUrl, host.dataset.spotifyUri);
			}

			if (!g.controller || !g.embedReady) {
				g.pendingPlay = true;
				setUiState('loading', g);
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

function anchorEl() {
	return document.getElementById('spotify-vault-anchor');
}

function dockVaultHidden(vault: HTMLElement) {
	const anchor = anchorEl();
	if (anchor && vault.parentElement !== anchor) {
		anchor.appendChild(vault);
	}
	vault.classList.add('spotify-audio-vault--hidden');
	vault.classList.remove('spotify-audio-vault--music');
	vault.setAttribute('aria-hidden', 'true');
	vault.removeAttribute('style');
}

function dockVaultOnMusic(vault: HTMLElement, mount: HTMLElement) {
	if (vault.parentElement !== mount) {
		mount.appendChild(vault);
	}
	vault.classList.remove('spotify-audio-vault--hidden');
	vault.classList.add('spotify-audio-vault--music');
	vault.setAttribute('aria-hidden', 'false');
	vault.removeAttribute('style');
}

function syncVaultPlacement() {
	const vault = vaultEl();
	const host = document.getElementById('spotify-header-embed-host');
	const mount = musicMount();

	if (!vault || !host) return;

	ensureHostInVault(host, vault);

	const apply = () => {
		if (mount) {
			dockVaultOnMusic(vault, mount);
		} else {
			dockVaultHidden(vault);
		}
	};

	if (mount) {
		requestAnimationFrame(() => requestAnimationFrame(apply));
	} else {
		apply();
	}
}

function init() {
	const host = document.getElementById('spotify-header-embed-host');
	const vault = vaultEl();
	const uri = host?.dataset.spotifyUri;
	const playlistUrl = host?.dataset.spotifyUrl;

	if (!host || !vault || (!uri && !playlistUrl)) return;

	syncVaultPlacement();
	ensureEmbed(host, playlistUrl, uri);
	bindUi();
}

window.__spotifyRunInit = init;

init();
document.addEventListener('astro:page-load', init);
