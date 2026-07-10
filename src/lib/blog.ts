import fs from "fs";
import path from "path";

// Where the .mdx posts live.
const POSTS_DIR = path.join(process.cwd(), "src", "content", "blog");

export type PostMeta = {
    title: string;
    date: string; // ISO string, e.g. "2026-05-20"
    summary: string;
    toc?: boolean;
    tocLabels?: Record<string, string>;
};

export type Post = PostMeta & { slug: string };

// Fixed "en-US" locale so server-rendered dates stay deterministic.
export function formatDate(date: string): string {
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

// Each post is `src/content/blog/<slug>.mdx` and exports a `metadata` object.
export function getPostSlugs(): string[] {
    if (!fs.existsSync(POSTS_DIR)) return [];
    return fs
        .readdirSync(POSTS_DIR)
        .filter((file) => file.endsWith(".mdx"))
        .map((file) => file.replace(/\.mdx$/, ""));
}

export async function getPost(slug: string): Promise<Post> {
    const {metadata} = await import(`@/content/blog/${slug}.mdx`);
    return {slug, ...metadata};
}

// All posts, newest first — used by the blog index.
export async function getAllPosts(): Promise<Post[]> {
    const posts = await Promise.all(getPostSlugs().map((slug) => getPost(slug)));
    return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}
