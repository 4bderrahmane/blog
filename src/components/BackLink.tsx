// Slim "return" link. Plain <a> since targets may be cross-origin in production
// (the blog subdomain vs. the apex site).
export function BackLink({
                             href,
                             children,
                             className = "",
                         }: Readonly<{
    href: string;
    children: React.ReactNode;
    className?: string;
}>) {
    return (
        <a
            href={href}
            className={`back-link inline-flex items-center gap-1 text-sm text-muted no-underline transition-colors hover:text-foreground hover:no-underline ${className}`}
        >
            <span aria-hidden>←</span> {children}
        </a>
    );
}
