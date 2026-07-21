import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../data/site';

export const GET: APIRoute = async ({ site: astroSite }) => {
	const base = astroSite?.href ?? 'https://example.com';
	const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
	);

	const items = posts
		.map((post) => {
			const url = new URL(`/posts/${post.id}`, base).href;
			return `    <item>
      <title><![CDATA[${post.data.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description><![CDATA[${post.data.description}]]></description>
      <pubDate>${post.data.pubDate.toUTCString()}</pubDate>
    </item>`;
		})
		.join('\n');

	const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${site.domain}</title>
    <description>${site.description}</description>
    <language>es</language>
${items}
  </channel>
</rss>`;

	return new Response(rss, {
		headers: { 'Content-Type': 'application/xml; charset=utf-8' },
	});
};
