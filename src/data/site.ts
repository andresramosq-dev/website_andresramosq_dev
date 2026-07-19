export const site = {
	domain: 'andresramos.dev',
	user: 'andres',
	name: 'Andrés Ramos',
	handle: '@andres_ramos_dev',
	role: 'Desarrollador de software',
	location: 'Latinoamérica',
	email: 'andfera201@gmail.com',
	since: 2020,
	/** Pon tu foto en public/images/avatar.jpg y cambia esta ruta */
	avatar: '/images/avatar.svg',
	avatarPath: '~/avatar.jpg',
	tagline: 'Interfaces, código y oficio — documentado en público.',
	description:
		'Blog de Andrés Ramos en andresramos.dev. Desarrollo de software, diseño de interfaces y reflexiones sobre el oficio.',
	bio: 'Construyo productos web y escribo para pensar mejor. Me interesa el frontend, la arquitectura de interfaces y cómo publicar ideas con claridad.',
	about: [
		'Llevo años entre código y diseño: no como disciplinas separadas, sino como el mismo problema visto desde ángulos distintos. Me gusta entender cómo se siente un producto antes de escribir la primera línea.',
		'Escribo sobre lo que aprendo construyendo software: interfaces, herramientas, hábitos y decisiones de producto. Este sitio es mi cuaderno público — ideas abiertas, no portfolio pulido.',
		'Cuando no estoy frente al editor, suelo estar leyendo sobre sistemas UI, probando frameworks o refinando cómo organizo mis notas.',
	],
	links: [
		{ label: 'GitHub', href: 'https://github.com/ramos-andres-dev', icon: 'github' as const },
		{ label: 'Email', href: 'mailto:andfera201@gmail.com', icon: 'mail' as const },
	],
};

export const nav = [
	{ label: 'sobre', href: '/andres' },
] as const;

export const now = {
	working: 'Este blog en Astro, un panel de operaciones interno y un kit de componentes UI.',
	learning: 'Patrones de contenido tipado, diseño de sistemas y escritura técnica en público.',
	reading: 'Notas sobre arquitectura frontend, DX y cómo mantener proyectos vivos con el tiempo.',
};

export const principles = [
	{
		title: 'claridad',
		desc: 'Código y texto que se entienden sin manual. Si no puedo explicarlo, no lo entiendo.',
	},
	{
		title: 'oficio',
		desc: 'La calidad no es un filtro final: es el hábito de revisar, simplificar y cuidar los detalles.',
	},
	{
		title: 'documentar',
		desc: 'Escribir en público obliga a pensar mejor. Las notas son parte del trabajo, no un extra.',
	},
	{
		title: 'iterar',
		desc: 'Los productos y los blogs mejoran en ciclos cortos. Publicar imperfecto > perfeccionar en silencio.',
	},
];

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

export const experience = [
	{
		period: '2024 — presente',
		role: 'Desarrollador Frontend',
		company: 'Producto & freelance',
		desc: 'Interfaces web, design systems, componentes reutilizables y entrega continua en equipos pequeños.',
		stack: ['TypeScript', 'React', 'Astro', 'CSS'],
	},
	{
		period: '2025',
		role: 'Panel de operaciones',
		company: 'Proyecto interno',
		desc: 'Dashboard para seguimiento de entregas, estados y bloqueos de equipo.',
		stack: ['React', 'Node.js', 'PostgreSQL'],
	},
	{
		period: '2024',
		role: 'Kit de componentes UI',
		company: 'Experimento / estudio',
		desc: 'Biblioteca interna con tokens, variantes y documentación en Storybook.',
		stack: ['TypeScript', 'Storybook', 'CSS'],
	},
];

export const timeline = [
	{
		year: '2026',
		title: 'Blog personal',
		desc: 'Sitio con Astro 7, collections tipadas y diseño dev-terminal.',
	},
	{
		year: '2025',
		title: 'Panel de operaciones',
		desc: 'Herramienta interna para seguimiento de entregas y estados de proyecto.',
	},
	{
		year: '2024',
		title: 'Frontend & producto',
		desc: 'Interfaces web, design systems y entrega continua en equipos pequeños.',
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
