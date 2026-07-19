type SpotifyEmbedController = {
	togglePlay: () => void;
	addListener: (event: string, cb: (payload: { data?: { is_paused?: boolean } }) => void) => void;
};

type SpotifyIFrameAPI = {
	createController: (
		element: HTMLElement,
		options: { uri: string; width: number; height: number },
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

function setEqActive(eq: HTMLElement | null, active: boolean) {
	if (!eq) return;
	eq.classList.toggle('hdr-eq--active', active);
}

function init() {
	const host = document.getElementById('spotify-header-embed-host');
	const playBtn = document.querySelector<HTMLButtonElement>('[data-hdr-play]');
	const eq = document.querySelector<HTMLElement>('[data-eq]');
	const uri = host?.dataset.spotifyUri;

	if (!host || !playBtn || !uri) return;

	let controller: SpotifyEmbedController | null = null;
	let pendingPlay = false;

	const setState = (state: PlayerState) => {
		playBtn.dataset.state = state;
		const label =
			state === 'playing' ? 'Pause' : state === 'loading' ? 'Connecting to Spotify' : 'Play';
		playBtn.setAttribute('aria-label', label);
		playBtn.setAttribute('aria-busy', state === 'loading' ? 'true' : 'false');
		setEqActive(eq, state === 'playing');
	};

	const syncFromPlayer = (paused: boolean) => {
		pendingPlay = false;
		setState(paused ? 'paused' : 'playing');
	};

	const tryStartPlayback = () => {
		if (!controller) return;
		controller.togglePlay();
	};

	playBtn.addEventListener('click', () => {
		if (!controller) {
			pendingPlay = true;
			setState('loading');
			return;
		}

		const playing = playBtn.dataset.state === 'playing';
		setState(playing ? 'paused' : 'playing');
		tryStartPlayback();
	});

	setState('paused');

	void whenSpotifyApi().then((api) => {
		api.createController(host, { uri, width: 300, height: 80 }, (ctrl) => {
			controller = ctrl;

			ctrl.addListener('ready', () => {
				if (pendingPlay) tryStartPlayback();
				else syncFromPlayer(true);
			});

			ctrl.addListener('playback_update', (e) => {
				const paused = e.data?.is_paused ?? true;
				syncFromPlayer(paused);
			});
		});
	});
}

init();
