export const site = {
	domain: 'andresramosq.dev',
	consoleUser: 'website',
	user: 'andres',
	name: 'Andrés Ramos Q',
	handle: '@andresramosq-dev',
	role: 'Senior Software Developer',
	location: 'Colombia · remote',
	email: 'andresramosdev.personal@gmail.com',
	phone: '+57 317 211 6762',
	since: 2020,
	avatar: '/images/avatar.svg',
	avatarPath: '~/about/avatar.jpg',
	tagline: 'Responsible for balancing product growth with system stability.',
	pillars: ['Clean', 'Solid', 'Scalable'] as const,
	consoleSlug: 'andres-ramos-console',
	description:
		'Personal console of Andrés Ramos. Backend development, APIs, microservices, and notes on the craft.',
	bioStack: ['JavaScript', 'TypeScript', 'Node.js', 'NestJS', 'Python', 'PostgreSQL', 'AWS', 'Docker'] as const,
	bioValues: ['clean code', 'modular architecture'] as const,
	bioLead: 'Backend developer with 4+ years in APIs, scalable services, and cloud infrastructure',
	bioExperience: [
		'I have built and maintained an insurance SOAT sales platform: 2 insurer integrations, a payment gateway, +20% fraud detection, -60% redundant data, plus ongoing bug fixing and system upkeep.',
		'I have also built a Virtual Contact Center from scratch — IAM, module registration, inbound/outbound calls, and more — leading the systems team and balancing product with engineering.',
	] as const,
	bioQuote:
		'No trabajo para construir el viejo que quiero ser, trabajo para no perder el joven que un día quise ser.',
	bioPersonal: [
		'Lately I have been playing a lot with AI — this site was built with it (I am not great at web design 😉).',
		'I am looking for my next challenge right now — not just writing code, but building software products or growing strong teams. If you have that kind of challenge or a proposal for me, get in touch.',
		'This site is in English — not my strongest language, but I am working on getting better at it.',
	],
	about: [],
	social: [
		{ id: 'github', icon: 'github' as const, label: 'GitHub', href: 'https://github.com/andresramos-dev', value: 'github.com/andresramos-dev' },
		{ id: 'linkedin', icon: 'linkedin' as const, label: 'LinkedIn', href: 'https://www.linkedin.com/in/andresramos-dev/', value: 'linkedin.com/in/andresramos-dev' },
		{ id: 'gmail', icon: 'mail' as const, label: 'Gmail', href: 'mailto:andresramosdev.personal@gmail.com', value: 'andresramosdev.personal@gmail.com' },
		{ id: 'spotify', icon: 'spotify' as const, label: 'Spotify', href: 'https://open.spotify.com/user/12163431588', value: 'open.spotify.com/user/12163431588' },
		{ id: 'phone', icon: 'phone' as const, label: 'Phone', href: 'tel:+573172116762', value: '+57 317 211 6762' },
	] as const,
	links: [
		{ label: 'GitHub', href: 'https://github.com/andresramos-dev', icon: 'github' as const },
		{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/andresramos-dev/', icon: 'linkedin' as const },
		{ label: 'Email', href: 'mailto:andresramosdev.personal@gmail.com', icon: 'mail' as const },
	],
};

/** Page sections with sub-path anchors (not in the main nav) */
export const aboutNav = [
	{ id: 'profile', label: 'profile' },
	{ id: 'bio', label: 'bio' },
	{ id: 'notes', label: 'notes' },
	{ id: 'now', label: 'now' },
	{ id: 'skills', label: 'skills' },
	{ id: 'principles', label: 'principles' },
] as const;

export const nav = [{ label: 'about', href: '/about' }] as const;

export const now = {
	working: 'Backend at Nova Dynamics — IAM, microservices, and AWS/Docker infrastructure.',
	learning: 'System design, cloud architecture, and clear technical writing.',
	reading: 'Backend craft, clean architecture, and maintainable codebases.',
};

export const principles = [
	{ title: 'clarity', desc: 'If it is not clear in one read, it is not ready.' },
	{ title: 'craft', desc: 'Details are not decoration — they signal respect for the people using what you build.' },
	{ title: 'document', desc: 'Writing forces you to think. Notes are part of the work, not an afterthought.' },
	{ title: 'iterate', desc: 'Ship, learn, and tighten in short cycles — not in silence.' },
];

export const skills = {
	frontend: ['TypeScript', 'React', 'Next.js', 'HTML', 'CSS', 'Tailwind CSS'],
	backend: ['Node.js', 'NestJS', 'Python', 'GraphQL', 'REST', 'PostgreSQL', 'MongoDB'],
	tools: ['Docker', 'AWS', 'GCP', 'Git', 'Linux', 'CI/CD'],
};

export const experience = [
	{
		period: '2024 — present',
		role: 'Frontend Developer',
		company: 'Digital product · remote',
		desc: 'Web interfaces, internal design system, reusable components, and continuous delivery with a team of four.',
		stack: ['TypeScript', 'React', 'CSS', 'Figma'],
	},
	{
		period: '2023 — 2024',
		role: 'Full Stack Developer',
		company: 'Freelance',
		desc: 'Custom sites and dashboards for small clients — from wireframes through deploy and maintenance.',
		stack: ['Astro', 'Node.js', 'PostgreSQL'],
	},
	{
		period: '2022',
		role: 'UI Internship',
		company: 'Local startup',
		desc: 'Prototypes, usability testing, and early versions of the component system.',
		stack: ['React', 'Figma', 'Git'],
	},
];

export const education = [
	{
		period: '2018 — 2022',
		title: 'Systems Engineering',
		place: 'University (placeholder)',
		desc: 'Foundations in algorithms, databases, and software development.',
	},
];

export const languages = [
	{ lang: 'Spanish', level: 'native' },
	{ lang: 'English', level: 'technical reading · intermediate conversation' },
];

export const interests = ['typography', 'CLI tools', 'coffee', 'hiking', 'electronic music'];

// Legacy exports used by other pages (not linked for now)
export const timeline = [
	{ year: '2026', title: 'Personal console', desc: 'Terminal-style site with Astro 7.' },
	{ year: '2025', title: 'Internal dashboard', desc: 'Operations panel.' },
	{ year: '2024', title: 'Frontend', desc: 'Product work and freelance.' },
];

export const categories = [
	{ id: 'diseno', label: 'design', description: '', icon: 'spark', color: '#4ade80' },
	{ id: 'codigo', label: 'code', description: '', icon: 'code', color: '#38bdf8' },
	{ id: 'oficio', label: 'craft', description: '', icon: 'compass', color: '#facc15' },
	{ id: 'metodo', label: 'method', description: '', icon: 'pen', color: '#a78bfa' },
] as const;

export type CategoryId = (typeof categories)[number]['id'];

export const categoryLabel: Record<CategoryId, string> = Object.fromEntries(
	categories.map((c) => [c.id, c.label])
) as Record<CategoryId, string>;

export const categoryColor: Record<CategoryId, string> = Object.fromEntries(
	categories.map((c) => [c.id, c.color])
) as Record<CategoryId, string>;
