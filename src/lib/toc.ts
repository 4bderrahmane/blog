export type Heading = { id: string; text: string; level: number };

export function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .trim();
}

export function extractHeadings(source: string): Heading[] {
    // Strip fenced code blocks so headings inside them don't get picked up.
    const stripped = source.replace(/```[\s\S]*?```/g, "");
    const headings: Heading[] = [];

    for (const [, hashes, raw] of stripped.matchAll(/^(#{2,3})\s+(.+)$/gm)) {
        // Strip inline code markers to match what MDX renders as text content.
        const text = raw.replace(/`([^`]+)`/g, "$1").trim();
        headings.push({ id: slugify(text), text, level: hashes.length });
    }

    return headings;
}
