export const site = {
	domain: 'andresramos.dev',
	consoleUser: 'blog',
	user: 'andres',
	name: 'Andrés Ramos',
	handle: '@andresramos-dev',
	role: 'Senior Software Developer',
	location: 'Pitalito, Huila · remote',
	email: 'andfera201@gmail.com',
	phone: '+57 317 211 6762',
	since: 2020,
	avatar: '/images/avatar.svg',
	avatarPath: '~/about/avatar.jpg',
	tagline: 'I help you build software your team will love maintaining:',
	pillars: ['Clean', 'Solid', 'Scalable'] as const,
	consoleSlug: 'consola-de-andres-ramos',
	description:
		'Personal console of Andrés Ramos. Backend development, APIs, microservices, and notes on the craft.',
	bio: `Backend developer with 4+ years of experience across R5 Colombia and Nova Dynamics.
Built insurer and payment gateway integrations for SOAT sales platforms, IAM and microservice
orchestration, and production backends with Python, TypeScript, Node.js, NestJS, GraphQL,
PostgreSQL, MongoDB, Docker, and AWS.`,
	about: [],
	social: [
		{ id: 'github', icon: 'github' as const, label: 'GitHub', href: 'https://github.com/aframos-dev', value: 'github.com/aframos-dev' },
		{ id: 'linkedin', icon: 'linkedin' as const, label: 'LinkedIn', href: 'https://linkedin.com/in/andresramos-developer', value: 'linkedin.com/in/andresramos-developer' },
		{ id: 'gmail', icon: 'mail' as const, label: 'Gmail', href: 'mailto:andfera201@gmail.com', value: 'andfera201@gmail.com' },
		{ id: 'spotify', icon: 'spotify' as const, label: 'Spotify', href: 'https://open.spotify.com/user/andresramos', value: 'open.spotify.com/andresramos' },
		{ id: 'phone', icon: 'phone' as const, label: 'Phone', href: 'tel:+573172116762', value: '+57 317 211 6762' },
	] as const,
	links: [
		{ label: 'GitHub', href: 'https://github.com/ramos-andres-dev', icon: 'github' as const },
		{ label: 'LinkedIn', href: 'https://linkedin.com/in/andresramos', icon: 'linkedin' as const },
		{ label: 'Email', href: 'mailto:andfera201@gmail.com', icon: 'mail' as const },
	],
};

/** Secciones con sub-path en la página (no en el menú) */
export const aboutNav = [
	{ id: 'perfil', label: 'perfil' },
	{ id: 'bio', label: 'bio' },
	{ id: 'now', label: 'now' },
	{ id: 'skills', label: 'skills' },
	{ id: 'principles', label: 'principles' },
] as const;

export const nav = [{ label: 'about', href: '/about' }] as const;

export const now = {
	working: 'Backend services at Nova Dynamics — IAM, microservices, and AWS/Docker infrastructure.',
	learning: 'System design, cloud architecture, and technical writing.',
	reading: 'Notes on backend engineering, clean architecture, and maintainable codebases.',
};

export const principles = [
	{ title: 'clarity', desc: 'If it is not clear in one read, it is not ready yet.' },
	{ title: 'craft', desc: 'Details are not decoration — they signal respect for the people using what you build.' },
	{ title: 'document', desc: 'Writing forces you to think. Notes are part of the work, not an extra.' },
	{ title: 'iterate', desc: 'Ship imperfect work and improve in short cycles rather than perfecting in silence.' },
];

export const skills = {
	frontend: ['TypeScript', 'React', 'Next.js', 'HTML', 'CSS', 'Tailwind CSS'],
	backend: ['Node.js', 'NestJS', 'Python', 'GraphQL', 'REST', 'PostgreSQL', 'MongoDB'],
	tools: ['Docker', 'AWS', 'GCP', 'Git', 'Linux', 'CI/CD'],
};

export const experience = [
	{
		period: '2024 — presente',
		role: 'Desarrollador Frontend',
		company: 'Producto digital · remoto',
		desc: 'Interfaces web, design system interno, componentes reutilizables y entrega continua con equipo de 4 personas.',
		stack: ['TypeScript', 'React', 'CSS', 'Figma'],
	},
	{
		period: '2023 — 2024',
		role: 'Desarrollador Full Stack',
		company: 'Freelance',
		desc: 'Sitios y paneles a medida para clientes pequeños. Desde wireframes hasta deploy y mantenimiento.',
		stack: ['Astro', 'Node.js', 'PostgreSQL'],
	},
	{
		period: '2022',
		role: 'Prácticas · UI',
		company: 'Startup local',
		desc: 'Apoyo en prototipos, pruebas de usabilidad y primeras versiones del sistema de componentes.',
		stack: ['React', 'Figma', 'Git'],
	},
];

export const education = [
	{
		period: '2018 — 2022',
		title: 'Ingeniería de sistemas',
		place: 'Universidad (placeholder)',
		desc: 'Base en algoritmos, bases de datos y desarrollo de software.',
	},
];

export const languages = [
	{ lang: 'Español', level: 'nativo' },
	{ lang: 'Inglés', level: 'lectura técnica · conversación intermedia' },
];

export const interests = ['tipografía', 'CLI tools', 'café', 'senderismo', 'música electrónica'];

// Legacy exports used by other pages (not linked for now)
export const timeline = [
	{ year: '2026', title: 'Consola personal', desc: 'Sitio terminal con Astro 7.' },
	{ year: '2025', title: 'Panel interno', desc: 'Dashboard de operaciones.' },
	{ year: '2024', title: 'Frontend', desc: 'Producto y freelance.' },
];

export const categories = [
	{ id: 'diseno', label: 'diseño', description: '', icon: 'spark', color: '#4ade80' },
	{ id: 'codigo', label: 'código', description: '', icon: 'code', color: '#38bdf8' },
	{ id: 'oficio', label: 'oficio', description: '', icon: 'compass', color: '#facc15' },
	{ id: 'metodo', label: 'método', description: '', icon: 'pen', color: '#a78bfa' },
] as const;

export type CategoryId = (typeof categories)[number]['id'];

export const categoryLabel: Record<CategoryId, string> = Object.fromEntries(
	categories.map((c) => [c.id, c.label])
) as Record<CategoryId, string>;

export const categoryColor: Record<CategoryId, string> = Object.fromEntries(
	categories.map((c) => [c.id, c.color])
) as Record<CategoryId, string>;
