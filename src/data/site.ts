export const site = {
	name: 'Andrés Ramos',
	handle: 'andres_ramos_dev',
	role: 'Desarrollador',
	location: 'Latinoamérica',
	email: 'andfera201@gmail.com',
	tagline:
		'Notas, proyectos y aprendizaje escritos con calma. Una pizarra personal con forma de periódico.',
	bio: [
		'Construyo interfaces y sistemas con foco en claridad, rendimiento y lectura.',
		'Este sitio es mi cuaderno público: bitácora técnica, proyectos y la música que acompaña el trabajo.',
		'Escribo en Markdown, publico con Astro y mantengo el diseño plano: tinta, papel y tipografía.',
	],
	links: [
		{ label: 'GitHub', href: 'https://github.com/ramos-andres-dev' },
		{ label: 'Correo', href: 'mailto:andfera201@gmail.com' },
	],
};

export const nav = [
	{ label: 'Inicio', href: '/' },
	{ label: 'Perfil', href: '/#perfil' },
	{ label: 'Tecnologías', href: '/#tecnologias' },
	{ label: 'Proyectos', href: '/proyectos' },
	{ label: 'Blog', href: '/blog' },
	{ label: 'Música', href: '/#musica' },
];

export const techTimeline = [
	{
		period: '2021',
		title: 'Fundamentos',
		items: ['HTML', 'CSS', 'JavaScript', 'Git'],
		note: 'Bases de la web y control de versiones.',
	},
	{
		period: '2022',
		title: 'Frontend moderno',
		items: ['TypeScript', 'React', 'Vite', 'REST'],
		note: 'Componentes, tipado y consumo de APIs.',
	},
	{
		period: '2023',
		title: 'Producto y entrega',
		items: ['Next.js', 'Node.js', 'PostgreSQL', 'Docker'],
		note: 'Apps full-stack, datos y entornos reproducibles.',
	},
	{
		period: '2024',
		title: 'Sistemas y calidad',
		items: ['Testing', 'CI/CD', 'Design systems', 'Accesibilidad'],
		note: 'Calidad continua y interfaces consistentes.',
	},
	{
		period: '2025–26',
		title: 'Contenido y arquitectura',
		items: ['Astro', 'Content collections', 'MDX', 'Performance'],
		note: 'Sitios de contenido densos, rápidos y editables.',
	},
];

export const music = [
	{
		title: 'In Rainbows',
		artist: 'Radiohead',
		why: 'Texturas densas para concentrarse sin ruido.',
	},
	{
		title: 'Kind of Blue',
		artist: 'Miles Davis',
		why: 'Espacio y tempo: buen fondo para escribir.',
	},
	{
		title: 'Discovery',
		artist: 'Daft Punk',
		why: 'Ritmo claro cuando hay que cerrar tareas.',
	},
	{
		title: 'Dummy',
		artist: 'Portishead',
		why: 'Atmósfera nocturna para depurar con calma.',
	},
	{
		title: 'Currents',
		artist: 'Tame Impala',
		why: 'Capas suaves para sesiones largas de diseño.',
	},
	{
		title: 'A Seat at the Table',
		artist: 'Solange',
		why: 'Precisión y calor; buen contraste al código frío.',
	},
];
