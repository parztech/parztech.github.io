import "server-only";

import GithubSlugger from "github-slugger";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export type Heading = { id: string; text: string; level: 2 | 3 };

// Raw HTML in markdown is dropped (remark-rehype default), so output is safe to inject
const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeSlug)
  .use(rehypePrettyCode, {
    theme: { light: "github-light", dark: "github-dark-dimmed" },
    keepBackground: false,
  })
  .use(rehypeStringify);

export async function renderMarkdown(markdown: string) {
  return String(await processor.process(markdown));
}

// Mirrors rehype-slug (which also uses github-slugger) so TOC ids match
export function extractHeadings(markdown: string): Heading[] {
  const slugger = new GithubSlugger();
  return [...markdown.matchAll(/^(#{2,3})\s+(.+)$/gm)].map((m) => {
    const text = m[2].replace(/[*_`]/g, "").trim();
    return { id: slugger.slug(text), text, level: m[1].length as 2 | 3 };
  });
}
