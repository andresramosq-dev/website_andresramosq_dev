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
	resume: () => void;
};

declare global {
	interface Window {
		onSpotifyIframeApiReady?: (api: SpotifyIframeApi) => void;
		__spotifyIframeApi?: SpotifyIframeApi;
		__spotifyHeaderBooted?: boolean;
	}
}

function setPlaying(root: HTMLElement, playing: boolean) {
	root.querySelector('[data-eq]')?.classList.toggle('hdr-eq--active', playing);
	const btn = root.querySelector<HTMLButtonElement>('[data-now-play]');
	if (!btn) return;
	btn.setAttribute('aria-pressed', playing ? 'true' : 'false');
	btn.setAttribute('aria-label', playing ? 'Pause' : 'Play');
}

function whenSpotifyApiReady(run: (api: SpotifyIframeApi) => void) {
	if (window.__spotifyIframeApi) {
		run(window.__spotifyIframeApi);
		return;
	}
	const prev = window.onSpotifyIframeApiReady;
	window.onSpotifyIframeApiReady = (api) => {
		window.__spotifyIframeApi = api;
		prev?.(api);
		run(api);
	};

	if (document.querySelector('script[data-spotify-iframe-api]')) return;

	const script = document.createElement('script');
	script.src = 'https://open.spotify.com/embed/iframe-api/v1';
	script.async = true;
	script.dataset.spotifyIframeApi = 'true';
	document.body.appendChild(script);
}

function bootSpotifyHeader() {
	if (window.__spotifyHeaderBooted) return;
	const root = document.querySelector<HTMLElement>('[data-spotify-header]');
	const sink = document.querySelector<HTMLElement>('[data-spotify-sink]');
	const host = sink?.querySelector<HTMLElement>('[data-spotify-embed-host]');
	const playBtn = root?.querySelector<HTMLButtonElement>('[data-now-play]');
	const playlistId = root?.dataset.playlistId;
	if (!root || !host || !playBtn || !playlistId) return;

	window.__spotifyHeaderBooted = true;

	let controller: SpotifyEmbedController | null = null;
	let embedReady = false;
	let wantPlay = false;

	whenSpotifyApiReady((IFrameAPI) => {
		IFrameAPI.createController(
			host,
			{ uri: `spotify:playlist:${playlistId}`, width: 300, height: 80 },
			(embedController) => {
				controller = embedController;

				embedController.addListener('ready', () => {
					embedReady = true;
					if (wantPlay) {
						wantPlay = false;
						embedController.resume();
					}
				});

				embedController.addListener('playback_started', () => setPlaying(root, true));
				embedController.addListener('playback_update', (event) => {
					setPlaying(root, !Boolean(event.data.isPaused));
				});
			},
		);
	});

	playBtn.addEventListener('click', (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (!controller) {
			wantPlay = true;
			return;
		}
		if (!embedReady) {
			wantPlay = true;
			return;
		}
		controller.togglePlay();
	});
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', bootSpotifyHeader, { once: true });
} else {
	bootSpotifyHeader();
}
