---
title: "Markdown on this site (full sample)"
description: "A reference post with headings, lists, code, quotes, and tables — how articles render from plain .md files."
pubDate: 2026-05-10
category: codigo
tags: ["markdown", "writing", "astro"]
minutes: 8
featured: true
---

# Markdown on this site

This is the **first demo article**. I write posts as `.md` files; the site renders the body with [github-markdown-css](https://github.com/sindresorhus/github-markdown-css) so I do not hand-style every element.

## Why a sample post?

When you ship a blog, you need one ugly document that exercises every feature:

1. Headings (`h1`–`h4`)
2. Lists and tasks
3. Code (inline and fenced)
4. Blockquotes and tables
5. Links and emphasis

### Task list

- [x] Add content collections
- [x] Wire markdown renderer
- [ ] Comments API (later)

## Code

Inline code: `const answer = 42;`

```typescript
type Post = {
  title: string;
  pubDate: Date;
  tags: string[];
};

export function sortByDate(posts: Post[]): Post[] {
  return [...posts].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
}
```

```bash
website@andresramosq.dev:~/blog $ cat markdown-on-this-site.md | head
```

## Quote

> Simple beats clever when you are writing for future you — and for readers skimming on a phone.

## Table

| Piece        | Role                          |
| ------------ | ----------------------------- |
| Frontmatter  | Title, date, tags, description |
| Console UI   | Metadata around the article   |
| Markdown CSS | Body typography               |

## Nested list

- Backend
  - APIs
  - Workers
- Frontend
  - Astro
  - Minimal JS

## Closing

Metadata stays in the **terminal** layout; the article body stays faithful to markdown. Ship three real posts, delete this intro paragraph, and keep writing.
