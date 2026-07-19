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
	play: () => void;
	pause: () => void;
};

declare global {
	interface Window {
		onSpotifyIframeApiReady?: (api: SpotifyIframeApi) => void;
		__spotifyHeaderInit?: boolean;
	}
}

async function trackTitleFromUri(playingUri: string): Promise<string | null> {
	const parts = playingUri.split(':');
	const id = parts[2];
	if (!id || parts[1] !== 'track') return null;
	try {
		const res = await fetch(
			`https://open.spotify.com/oembed?url=${encodeURIComponent(`https://open.spotify.com/track/${id}`)}`,
		);
		if (!res.ok) return null;
		const data = (await res.json()) as { title?: string };
		return data.title ?? null;
	} catch {
		return null;
	}
}

export function initSpotifyHeaderBar(root: HTMLElement) {
	if (window.__spotifyHeaderInit) return;
	const playlistId = root.dataset.playlistId;
	const host = root.querySelector<HTMLElement>('[data-spotify-embed-host]');
	const trackEl = root.querySelector<HTMLElement>('[data-now-track]');
	const playBtn = root.querySelector<HTMLButtonElement>('[data-now-play]');
	if (!playlistId || !host || !trackEl || !playBtn) return;

	window.__spotifyHeaderInit = true;
	const defaultLabel = root.dataset.defaultLabel ?? 'playlist';
	let controller: SpotifyEmbedController | null = null;
	let isPaused = true;

	const setLabel = (text: string) => {
		trackEl.textContent = text;
	};

	const mountApi = () => {
		window.onSpotifyIframeApiReady = (IFrameAPI) => {
			IFrameAPI.createController(
				host,
				{
					uri: `spotify:playlist:${playlistId}`,
					width: 320,
					height: 80,
				},
				(embedController) => {
					controller = embedController;
					embedController.addListener('ready', () => {
						setLabel(defaultLabel);
					});
					embedController.addListener('playback_started', async (event) => {
						const uri = event.data.playingURI as string | undefined;
						if (!uri) return;
						const title = await trackTitleFromUri(uri);
						if (title) setLabel(title);
						isPaused = false;
						playBtn.setAttribute('aria-label', 'Pause');
						playBtn.textContent = '❚❚';
					});
					embedController.addListener('playback_update', (event) => {
						const paused = Boolean(event.data.isPaused);
						isPaused = paused;
						playBtn.setAttribute('aria-label', paused ? 'Play' : 'Pause');
						playBtn.textContent = paused ? '▶' : '❚❚';
					});
				},
			);
		};

		if (document.querySelector('script[data-spotify-iframe-api]')) return;
		const script = document.createElement('script');
		script.src = 'https://open.spotify.com/embed/iframe-api/v1';
		script.async = true;
		script.dataset.spotifyIframeApi = 'true';
		document.body.appendChild(script);
	};

	playBtn.addEventListener('click', () => {
		if (!controller) return;
		controller.togglePlay();
	});

	mountApi();
}

document.querySelectorAll<HTMLElement>('[data-spotify-header]').forEach((root) => {
	initSpotifyHeaderBar(root);
});
