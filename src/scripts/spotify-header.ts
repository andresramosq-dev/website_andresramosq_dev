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

declare global {
	interface Window {
		onSpotifyIframeApiReady?: (api: SpotifyIFrameAPI) => void;
		__spotifyHdrQueue?: Array<(api: SpotifyIFrameAPI) => void>;
	}
}

function loadSpotifyIframeApi(): Promise<SpotifyIFrameAPI> {
	return new Promise((resolve) => {
		const run = (api: SpotifyIFrameAPI) => resolve(api);

		if (window.__spotifyHdrQueue) {
			window.__spotifyHdrQueue.push(run);
		} else {
			window.__spotifyHdrQueue = [run];
		}

		const prev = window.onSpotifyIframeApiReady;
		window.onSpotifyIframeApiReady = (api) => {
			prev?.(api);
			const queue = window.__spotifyHdrQueue ?? [];
			window.__spotifyHdrQueue = [];
			for (const fn of queue) fn(api);
		};

		if (document.querySelector('script[data-spotify-iframe-api]')) return;

		const script = document.createElement('script');
		script.src = 'https://open.spotify.com/embed/iframe-api/v1';
		script.async = true;
		script.dataset.spotifyIframeApi = 'true';
		document.head.appendChild(script);
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

	const syncUi = (paused: boolean) => {
		playBtn.setAttribute('aria-label', paused ? 'Play' : 'Pause');
		setEqActive(eq, !paused);
	};

	playBtn.addEventListener('click', () => {
		if (!controller) return;
		controller.togglePlay();
	});

	void loadSpotifyIframeApi().then((api) => {
		api.createController(host, { uri, width: 300, height: 80 }, (ctrl) => {
			controller = ctrl;
			playBtn.disabled = false;

			ctrl.addListener('ready', () => {
				syncUi(true);
			});

			ctrl.addListener('playback_update', (e) => {
				const paused = e.data?.is_paused ?? true;
				syncUi(paused);
			});
		});
	});
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', init);
} else {
	init();
}
