export type BlogComment = {
	id: string;
	postId: string;
	parentId: string | null;
	author: string;
	email: string;
	body: string;
	createdAt: string;
};

/** Demo comments — replace with a backend later. */
export const blogCommentsSeed: BlogComment[] = [
	{
		id: 'c1',
		postId: 'markdown-on-this-site',
		parentId: null,
		author: 'Laura M.',
		email: 'laura@example.com',
		body: 'The code fence example is exactly what I needed. Did you pick github-markdown-css on purpose for dark mode?',
		createdAt: '2026-05-12T14:22:00Z',
	},
	{
		id: 'c2',
		postId: 'markdown-on-this-site',
		parentId: 'c1',
		author: 'Andrés Ramos Q',
		email: 'andresramosq.dev@gmail.com',
		body: 'Yes — metadata stays in the console shell; the body uses the library stylesheet so I do not fight typography while writing.',
		createdAt: '2026-05-12T18:05:00Z',
	},
	{
		id: 'c3',
		postId: 'markdown-on-this-site',
		parentId: null,
		author: 'Devon',
		email: 'devon@test.io',
		body: 'Nested lists in section 2 rendered fine on mobile. Thanks for the full sample post.',
		createdAt: '2026-05-14T09:10:00Z',
	},
];
