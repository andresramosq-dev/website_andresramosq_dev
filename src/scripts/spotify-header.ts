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

function ensureSpotifyApi(onReady: (api: SpotifyIframeApi) => void) {
	if (window.__spotifyIframeApi) {
		onReady(window.__spotifyIframeApi);
		return;
	}
	window.__spotifyApiQueue = window.__spotifyApiQueue || [];
	window.__spotifyApiQueue.push(onReady);
}

function ensureEmbedHost(): HTMLElement {
	let sink = document.querySelector<HTMLElement>('[data-spotify-sink]');
	if (!sink) {
		sink = document.createElement('div');
		sink.className = 'spotify-sink';
		sink.dataset.spotifySink = '';
		sink.setAttribute('aria-hidden', 'true');
		const host = document.createElement('div');
		host.dataset.spotifyEmbedHost = '';
		sink.appendChild(host);
		document.body.appendChild(sink);
	}
	return sink.querySelector('[data-spotify-embed-host]') as HTMLElement;
}

function bootSpotifyHeader() {
	if (window.__spotifyHeaderBooted) return;
	const root = document.querySelector<HTMLElement>('[data-spotify-header]');
	const playBtn = root?.querySelector<HTMLButtonElement>('[data-now-play]');
	const playlistUrl = root?.dataset.playlistUrl;
	if (!root || !playBtn || !playlistUrl) return;

	window.__spotifyHeaderBooted = true;

	let controller: SpotifyEmbedController | null = null;
	const host = ensureEmbedHost();

	ensureSpotifyApi((IFrameAPI) => {
		IFrameAPI.createController(
			host,
			{ url: playlistUrl, width: 300, height: 80 },
			(embedController) => {
				controller = embedController;
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
		if (!controller) return;
		controller.togglePlay();
	});
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', bootSpotifyHeader, { once: true });
} else {
	bootSpotifyHeader();
}
