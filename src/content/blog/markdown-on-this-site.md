---
title: "Markdown visual guide (how to write & how it looks)"
description: "First reference post: frontmatter, headings, lists, code, quotes, tables, and links — one file you can copy for new articles."
pubDate: 2026-07-21
category: codigo
tags: ["markdown", "guide", "reference"]
minutes: 12
draft: false
---

Write posts as `.md` files in `src/content/blog/`. The block between `---` lines is **frontmatter** (not shown as body text). The site reads it for the blog list and the terminal metadata above the article.

| Frontmatter field | What it does on the site |
| ----------------- | ------------------------ |
| `title` | Page title and list heading |
| `description` | Short summary on `/blog` |
| `pubDate` | Published date |
| `tags` | Tags in metadata |
| `category` | `diseno`, `codigo`, `oficio`, or `metodo` |
| `minutes` | Read time hint |
| `draft: true` | Hidden until you set `false` |

---

## Headings

In your `.md` file you write `#` through `####`. Below is how each level renders.

# Heading 1 (`#` — use once per article, optional if `title` is enough)

## Heading 2 (`##`)

### Heading 3 (`###`)

#### Heading 4 (`####`)

---

## Paragraphs and emphasis

This is a normal paragraph. Separate paragraphs with a blank line.

- **Bold** with `**bold**`
- *Italic* with `*italic*`
- ***Bold italic*** with `***both***`
- ~~Strikethrough~~ with `~~text~~`
- Inline code with backticks: `npm run build`

---

## Links

[Link to this site’s about page](/about)

[External link with title](https://www.markdownguide.org/basic-syntax/ "Markdown Guide")

Autolink style: <https://astro.build>

---

## Unordered list

```markdown
- first
- second
  - nested
- third
```

- first
- second
  - nested item
  - another nested
- third

---

## Ordered list

```markdown
1. Build
2. Deploy
3. Write
```

1. Add or edit a `.md` file
2. Run `npm run build` locally to preview
3. Push and deploy

---

## Task list (checkboxes)

```markdown
- [x] done
- [ ] todo
```

- [x] Create this reference post
- [x] Set `draft: false` to publish
- [ ] Write your first real article
- [ ] Delete sections you do not need

---

## Blockquote

```markdown
> Quote line
```

> The article body uses Markdown; the console chrome around it is Astro.
>
> Second line in the same quote.

Nested quote:

> Outer
>
> > Inner

---

## Code blocks

**Fenced block** with language tag for highlighting:

```typescript
interface BlogPost {
	title: string;
	pubDate: Date;
	tags: string[];
	draft?: boolean;
}

export const slugFromFile = (path: string) => path.replace(/\.md$/, '');
```

```bash
# preview locally
npm run dev
# open http://localhost:4321/blog/markdown-on-this-site
```

```json
{
	"title": "From JSON",
	"tags": ["example"]
}
```

Plain fence with no language:

```
no language tag — monospace, no colors
```

---

## Table

```markdown
| Col A | Col B |
| ----- | ----- |
| one   | two   |
```

| Syntax | Rendered as |
| ------ | ----------- |
| `**x**` | **bold** |
| `` `code` `` | `code` |
| `[t](url)` | link |

Alignment (GFM):

| Left | Center | Right |
| :--- | :----: | ----: |
| a | b | c |

---

## Horizontal rule

Three dashes on their own line:

---

## Image (optional)

If you add files under `public/`:

```markdown
![Alt text](/images/me.jpg)
```

![Photo placeholder — Andrés site avatar](/images/me.jpg)

---

## HTML (use sparingly)

Markdown allows some raw HTML when you need it:

<kbd>Ctrl</kbd> + <kbd>S</kbd> to save the file.

---

## Mixing everything (realistic snippet)

When I document an API I often combine a short intro, a list, and a code sample:

1. State the goal in one sentence.
2. Show the command or type.
3. Link to related posts later.

```javascript
const posts = await getCollection('blog', ({ data }) => !data.draft);
```

> **Tip:** Keep `draft: true` while writing; flip to `false` when the post is ready for `/blog`.

That is the full toolkit for now. Copy this file, change the frontmatter and body, and ship.
