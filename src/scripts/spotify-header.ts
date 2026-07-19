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
	play: () => void;
	pause: () => void;
};

declare global {
	interface Window {
		onSpotifyIframeApiReady?: (api: SpotifyIframeApi) => void;
	}
}

function setPlaying(root: HTMLElement, playing: boolean) {
	const eq = root.querySelector('[data-eq]');
	const btn = root.querySelector<HTMLButtonElement>('[data-now-play]');
	if (eq) eq.classList.toggle('hdr-eq--active', playing);
	if (btn) {
		btn.setAttribute('aria-label', playing ? 'Pause music' : 'Play music');
		btn.textContent = playing ? '❚❚' : '▶';
	}
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
	const host = root.querySelector<HTMLElement>('[data-spotify-embed-host]');
	const playBtn = root.querySelector<HTMLButtonElement>('[data-now-play]');
	const playerHref = root.dataset.playerHref ?? '/music';
	if (!playlistId || !host || !playBtn) return;

	let controller: SpotifyEmbedController | null = null;
	let ready = false;

	loadSpotifyApi();

	window.onSpotifyIframeApiReady = (IFrameAPI) => {
		IFrameAPI.createController(
			host,
			{ uri: `spotify:playlist:${playlistId}`, width: 280, height: 80 },
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

	playBtn.addEventListener('click', () => {
		if (ready && controller) {
			controller.togglePlay();
			return;
		}
		window.location.href = playerHref;
	});
}

document.querySelectorAll<HTMLElement>('[data-spotify-header]').forEach(initHeader);
