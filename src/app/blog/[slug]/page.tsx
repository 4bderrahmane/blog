import type {Metadata} from "next";
import {notFound} from "next/navigation";
import fs from "fs";
import path from "path";
import {getPostSlugs, formatDate} from "@/lib/blog";
import {extractHeadings} from "@/lib/toc";
import {TableOfContents} from "@/components/TableOfContents";
import {Kudos} from "@/components/Kudos";
import {BackLink} from "@/components/BackLink";
import {site, blogBaseUrl} from "@/lib/site";

export function generateStaticParams() {
    return getPostSlugs().map((slug) => ({slug}));
}

export const dynamicParams = false;

async function loadPost(slug: string) {
    try {
        return await import(`@/content/blog/${slug}.mdx`);
    } catch {
        return null;
    }
}

export async function generateMetadata({
                                           params,
                                       }: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const {slug} = await params;
    const post = await loadPost(slug);
    if (!post) return {};

    const url = `${blogBaseUrl}/${slug}`;
    const {title, summary, date} = post.metadata;

    return {
        title,
        description: summary,
        alternates: {canonical: url},
        openGraph: {
            type: "article",
            url,
            title,
            description: summary,
            siteName: site.name,
            publishedTime: date,
            authors: [site.name],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description: summary,
        },
    };
}

export default async function PostPage({
                                           params,
                                       }: {
    params: Promise<{ slug: string }>;
}) {
    const {slug} = await params;
    const post = await loadPost(slug);
    if (!post) notFound();

    const {default: Content, metadata} = post;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: metadata.title,
        description: metadata.summary,
        datePublished: metadata.date,
        dateModified: metadata.date,
        url: `${blogBaseUrl}/${slug}`,
        author: {"@type": "Person", name: site.name, url: site.url},
    };

    const headings = metadata.toc
        ? extractHeadings(
              fs.readFileSync(
                  path.join(process.cwd(), "src", "content", "blog", `${slug}.mdx`),
                  "utf8"
              )
          ).map((heading) => ({
              ...heading,
              text: metadata.tocLabels?.[heading.id] ?? heading.text,
          }))
        : [];

    return (
        <div
            className={
                headings.length > 0
                    ? "xl:grid xl:grid-cols-[14rem_minmax(0,42rem)_14rem] xl:gap-8"
                    : "mx-auto max-w-2xl"
            }
        >
            {headings.length > 0 && (
                <aside className="not-prose hidden xl:block">
                    <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pr-3">
                        <TableOfContents headings={headings} />
                    </div>
                </aside>
            )}
            <article className="prose min-w-0 xl:col-start-2">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
                />
                <header className="not-prose mb-8">
                    <BackLink href={site.blogUrl} className="mb-6 -ml-1">
                        Blog
                    </BackLink>
                    <h1 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                        {metadata.title}
                    </h1>
                    <p className="mt-2 text-sm text-muted">{formatDate(metadata.date)}</p>
                </header>
                {headings.length > 0 && (
                    <div className="not-prose mb-10 border-y border-border py-4 xl:hidden">
                        <TableOfContents headings={headings} />
                    </div>
                )}
                <Content/>
                <Kudos slug={slug}/>
            </article>
        </div>
    );
}
