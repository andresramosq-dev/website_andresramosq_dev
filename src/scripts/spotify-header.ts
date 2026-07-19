type SpotifyIframeApi = {
	createController: (
		element: HTMLElement,
		options: { uri?: string; width?: string | number; height?: string | number },
		callback: (controller: SpotifyEmbedController) => void,
	) => void;
};

type SpotifyEmbedController = {
	addListener: (event: string, handler: (payload: { data: Record<string, unknown> }) => void) => void;
	togglePlay: () => void;
};

declare global {
	interface Window {
		onSpotifyIframeApiReady?: (api: SpotifyIframeApi) => void;
	}
}

function setPlaying(root: HTMLElement, playing: boolean) {
	root.querySelector('[data-eq]')?.classList.toggle('hdr-eq--active', playing);
	const btn = root.querySelector<HTMLButtonElement>('[data-now-play]');
	if (!btn) return;
	btn.setAttribute('aria-pressed', playing ? 'true' : 'false');
	btn.setAttribute('aria-label', playing ? 'Pause' : 'Play');
}

function loadSpotifyApi() {
	if (document.querySelector('script[data-spotify-iframe-api]')) return;
	const script = document.createElement('script');
	script.src = 'https://open.spotify.com/embed/iframe-api/v1';
	script.async = true;
	script.dataset.spotifyIframeApi = 'true';
	document.body.appendChild(script);
}

function initHeader(root: HTMLElement) {
	const playlistId = root.dataset.playlistId;
	const sink = document.querySelector<HTMLElement>('[data-spotify-sink]');
	const host = sink?.querySelector<HTMLElement>('[data-spotify-embed-host]');
	const playBtn = root.querySelector<HTMLButtonElement>('[data-now-play]');
	if (!playlistId || !host || !playBtn) return;

	let controller: SpotifyEmbedController | null = null;
	let ready = false;

	const tryToggle = () => {
		if (controller) controller.togglePlay();
	};

	loadSpotifyApi();

	window.onSpotifyIframeApiReady = (IFrameAPI) => {
		IFrameAPI.createController(
			host,
			{ uri: `spotify:playlist:${playlistId}`, width: 300, height: 80 },
			(embedController) => {
				controller = embedController;
				ready = true;
				embedController.addListener('playback_started', () => setPlaying(root, true));
				embedController.addListener('playback_update', (event) => {
					setPlaying(root, !Boolean(event.data.isPaused));
				});
			},
		);
	};

	playBtn.addEventListener('click', (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (ready) tryToggle();
	});
}

document.querySelectorAll<HTMLElement>('[data-spotify-header]').forEach(initHeader);
