export const site = {
	name: 'Andrés Ramos',
	handle: '@andres_ramos_dev',
	role: 'Desarrollador',
	location: 'Latinoamérica',
	email: 'andfera201@gmail.com',
	tagline: 'Escribo sobre código, diseño y oficio.',
	description: 'Blog personal de Andrés Ramos sobre desarrollo, diseño y oficio.',
	bio: 'Construyo interfaces y escribo para pensar mejor. Este espacio es mi cuaderno público: ideas claras, sin ruido.',
	links: [
		{ label: 'GitHub', href: 'https://github.com/ramos-andres-dev' },
		{ label: 'Email', href: 'mailto:andfera201@gmail.com' },
	],
};

export const nav = [
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
		icon: 'spark',
		color: '#e07a5f',
	},
	{
		id: 'codigo',
		label: 'Código',
		description: 'Frontend, arquitectura y herramientas.',
		icon: 'code',
		color: '#3d9aad',
	},
	{
		id: 'oficio',
		label: 'Oficio',
		description: 'Carrera, hábitos y aprendizaje continuo.',
		icon: 'compass',
		color: '#d4a017',
	},
	{
		id: 'metodo',
		label: 'Método',
		description: 'Cómo escribo, publico y organizo ideas.',
		icon: 'pen',
		color: '#9b8afb',
	},
] as const;

export type CategoryId = (typeof categories)[number]['id'];

export const categoryLabel: Record<CategoryId, string> = Object.fromEntries(
	categories.map((c) => [c.id, c.label])
) as Record<CategoryId, string>;

export const categoryColor: Record<CategoryId, string> = Object.fromEntries(
	categories.map((c) => [c.id, c.color])
) as Record<CategoryId, string>;
