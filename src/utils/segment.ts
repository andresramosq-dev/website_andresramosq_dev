export function pathToSegment(path: string): string {
	return path === '/' ? '~' : `~${path}`;
}
