export const site = {
	name: 'Andrés Ramos',
	handle: '@andres_ramos_dev',
	role: 'Desarrollador de software',
	location: 'Latinoamérica',
	email: 'andfera201@gmail.com',
	tagline: 'Interfaces, código y oficio — documentado en público.',
	description:
		'Blog de Andrés Ramos. Desarrollo de software, diseño de interfaces y reflexiones sobre el oficio.',
	bio: 'Construyo productos web y escribo para pensar mejor. Me interesa el frontend, la arquitectura de interfaces y cómo publicar ideas con claridad.',
	links: [
		{ label: 'GitHub', href: 'https://github.com/ramos-andres-dev', icon: 'github' },
		{ label: 'Email', href: 'mailto:andfera201@gmail.com', icon: 'mail' },
	],
};

export const nav = [
	{ label: 'inicio', href: '/' },
	{ label: 'blog', href: '/blog' },
	{ label: 'proyectos', href: '/proyectos' },
	{ label: 'sobre', href: '/sobre' },
	{ label: 'tags', href: '/categorias' },
] as const;

/** Lo que estoy haciendo ahora — sección tipo /now */
export const now = {
	working: 'Este blog en Astro y un panel de operaciones interno.',
	learning: 'Patrones de contenido tipado y diseño de sistemas UI.',
	reading: 'Notas sobre arquitectura frontend y escritura técnica.',
};

export const skills = [
	'TypeScript',
	'Astro',
	'React',
	'CSS',
	'Node.js',
	'Git',
	'Figma',
	'Markdown',
];

export const timeline = [
	{
		year: '2026',
		title: 'Blog personal',
		desc: 'Sitio con Astro, collections tipadas y diseño dev.',
	},
	{
		year: '2024',
		title: 'Frontend & producto',
		desc: 'Interfaces web, design systems y entrega continua.',
	},
	{
		year: '—',
		title: 'Siempre aprendiendo',
		desc: 'Código, diseño y oficio como práctica continua.',
	},
];

export const categories = [
	{
		id: 'diseno',
		label: 'diseño',
		description: 'Interfaces, jerarquía y criterio visual.',
		icon: 'spark',
		color: '#4ade80',
	},
	{
		id: 'codigo',
		label: 'código',
		description: 'Frontend, arquitectura y herramientas.',
		icon: 'code',
		color: '#38bdf8',
	},
	{
		id: 'oficio',
		label: 'oficio',
		description: 'Carrera, hábitos y aprendizaje continuo.',
		icon: 'compass',
		color: '#facc15',
	},
	{
		id: 'metodo',
		label: 'método',
		description: 'Cómo escribo, publico y organizo ideas.',
		icon: 'pen',
		color: '#a78bfa',
	},
] as const;

export type CategoryId = (typeof categories)[number]['id'];

export const categoryLabel: Record<CategoryId, string> = Object.fromEntries(
	categories.map((c) => [c.id, c.label])
) as Record<CategoryId, string>;

export const categoryColor: Record<CategoryId, string> = Object.fromEntries(
	categories.map((c) => [c.id, c.color])
) as Record<CategoryId, string>;
