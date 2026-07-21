import type { CollectionEntry } from 'astro:content';
import type { CategoryId } from '../data/site';

/** Built once per page from published posts — maps category/tag → post ids (newest first). */
export type PostIndex = {
	all: string[];
	byCategory: Record<CategoryId, string[]>;
	byTag: Record<string, string[]>;
};

export function buildPostIndex(posts: CollectionEntry<'blog'>[]): PostIndex {
	const sorted = [...posts].sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
	const all = sorted.map((p) => p.id);
	const byCategory = {} as Record<CategoryId, string[]>;
	const byTag: Record<string, string[]> = {};

	for (const post of sorted) {
		const cat = post.data.category;
		if (!byCategory[cat]) byCategory[cat] = [];
		byCategory[cat].push(post.id);
		for (const tag of post.data.tags) {
			if (!byTag[tag]) byTag[tag] = [];
			byTag[tag].push(post.id);
		}
	}

	return { all, byCategory, byTag };
}

export function resolvePostsFromIndex(
	index: PostIndex,
	byId: Map<string, CollectionEntry<'blog'>>,
	opts: { category?: CategoryId | 'all'; tag?: string | 'all' },
): CollectionEntry<'blog'>[] {
	const { category = 'all', tag = 'all' } = opts;
	let ids: string[];

	if (tag !== 'all') {
		ids = index.byTag[tag] ?? [];
	} else if (category !== 'all') {
		ids = index.byCategory[category] ?? [];
	} else {
		ids = index.all;
	}

	return ids.map((id) => byId.get(id)).filter((p): p is CollectionEntry<'blog'> => Boolean(p));
}

export function indexCategoryIds(index: PostIndex): CategoryId[] {
	return Object.keys(index.byCategory) as CategoryId[];
}

export function indexTagNames(index: PostIndex): string[] {
	return Object.keys(index.byTag).sort((a, b) => a.localeCompare(b));
}
