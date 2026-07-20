function panelRoot(): HTMLElement | null {
	return document.getElementById('spotify-panel-root');
}

function isOpen(): boolean {
	return panelRoot()?.dataset.open === 'true';
}

function setOpen(open: boolean) {
	const root = panelRoot();
	if (!root) return;
	root.dataset.open = open ? 'true' : 'false';
	root.setAttribute('aria-hidden', open ? 'false' : 'true');
}

function bindOpenLinks() {
	document.querySelectorAll<HTMLAnchorElement>('[data-spotify-open]').forEach((link) => {
		if (link.dataset.spotifyBound === '1') return;
		link.dataset.spotifyBound = '1';
		link.addEventListener('click', (e) => {
			e.preventDefault();
			setOpen(true);
		});
	});
}

function bindClose() {
	const root = panelRoot();
	if (!root || root.dataset.closeBound === '1') return;
	root.dataset.closeBound = '1';
	root.querySelector<HTMLButtonElement>('[data-spotify-panel-close]')?.addEventListener('click', () => {
		setOpen(false);
	});
}

function init() {
	bindOpenLinks();
	bindClose();
	setOpen(isOpen());
}

init();
document.addEventListener('astro:page-load', init);
