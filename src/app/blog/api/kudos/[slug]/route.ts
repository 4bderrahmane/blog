import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";
import {getKudos, setKudos} from "@/lib/kudos";

// Lives under /blog/api so it's reachable on both the apex (/blog/api/...) and
// the production blog subdomain (the proxy rewrites blog.host/api/... here).
export const dynamic = "force-dynamic";

// Slugs are simple kebab-case filenames; reject anything else so the store
// can't be polluted with arbitrary keys.
const isValidSlug = (slug: string) =>
    /^[a-z0-9-]{1,128}$/.test(slug);

export async function GET(
    request: NextRequest,
    {params}: { params: Promise<{ slug: string }> },
) {
    const {slug} = await params;
    if (!isValidSlug(slug)) {
        return NextResponse.json({error: "Not found"}, {status: 404});
    }
    const visitorId = request.nextUrl.searchParams.get("visitorId") ?? undefined;
    return NextResponse.json(await getKudos(slug, visitorId));
}

export async function POST(
    request: NextRequest,
    {params}: { params: Promise<{ slug: string }> },
) {
    const {slug} = await params;
    if (!isValidSlug(slug)) {
        return NextResponse.json({error: "Not found"}, {status: 404});
    }

    let body: { visitorId?: unknown; kudos?: unknown };
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({error: "Invalid body"}, {status: 400});
    }

    const {visitorId, kudos} = body;
    if (typeof visitorId !== "string" || !visitorId || typeof kudos !== "boolean") {
        return NextResponse.json({error: "Invalid body"}, {status: 400});
    }

    return NextResponse.json(
        await setKudos(slug, visitorId, kudos),
    );
}
