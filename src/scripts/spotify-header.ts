type SpotifyIframeApi = {
	createController: (
		element: HTMLElement,
		options: { uri?: string; url?: string; width?: string | number; height?: string | number },
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
		__spotifyIframeApi?: SpotifyIframeApi;
		__spotifyApiQueue?: Array<(api: SpotifyIframeApi) => void>;
	}
}

function setPlaying(root: HTMLElement, playing: boolean) {
	root.querySelector('[data-eq]')?.classList.toggle('hdr-eq--active', playing);
	const btn = root.querySelector<HTMLButtonElement>('[data-now-play]');
	if (!btn) return;
	btn.setAttribute('aria-pressed', playing ? 'true' : 'false');
	btn.setAttribute('aria-label', playing ? 'Pause' : 'Play');
}

function whenApiReady(run: (api: SpotifyIframeApi) => void) {
	if (window.__spotifyIframeApi) {
		run(window.__spotifyIframeApi);
		return;
	}
	window.__spotifyApiQueue = window.__spotifyApiQueue || [];
	window.__spotifyApiQueue.push(run);
}

function initHeader(root: HTMLElement) {
	const playlistId = root.dataset.playlistId;
	const host = document.querySelector<HTMLElement>('[data-spotify-embed-host]');
	const playBtn = root.querySelector<HTMLButtonElement>('[data-now-play]');
	if (!playlistId || !host || !playBtn) return;

	let controller: SpotifyEmbedController | null = null;

	whenApiReady((IFrameAPI) => {
		IFrameAPI.createController(
			host,
			{ uri: `spotify:playlist:${playlistId}`, width: 300, height: 80 },
			(embedController) => {
				controller = embedController;
				playBtn.disabled = false;

				embedController.addListener('playback_started', () => setPlaying(root, true));
				embedController.addListener('playback_update', (event) => {
					setPlaying(root, !Boolean(event.data.isPaused));
				});
			},
		);
	});

	playBtn.addEventListener('click', () => {
		if (!controller) return;
		controller.togglePlay();
	});
}

function boot() {
	document.querySelectorAll<HTMLElement>('[data-spotify-header]').forEach(initHeader);
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
	boot();
}
