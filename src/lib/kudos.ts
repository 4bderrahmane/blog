import {getSql} from "@/lib/db";

// Anonymous, one-per-visitor kudos. Each post keeps a SET of visitor ids: the
// count is the set's cardinality and a toggle is just add / remove.
//
// In production this is backed by Postgres. When DATABASE_URL is absent (e.g.
// local dev with no credentials) we fall back to an in-memory store so the
// feature still works locally. The fallback resets on server restart and is not
// shared across instances.

// In-memory fallback (dev only). Persists for the life of the dev process.
const memory = new Map<string, Set<string>>();
const memSet = (slug: string): Set<string> => {
    let set = memory.get(slug);
    if (!set) {
        set = new Set();
        memory.set(slug, set);
    }
    return set;
};

export type KudosState = { count: number; kudos: boolean };

let schemaReady: Promise<void> | null = null;

async function ensureKudosSchema(): Promise<void> {
    const sql = getSql();
    if (!sql) return;

    schemaReady ??= (async () => {
        await sql`
            create table if not exists post_kudos (
                slug text not null,
                visitor_id text not null,
                created_at timestamptz not null default now(),
                updated_at timestamptz not null default now(),
                primary key (slug, visitor_id)
            )
        `;
        await sql`
            alter table post_kudos
            drop column if exists ip,
            drop column if exists user_agent,
            drop column if exists accept_language,
            drop column if exists country,
            drop column if exists region,
            drop column if exists city
        `;
        await sql`
            alter table post_kudos
            add column if not exists updated_at timestamptz not null default now()
        `;
        await sql`
            create index if not exists post_kudos_slug_idx
            on post_kudos (slug)
        `;
    })();

    await schemaReady;
}

export async function getKudos(
    slug: string,
    visitorId?: string,
): Promise<KudosState> {
    const sql = getSql();

    if (!sql) {
        const set = memSet(slug);
        return {count: set.size, kudos: visitorId ? set.has(visitorId) : false};
    }

    await ensureKudosSchema();

    const [row] = await sql<{ count: number; kudos: boolean }[]>`
        select
            count(*)::int as count,
            ${Boolean(visitorId)}::boolean
                and exists (
                    select 1
                    from post_kudos
                    where slug = ${slug}
                      and visitor_id = ${visitorId ?? ""}
                ) as kudos
        from post_kudos
        where slug = ${slug}
    `;

    return row ?? {count: 0, kudos: false};
}

export async function setKudos(
    slug: string,
    visitorId: string,
    kudos: boolean,
): Promise<KudosState> {
    const sql = getSql();

    if (!sql) {
        const set = memSet(slug);
        if (kudos) set.add(visitorId);
        else set.delete(visitorId);
        return {count: set.size, kudos};
    }

    await ensureKudosSchema();

    return await sql.begin(async (tx) => {
        if (kudos) {
            await tx`
                insert into post_kudos (
                    slug,
                    visitor_id
                ) values (
                    ${slug},
                    ${visitorId}
                )
                on conflict (slug, visitor_id) do update set
                    updated_at = now()
            `;
        } else {
            await tx`
                delete from post_kudos
                where slug = ${slug}
                  and visitor_id = ${visitorId}
            `;
        }

        const [row] = await tx<{ count: number; kudos: boolean }[]>`
            select
                count(*)::int as count,
                exists (
                    select 1
                    from post_kudos
                    where slug = ${slug}
                      and visitor_id = ${visitorId}
                ) as kudos
            from post_kudos
            where slug = ${slug}
        `;

        return row ?? {count: 0, kudos: false};
    });
}
