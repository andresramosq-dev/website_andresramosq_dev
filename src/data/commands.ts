export const commands = [
	{ cmd: 'help', aliases: ['?', 'ayuda'], desc: 'Lista de comandos', action: 'help' as const },
	{ cmd: 'home', aliases: ['inicio', '~', '/'], path: '/', desc: 'Ir al inicio' },
	{ cmd: 'andres', aliases: ['sobre', 'about', 'me'], path: '/andres', desc: 'Perfil y datos' },
	{ cmd: 'blog', path: '/blog', desc: 'Ver artículos' },
	{ cmd: 'experiencia', aliases: ['exp', 'cv'], path: '/experiencia', desc: 'Ver experiencia laboral' },
	{ cmd: 'proyectos', aliases: ['projects'], path: '/proyectos', desc: 'Ver proyectos' },
	{ cmd: 'notas', path: '/notas', desc: 'Notas cortas' },
	{ cmd: 'tags', path: '/categorias', desc: 'Categorías del blog' },
	{ cmd: 'clear', aliases: ['cls'], desc: 'Limpiar pantalla', action: 'clear' as const },
];
