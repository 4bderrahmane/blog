import type {Metadata} from "next";
import Link from "next/link";
import {SiteFooter} from "@/components/SiteFooter";
import {Hero} from "@/components/Hero";
import {site, projects, interests} from "@/lib/site";
import {getAllPosts, formatDate} from "@/lib/blog";

export const metadata: Metadata = {
    alternates: {canonical: site.url},
};

export default async function Home() {
    const recentPosts = (await getAllPosts()).slice(0, 3);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: site.name,
        url: site.url,
        jobTitle: site.role,
        sameAs: site.socials
            .map((s) => s.href)
            .filter((href) => href.startsWith("http")),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
            />
            <Hero/>
            <main className="mx-auto w-full max-w-2xl flex-1 px-6 pb-20 pt-14">
                {/* Strip the trailing "blog" so it can be re-added as a link. */}
                <p className="text-lg leading-relaxed">
                    {site.bio.replace(/\s*blog\.?$/, "")}{" "}
                    <a href={site.blogUrl} className="text-blue-600 hover:underline">
                        blog
                    </a>
                    .
                </p>

                <section className="mt-12">
                    <h2 className="font-display text-sm font-bold uppercase tracking-widest text-muted">
                        Interests
                    </h2>
                    <p className="mt-3 leading-relaxed">{interests}</p>
                </section>

                <section className="mt-12">
                    <h2 className="font-display text-sm font-bold uppercase tracking-widest text-muted">
                        Projects
                    </h2>
                    <ul className="mt-3 space-y-4">
                        {projects.map((project) => (
                            <li key={project.name}>
                                <a
                                    href={project.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-medium hover:underline"
                                >
                                    {project.name}
                                </a>
                                <p className="text-muted">{project.description}</p>
                            </li>
                        ))}
                    </ul>
                    <Link
                        href="/projects"
                        className="mt-4 inline-block text-sm text-accent hover:underline"
                    >
                        See all projects →
                    </Link>
                </section>

                {recentPosts.length > 0 && (
                    <section className="mt-12">
                        <h2 className="font-display text-sm font-bold uppercase tracking-widest text-muted">
                            Writing
                        </h2>
                        <ul className="mt-3 space-y-4">
                            {recentPosts.map((post) => (
                                <li key={post.slug}>
                                    <a
                                        href={`${site.blogUrl}/${post.slug}`}
                                        className="font-medium hover:underline"
                                    >
                                        {post.title}
                                    </a>
                                    <p className="text-sm text-muted">{formatDate(post.date)}</p>
                                </li>
                            ))}
                        </ul>
                        <a
                            href={site.blogUrl}
                            className="mt-4 inline-block text-sm text-accent hover:underline"
                        >
                            Read the blog →
                        </a>
                    </section>
                )}

                <section className="mt-12">
                    <h2 className="font-display text-sm font-bold uppercase tracking-widest text-muted">
                        Contact
                    </h2>
                    <p className="mt-3">
                        If you have any questions, comments, suggestions, bug reports,
                        compliments or even insults, you can mail me here:{" "}
                        <a href={`mailto:${site.email}`} className="text-accent hover:underline">
                            {site.email}
                        </a>
                    </p>
                </section>
            </main>
            <SiteFooter/>
        </>
    );
}
