import type {Heading} from "@/lib/toc";

type TocItem = Heading & {children: Heading[]};

function groupHeadings(headings: Heading[]): TocItem[] {
    const items: TocItem[] = [];

    for (const heading of headings) {
        if (heading.level <= 2 || items.length === 0) {
            items.push({...heading, children: []});
            continue;
        }

        items[items.length - 1].children.push(heading);
    }

    return items;
}

export function TableOfContents({headings}: {headings: Heading[]}) {
    const items = groupHeadings(headings);

    return (
        <nav aria-label="Table of contents">
            <div className="mb-4 flex items-center gap-3">
                <p className="font-display text-[11px] font-extrabold uppercase tracking-[0.16em] text-foreground">
                    On this page
                </p>
                <span aria-hidden className="h-px flex-1 bg-border"/>
            </div>
            <ol className="space-y-1 border-l border-border">
                {items.map((item) => (
                    <li key={item.id}>
                        <a
                            href={`#${item.id}`}
                            className="-ml-px block border-l border-transparent py-1.5 pl-4 text-sm font-medium leading-snug text-foreground transition-colors hover:border-foreground hover:text-foreground"
                        >
                            {item.text}
                        </a>
                        {item.children.length > 0 && (
                            <ol className="ml-4 border-l border-border/80 pb-1">
                                {item.children.map((child) => (
                                    <li key={child.id}>
                                        <a
                                            href={`#${child.id}`}
                                            className="-ml-px block border-l border-transparent py-1 pl-3 text-xs leading-snug text-muted transition-colors hover:border-foreground hover:text-foreground"
                                        >
                                            {child.text}
                                        </a>
                                    </li>
                                ))}
                            </ol>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
