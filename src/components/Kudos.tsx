"use client";

import {useCallback, useEffect, useState} from "react";
import {ThumbsUp} from "lucide-react";

// A random id. crypto.randomUUID() only exists in a secure context (https or
// localhost), so over plain http on a LAN it's undefined — fall back to
// getRandomValues (works anywhere), then to Math.random as a last resort. The
// server only stores it as an opaque string, so the exact format doesn't matter.
function randomId(): string {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
        return crypto.randomUUID();
    }
    if (typeof crypto !== "undefined" && crypto.getRandomValues) {
        const bytes = crypto.getRandomValues(new Uint8Array(16));
        return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
    }
    return `${Date.now().toString(16)}-${Math.random().toString(16).slice(2)}`;
}

// Stable anonymous id per browser, used to dedupe one-per-visitor kudos.
function getVisitorId(): string {
    const KEY = "kudos-visitor-id";
    let id = localStorage.getItem(KEY);
    if (!id) {
        id = randomId();
        localStorage.setItem(KEY, id);
    }
    return id;
}

// The kudos route lives at /blog/api/kudos. Always hit that real path: it
// resolves directly on the subdomain, the apex, and in dev — and it stays
// outside the proxy's "/api" matcher exclusion.
function apiPath(slug: string): string {
    return `/blog/api/kudos/${slug}`;
}

function countLabel(count: number): string {
    if (count === 0) return "Be the first to give kudos";
    return `${count} Kudos`;
}

export function Kudos({slug}: { slug: string }) {
    const [count, setCount] = useState<number | null>(null);
    const [kudos, setKudos] = useState(false);
    const [pending, setPending] = useState(false);

    useEffect(() => {
        const visitorId = getVisitorId();
        fetch(`${apiPath(slug)}?visitorId=${visitorId}`)
            .then((r) => r.json())
            .then((d) => {
                setCount(typeof d.count === "number" ? d.count : 0);
                setKudos(Boolean(d.kudos));
            })
            .catch(() => setCount(0));
    }, [slug]);

    const toggle = useCallback(async () => {
        if (pending || count === null) return;
        const next = !kudos;

        // Optimistic update; revert if the request fails.
        setKudos(next);
        setCount((c) => (c ?? 0) + (next ? 1 : -1));
        setPending(true);

        try {
            const res = await fetch(apiPath(slug), {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({visitorId: getVisitorId(), kudos: next}),
            });
            if (!res.ok) throw new Error("request failed");
            const d = await res.json();
            if (typeof d.count === "number") setCount(d.count);
            if (typeof d.kudos === "boolean") setKudos(d.kudos);
        } catch {
            setKudos(!next);
            setCount((c) => (c ?? 0) + (next ? -1 : 1));
        } finally {
            setPending(false);
        }
    }, [count, kudos, pending, slug]);

    const liked = count !== null && kudos;

    return (
        <div className="not-prose mt-16 flex items-center gap-3 border-t border-border pt-10">
            <button
                type="button"
                onClick={toggle}
                disabled={pending || count === null}
                aria-pressed={liked}
                aria-label={liked ? "Remove like" : "Like this post"}
                className={`inline-flex transition-colors disabled:opacity-60 ${
                    liked ? "text-black" : "text-muted hover:text-foreground"
                }`}
            >
                <ThumbsUp
                    className="h-7 w-7"
                    fill={liked ? "currentColor" : "none"}
                />
            </button>
            <span className="text-sm text-muted">
                {count !== null ? countLabel(count) : "…"}
            </span>
        </div>
    );
}
