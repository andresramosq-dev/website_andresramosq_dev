export const site = {
	domain: 'andresramos.dev',
	user: 'andres',
	name: 'Andrés Ramos',
	handle: '@andres_ramos_dev',
	role: 'Desarrollador de software',
	location: 'Bogotá, Colombia',
	email: 'andfera201@gmail.com',
	since: 2020,
	avatar: '/images/avatar.svg',
	avatarPath: '~/andres/avatar.jpg',
	tagline: 'Interfaces, código y oficio — documentado en público.',
	consoleTitle: 'consola de Andrés Ramos',
	description:
		'Consola personal de Andrés Ramos. Desarrollo de software, diseño de interfaces y notas sobre el oficio.',
	bio: 'Construyo productos web con criterio. Me mueven las interfaces bien pensadas, el código legible y publicar lo que aprendo en el camino.',
	about: [
		'Soy desarrollador con base en frontend y curiosidad por el producto completo. Me gusta entender el problema antes de elegir la herramienta, y diseñar experiencias que se sientan claras sin necesidad de manual.',
		'He trabajado en equipos pequeños, proyectos propios y entregas freelance. Eso me enseñó a priorizar, documentar decisiones y mantener código que otra persona —o yo en seis meses— pueda leer sin sufrimiento.',
		'Fuera del editor: leo sobre sistemas de diseño, pruebo stacks nuevos en side projects y escribo notas cortas sobre lo que voy aprendiendo. Este sitio es ese cuaderno, en formato terminal.',
	],
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

export const nav = [{ label: 'andres', href: '/andres' }] as const;

export const now = {
	working: 'Este sitio en Astro, un dashboard interno para seguimiento de tareas y un design system personal.',
	learning: 'Arquitectura de contenido, animaciones con CSS y escritura técnica en público.',
	reading: 'Notas sobre UX engineering, DX moderna y cómo mantener proyectos vivos con el tiempo.',
};

export const principles = [
	{ title: 'claridad', desc: 'Si no se entiende en una lectura, todavía no está listo.' },
	{ title: 'oficio', desc: 'Los detalles no son decoración: son señal de respeto por quien usa lo que construyes.' },
	{ title: 'documentar', desc: 'Escribir obliga a pensar. Las notas son parte del trabajo, no un extra.' },
	{ title: 'iterar', desc: 'Publicar imperfecto y mejorar en ciclos cortos beats perfeccionar en silencio.' },
];

export const skills = {
	frontend: ['TypeScript', 'React', 'Astro', 'CSS', 'HTML'],
	backend: ['Node.js', 'PostgreSQL', 'REST'],
	tools: ['Git', 'Figma', 'Linux', 'Vercel', 'Storybook'],
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
