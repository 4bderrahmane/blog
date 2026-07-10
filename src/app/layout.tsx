import type {Metadata} from "next";
import {Geist, Geist_Mono, Montserrat, Fraunces} from "next/font/google";
import {site} from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

// Display font for the name / headings — a free, geometric stand-in for
// Proxima Nova. To try another, swap the import above and this one call (e.g.
// `Sora`, `Maven_Pro`); the `--font-display-raw` variable name stays the same,
// so nothing else needs to change.
const displayFont = Montserrat({
    variable: "--font-display-raw",
    subsets: ["latin"],
    weight: ["600", "700", "800"],
});

// Serif voice for article / post titles — the editorial contrast against the
// bold grotesk. Fraunces is a variable serif with optical sizing; to swap it,
// change this import + call only (the `--font-serif-raw` variable name stays).
const serifFont = Fraunces({
    variable: "--font-serif-raw",
    subsets: ["latin"],
});

// X handle derived from the configured social link, so it stays in sync.
const xHandle = site.socials
    .find((social) => social.type === "x")
    ?.href.split("/")
    .pop();

export const metadata: Metadata = {
    metadataBase: new URL(site.url),
    title: {
        default: site.name,
        template: `%s · ${site.name}`,
    },
    description: site.bio,
    icons: {
        icon: "/icon.svg",
    },
    openGraph: {
        type: "website",
        url: site.url,
        siteName: site.name,
        title: site.name,
        description: site.bio,
    },
    twitter: {
        card: "summary_large_image",
        title: site.name,
        description: site.bio,
        creator: xHandle ? `@${xHandle}` : undefined,
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} ${displayFont.variable} ${serifFont.variable} h-full antialiased`}
        >
        <body className="min-h-full flex flex-col">{children}</body>
        </html>
    );
}
