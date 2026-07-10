import postgres from "postgres";

const databaseUrl =
    process.env.DATABASE_URL ??
    process.env.POSTGRES_URL ??
    process.env.POSTGRES_PRISMA_URL ??
    process.env.POSTGRES_URL_NON_POOLING;

let client: ReturnType<typeof postgres> | null = null;

export function databaseConfigured(): boolean {
    return Boolean(databaseUrl);
}

export function getSql(): ReturnType<typeof postgres> | null {
    if (!databaseUrl) return null;

    client ??= postgres(databaseUrl, {
        ssl: process.env.DATABASE_SSL === "false" ? false : "require",
        max: 1,
        idle_timeout: 20,
        connect_timeout: 10,
        prepare: false,
    });

    return client;
}
