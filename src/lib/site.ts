// The icon each social link renders. Keep in sync with `components/icons.tsx`.
export type SocialType = "x" | "github" | "linkedin" | "blog";

export type Social = {
    type: SocialType;
    // Text shown on the pill (handle, label, or platform name).
    label: string;
    href: string;
};

const siteUrl = "https://4bderrahmane.com";
const productionBlogUrl = "https://blog.4bderrahmane.com";

function publicUrlEnv(name: string, fallback: string) {
    const value = process.env[name]?.trim();

    if (!value || value === '""' || value === "''") {
        return fallback;
    }

    if (value === "/") {
        return value;
    }

    return value.replace(/\/+$/, "");
}

const isProductionBuild = process.env.NODE_ENV === "production";

// Where the blog lives. Local dev: "/blog" (same origin). Production: prefer
// NEXT_PUBLIC_BLOG_URL, but fall back to the real blog origin if the env var is
// absent or accidentally configured as an empty string.
const blogUrl = publicUrlEnv(
    "NEXT_PUBLIC_BLOG_URL",
    isProductionBuild ? productionBlogUrl : "/blog"
);

// Central place for your personal details. Edit these and the site updates.
export const site = {
    name: "Abderrahmane Khbabez",
    role: "Software Engineer",
    bio: "I'm Abderrahmane Khbabez, a software engineer and competitive programmer. Most of the time I write software, and sometimes I write about it on my blog.",
    email: "me@4bderrahmane.com",
    url: siteUrl,
    blogUrl,
    // The main site's home. Local dev: "/". On the production blog subdomain,
    // NEXT_PUBLIC_SITE_URL should point at the apex; empty env values fall back
    // to the real apex so header links never render as href="".
    mainUrl: publicUrlEnv(
        "NEXT_PUBLIC_SITE_URL",
        isProductionBuild ? siteUrl : "/"
    ),
    socials: [
        {type: "x", label: "4bderrahmane", href: "https://x.com/4bderrahmane"},
        {type: "github", label: "GitHub", href: "https://github.com/4bderrahmane"},
        {type: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/4bderrahmane"},
        {type: "blog", label: "Blog", href: blogUrl},
    ] satisfies Social[],
};

// Absolute canonical base for blog URLs. In production this is the blog
// subdomain (NEXT_PUBLIC_BLOG_URL); when that's unset (e.g. dev) we fall back
// to the apex /blog so URLs are always absolute — required for sitemaps and
// canonical/OG tags.
export const blogBaseUrl = blogUrl.startsWith("http")
    ? blogUrl
    : `${site.url}${blogUrl}`;

export const projects = [
    {
        name: "Privote",
        description: "Privote is a privacy-preserving electronic voting platform that combines verified identity, anonymous participation, encrypted ballots, and blockchain-backed auditability.",
        href: "https://github.com/4bderrahmane/privote",
    },
    {
        name: "Threshold Elgamal",
        description: "From-scratch threshold ElGamal library with constant-time scalar handling, locked (protected) memory for secret material, and RAII-based key management.",
        href: "https://github.com/4bderrahmane/threshold-elgamal",
    },
    {
        name: "Krino",
        description: "Krino is an interview-scheduling platform for booking candidate interviews across open roles and internships, coordinating availability between interviewers and applicants from a single place.",
        href: "https://github.com/4bderrahmane/krino",
    },
];

export const interests =
    "I love to build things, break them, and build them better. Curiosity does most of the driving. I'm interested in low-level concepts, cryptography, Linux, distributed systems, and backend development.";
