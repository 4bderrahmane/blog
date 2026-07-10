import type {Metadata} from "next";
import {SiteHeader} from "@/components/SiteHeader";
import {SiteFooter} from "@/components/SiteFooter";
import {site, blogBaseUrl} from "@/lib/site";

export const metadata: Metadata = {
    // A plain string inherits the root "%s · {name}" template, resolving to
    // "Blog · {name}". Post pages set their own title string the same way.
    title: "Blog",
    description: `Writing by ${site.name}.`,
    // Default canonical for the blog index; individual posts override this.
    alternates: {canonical: blogBaseUrl},
    openGraph: {
        type: "website",
        url: blogBaseUrl,
        siteName: site.name,
        title: "Blog",
        description: `Writing by ${site.name}.`,
    },
};

export default function BlogLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <SiteHeader/>
            <main className="mx-auto w-full max-w-7xl flex-1 px-6 pb-16 pt-8">
                {children}
            </main>
            <SiteFooter/>
        </>
    );
}

// test
