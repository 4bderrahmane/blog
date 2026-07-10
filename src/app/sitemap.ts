import type {MetadataRoute} from "next";
import {getAllPosts} from "@/lib/blog";
import {site, blogBaseUrl} from "@/lib/site";

// Main-site pages live on the apex (site.url); blog URLs use the absolute
// canonical blog base (subdomain in prod) to match where /blog/* redirects.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await getAllPosts();

    const pages: MetadataRoute.Sitemap = [
        { url: site.url, lastModified: new Date() },
        { url: `${site.url}/projects`, lastModified: new Date() },
        { url: blogBaseUrl, lastModified: new Date() },
    ];

    const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
        url: `${blogBaseUrl}/${post.slug}`,
        lastModified: new Date(post.date),
    }));

    return [...pages, ...postPages];
}
