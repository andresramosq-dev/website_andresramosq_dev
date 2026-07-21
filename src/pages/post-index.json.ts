import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { buildPostIndex } from '../lib/blog-index';

/** Static JSON index for filters/search — rebuilt on every deploy when posts change. */
export const GET: APIRoute = async () => {
	const posts = await getCollection('blog', ({ data }) => !data.draft);
	const index = buildPostIndex(posts);
	return new Response(JSON.stringify(index), {
		headers: { 'Content-Type': 'application/json' },
	});
};
