export const site = {
	name: 'Andrés Ramos',
	handle: '@andres_ramos_dev',
	role: 'Desarrollador y escritor',
	location: 'Latinoamérica',
	email: 'andfera201@gmail.com',
	tagline: 'Un blog sobre código, diseño y oficio digital.',
	bio: 'Escribo para pensar mejor. Aquí comparto notas prácticas, aprendizajes de producto y el proceso detrás de lo que construyo.',
	links: [
		{ label: 'GitHub', href: 'https://github.com/ramos-andres-dev' },
		{ label: 'Email', href: 'mailto:andfera201@gmail.com' },
	],
};

export const nav = [
	{ label: 'Inicio', href: '/' },
	{ label: 'Blog', href: '/blog' },
	{ label: 'Categorías', href: '/categorias' },
	{ label: 'Proyectos', href: '/proyectos' },
	{ label: 'Sobre', href: '/sobre' },
];

export const categories = [
	{
		id: 'diseno',
		label: 'Diseño',
		description: 'Interfaces, jerarquía y criterio visual.',
		color: 'coral',
		icon: 'spark',
	},
	{
		id: 'codigo',
		label: 'Código',
		description: 'Frontend, arquitectura y herramientas.',
		color: 'sky',
		icon: 'code',
	},
	{
		id: 'oficio',
		label: 'Oficio',
		description: 'Carrera, hábitos y aprendizaje continuo.',
		color: 'butter',
		icon: 'compass',
	},
	{
		id: 'metodo',
		label: 'Método',
		description: 'Cómo escribo, publico y organizo ideas.',
		color: 'mint',
		icon: 'pen',
	},
] as const;

export type CategoryId = (typeof categories)[number]['id'];
