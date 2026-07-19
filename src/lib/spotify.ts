export function spotifyPlaylistId(url: string | null | undefined): string | null {
	if (!url) return null;
	const match = url.match(/playlist\/([a-zA-Z0-9]+)(?:\?|$)/);
	return match?.[1] ?? null;
}

/** Official Spotify iframe — compact bar shows cover, title, and controls while playing. */
export function spotifyPlaylistEmbedSrc(
	playlistUrl: string | null | undefined,
	opts?: { theme?: 'dark' | 'light' },
): string | null {
	const id = spotifyPlaylistId(playlistUrl);
	if (!id) return null;
	const theme = opts?.theme === 'light' ? '1' : '0';
	return `https://open.spotify.com/embed/playlist/${id}?utm_source=generator&theme=${theme}`;
}
