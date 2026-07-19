export const site = {
	name: 'Andrés Ramos',
	handle: '@andres_ramos_dev',
	role: 'Desarrollador',
	location: 'Latinoamérica',
	email: 'andfera201@gmail.com',
	tagline: 'Notas sobre código, diseño y oficio.',
	bio: 'Escribo para pensar mejor. Aquí van aprendizajes de producto, interfaces y el proceso detrás de lo que construyo.',
	links: [
		{ label: 'GitHub', href: 'https://github.com/ramos-andres-dev' },
		{ label: 'Email', href: 'mailto:andfera201@gmail.com' },
	],
};

export const nav = [
	{ label: 'Escritos', href: '/blog' },
	{ label: 'Temas', href: '/categorias' },
	{ label: 'Proyectos', href: '/proyectos' },
	{ label: 'Sobre', href: '/sobre' },
];

export const categories = [
	{
		id: 'diseno',
		label: 'Diseño',
		description: 'Interfaces, jerarquía y criterio visual.',
		icon: 'spark',
	},
	{
		id: 'codigo',
		label: 'Código',
		description: 'Frontend, arquitectura y herramientas.',
		icon: 'code',
	},
	{
		id: 'oficio',
		label: 'Oficio',
		description: 'Carrera, hábitos y aprendizaje continuo.',
		icon: 'compass',
	},
	{
		id: 'metodo',
		label: 'Método',
		description: 'Cómo escribo, publico y organizo ideas.',
		icon: 'pen',
	},
] as const;

export type CategoryId = (typeof categories)[number]['id'];
