export const site = {
	domain: 'andresramosq.dev',
	consoleUser: 'website',
	name: 'Andrés Ramos Q',
	handle: '@andresramosq-dev',
	role: 'Senior Software Developer',
	location: 'Colombia · remote',
	avatar: '/images/me.jpg',
	tagline: 'Responsible for balancing product growth with system stability.',
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
		"I don't work to become the old man I want to be — I work so I don't lose the young man I once wanted to become.",
	bioPersonal: [
		'Lately I have been playing a lot with AI — this site was built with it (I am not great at web design 😉).',
		'I am looking for my next challenge right now — not just writing code, but building software products or growing strong teams. If you have that kind of challenge or a proposal for me, get in touch.',
		'This site is in English — not my strongest language, but I am working on getting better at it.',
	],
	social: [
		{ id: 'github', icon: 'github' as const, label: 'GitHub', href: 'https://github.com/andresramos-dev', value: 'github.com/andresramos-dev' },
		{ id: 'linkedin', icon: 'linkedin' as const, label: 'LinkedIn', href: 'https://www.linkedin.com/in/andresramos-dev/', value: 'linkedin.com/in/andresramos-dev' },
		{ id: 'gmail', icon: 'mail' as const, label: 'Gmail', href: 'mailto:andresramosdev.personal@gmail.com', value: 'andresramosdev.personal@gmail.com' },
		{ id: 'spotify', icon: 'spotify' as const, label: 'Spotify', href: 'https://open.spotify.com/user/12163431588', value: 'open.spotify.com/user/12163431588' },
		{ id: 'cv', icon: 'cv' as const, label: 'CV', href: '', value: 'cv' },
	] as const,
	links: [
		{ label: 'GitHub', href: 'https://github.com/andresramos-dev' },
		{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/andresramos-dev/' },
		{ label: 'Email', href: 'mailto:andresramosdev.personal@gmail.com' },
	],
};

export const nav = [{ label: 'about', href: '/about' }] as const;

export const now = {
	exploring: 'AI for web development — building and breaking things with it, including this site.',
	looking_for: 'A real challenge to build: a product worth shipping, or a team worth growing with.',
	into: 'Getting better at English, shipping small personal experiments, and staying curious outside the day-to-day.',
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

export const categories = [
	{ id: 'diseno', label: 'design', description: '', color: '#4ade80' },
	{ id: 'codigo', label: 'code', description: '', color: '#38bdf8' },
	{ id: 'oficio', label: 'craft', description: '', color: '#facc15' },
	{ id: 'metodo', label: 'method', description: '', color: '#a78bfa' },
] as const;

export type CategoryId = (typeof categories)[number]['id'];

export const categoryLabel: Record<CategoryId, string> = Object.fromEntries(
	categories.map((c) => [c.id, c.label])
) as Record<CategoryId, string>;
