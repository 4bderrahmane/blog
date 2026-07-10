import { NextResponse } from "next/server";
import type {NextRequest} from "next/server";

// In Next.js 16, "Middleware" was renamed to "Proxy" (same functionality).
// Single app, two hostnames:
//   blog.4bderrahmane.com/*  -> rewritten to /blog/*  (serves app/blog/...)
//   4bderrahmane.com/blog/*  -> redirected to blog.4bderrahmane.com/*  (no duplicate URLs)
//   4bderrahmane.com/*       -> main site, untouched

const APEX = "4bderrahmane.com"; // <-- confirm spelling matches the host Vercel serves
const BLOG = `blog.${APEX}`;

export function proxy(request: NextRequest) {
    const hostname = (request.headers.get("host") ?? "").split(":")[0]; // strip port in local dev
    const url = request.nextUrl;

    // blog.4bderrahmane.com/x -> serve /blog/x content
    if (hostname === BLOG && !url.pathname.startsWith("/blog")) {
        const rewritten = url.clone();
        rewritten.pathname = `/blog${url.pathname === "/" ? "" : url.pathname}`;
        return NextResponse.rewrite(rewritten);
    }

    // 4bderrahmane.com/blog/x -> redirect to blog.4bderrahmane.com/x (avoid duplicate URLs)
    if (hostname === APEX && url.pathname.startsWith("/blog")) {
        const rest = url.pathname.replace(/^\/blog/, "") || "/";
        return NextResponse.redirect(new URL(rest + url.search, `https://${BLOG}`), 308);
    }

    return NextResponse.next();
}

export const config = {
    // Run on everything except API routes, Next/Vercel internals, and files with an extension.
    matcher: ["/((?!api|_next/|_vercel/|.*\\..*).*)"],
};
