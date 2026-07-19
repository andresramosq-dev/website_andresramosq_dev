export const site = {
	domain: 'andresramosq.dev',
	consoleUser: 'website',
	name: 'Andrés Ramos Q',
	handle: '@andresramosq-dev',
	role: 'Mid Software Developer',
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
	social: [
		{ id: 'github', icon: 'github' as const, label: 'GitHub', href: 'https://github.com/andresramosq-dev', value: 'github.com/andresramosq-dev' },
		{ id: 'linkedin', icon: 'linkedin' as const, label: 'LinkedIn', href: 'https://www.linkedin.com/in/andresramosq-dev', value: 'linkedin.com/in/andresramosq-dev' },
		{ id: 'gmail', icon: 'mail' as const, label: 'Gmail', href: 'mailto:andresramosq.dev@gmail.com', value: 'andresramosq.dev@gmail.com' },
		{ id: 'spotify', icon: 'spotify' as const, label: 'Spotify', href: 'https://open.spotify.com/user/12163431588', value: 'open.spotify.com/user/12163431588' },
		{ id: 'cv', icon: 'cv' as const, label: 'CV', href: '/about', value: 'cv' },
	] as const,
	links: [
		{ label: 'GitHub', href: 'https://github.com/andresramosq-dev' },
		{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/andresramosq-dev' },
		{ label: 'Email', href: 'mailto:andresramosq.dev@gmail.com' },
	],
	aboutSite: {
		leadBefore: 'This is',
		leadAfter:
			' — my space to share ideas, projects, and what I am learning as a developer.',
		body: [
			'Here I write about software, technology, product thinking, and the day-to-day of building systems. You will find notes, experiments, lessons from real work, and a blog where I publish what I am exploring right now.',
			'It is also a place to leave a trail of my process: architecture decisions, tools I am trying, mistakes worth documenting, and the skills I am sharpening over time.',
		] as const,
		builtBefore: 'I built it with',
		builtWith: ['Astro'] as const,
		builtMid: ', with help from',
		builtAlso: ['Cursor'] as const,
		builtAfter:
			' to move faster on the development side (I am not that great at web design 😉).',
		design:
			'The terminal look comes from how much I like simple design — and because this is my workspace, I wanted it to feel a bit like my day to day: open consoles, test runs, and the next error to fix.',
		language:
			'I write everything in English. It is not my strongest language yet, but practicing here is part of the point: clearer thinking, shorter sentences, and the habit of writing in public.',
	},
};

export const nav = [{ label: 'about', href: '/about' }] as const;

export const now = {
	focused_on:
		'Experimenting with AI, deepening architecture skills, leading product ideas, and strengthening my English.',
	looking_for:
		'Projects or ideas where I can contribute and help take them to production. If you have a project or a proposal, get in touch.',
	philosophy:
		'I aim for simplicity: clear, clean, modular software — tied to the product.',
};

export const craft = {
	lead:
		'I work best when I slow down enough to understand the problem, then build in pieces that stay clear as the product evolves.',
	mindset:
		'Simple, modular, product-minded — I question assumptions, compare options, and adjust as I learn instead of locking into the first idea.',
	stackDirs: [
		{
			dir: 'backend',
			items: ['Node.js', 'NestJS', 'Python', 'REST', 'GraphQL', 'PostgreSQL', 'MongoDB'],
		},
		{
			dir: 'frontend',
			items: ['TypeScript', 'React', 'Next.js', 'HTML', 'CSS', 'Tailwind CSS'],
		},
		{ dir: 'cloud', items: ['AWS', 'Docker', 'Git', 'Linux', 'CI/CD'] },
	] as const,
};

export const personal = {
	lead:
		'Away from the editor I recharge with philosophy, sport, and stories that stay with me — same curiosity, different fuel.',
	blocks: [
		{
			key: 'figures',
			text: 'Marcus Aurelius and Charlemagne — inner discipline on one side, building something larger than yourself on the other.',
		},
		{
			key: 'reads',
			text: 'Meditations, Clean Code, and Designing Data-Intensive Applications — stoicism, craft, and systems that have to last.',
		},
		{
			key: 'screen',
			text: 'Interstellar, The Social Network, Silo, and The Bear — scale, obsession, and people under real pressure.',
		},
		{
			key: 'sound',
			text: 'Film scores and lo-fi while I think; louder rock when I need to reset after a long debug session.',
		},
		{
			key: 'field',
			text: 'Football with friends, gym, and walks — movement keeps my head as clear as my code should be.',
		},
	] as const,
};

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
