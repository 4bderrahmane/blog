import type {Metadata} from "next";
import {SiteFooter} from "@/components/SiteFooter";
import {BackLink} from "@/components/BackLink";
import {projects, site} from "@/lib/site";

export const metadata: Metadata = {
    title: "Projects",
    alternates: {canonical: `${site.url}/projects`},
};

export default function ProjectsPage() {
    return (
        <>
            <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-16">
                <BackLink href={site.mainUrl} className="mb-8 -ml-1">
                    Home
                </BackLink>
                <h1 className="font-serif text-3xl font-semibold tracking-tight">Projects</h1>
                <p className="mt-3 text-muted">Things I&apos;ve built and maintain.</p>

                <ul className="mt-8 space-y-8">
                    {projects.map((project) => (
                        <li key={project.name}>
                            <a
                                href={project.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xl font-medium hover:underline"
                            >
                                {project.name}
                            </a>
                            <p className="mt-1 text-muted">{project.description}</p>
                        </li>
                    ))}
                </ul>
            </main>
            <SiteFooter/>
        </>
    );
}
