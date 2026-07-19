export function pathToSegment(path: string): string {
	if (path === '/') return '~';
	return `~${path}`;
}
