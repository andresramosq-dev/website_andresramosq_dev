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

declare global {
	interface Window {
		onSpotifyIframeApiReady?: (api: SpotifyIFrameAPI) => void;
		__spotifyIframeApi?: SpotifyIFrameAPI;
		__spotifyHdrBoot?: Array<(api: SpotifyIFrameAPI) => void>;
	}
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

function init() {
	const host = document.getElementById('spotify-header-embed-host');
	const playBtn = document.querySelector<HTMLButtonElement>('[data-hdr-play]');
	const eq = document.querySelector<HTMLElement>('[data-eq]');
	const uri = host?.dataset.spotifyUri;
	const playlistUrl = host?.dataset.spotifyUrl;

	if (!host || !playBtn || (!uri && !playlistUrl)) return;

	const musicMount = document.querySelector<HTMLElement>('[data-spotify-page-player]');
	const onMusicPage = Boolean(musicMount);
	if (musicMount) {
		musicMount.appendChild(host);
		host.classList.add('spotify-header-sink--page');
	}

	let controller: SpotifyEmbedController | null = null;
	let embedReady = false;
	let pendingPlay = false;
	let lastPaused = true;

	const setState = (state: PlayerState) => {
		playBtn.dataset.state = state;
		const label =
			state === 'playing' ? 'Pause' : state === 'loading' ? 'Connecting to Spotify' : 'Play';
		playBtn.setAttribute('aria-label', label);
		playBtn.setAttribute('aria-busy', state === 'loading' ? 'true' : 'false');
		setEqActive(eq, state === 'playing');
	};

	const applyPaused = (paused: boolean) => {
		lastPaused = paused;
		pendingPlay = false;
		setState(paused ? 'paused' : 'playing');
	};

	const onPlaybackData = (data?: PlaybackData) => {
		if (data?.isBuffering) {
			setState('loading');
			return;
		}
		const paused = pausedFromData(data);
		if (paused !== null) applyPaused(paused);
	};

	const wireController = (ctrl: SpotifyEmbedController) => {
		controller = ctrl;

		ctrl.addListener('ready', () => {
			embedReady = true;
			host.dataset.spotifyReady = 'true';
			if (pendingPlay) {
				setState('loading');
				ctrl.resume();
			} else {
				applyPaused(true);
			}
		});

		ctrl.addListener('playback_started', () => {
			applyPaused(false);
		});

		ctrl.addListener('playback_update', (e) => {
			onPlaybackData(e.data);
		});
	};

	playBtn.addEventListener('click', () => {
		if (!controller || !embedReady) {
			pendingPlay = true;
			setState('loading');
			return;
		}

		if (lastPaused) {
			setState('loading');
			controller.resume();
		} else {
			controller.pause();
		}
	});

	setState('loading');

	const options: { width: number; height: number; uri?: string; url?: string } = {
		width: onMusicPage ? 860 : 300,
		height: onMusicPage ? 380 : 80,
	};
	if (playlistUrl) options.url = playlistUrl;
	else if (uri) options.uri = uri;

	void whenSpotifyApi().then((api) => {
		api.createController(host, options, wireController);
	});
}

init();
