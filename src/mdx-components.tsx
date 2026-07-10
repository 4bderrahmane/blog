import type {MDXComponents} from "mdx/types";
import type {ReactNode} from "react";
import Link from "next/link";
import {slugify} from "@/lib/toc";

function childrenToText(node: ReactNode): string {
    if (node == null || typeof node === "boolean") return "";
    if (typeof node === "string" || typeof node === "number") return String(node);
    if (Array.isArray(node)) return node.map(childrenToText).join("");
    if (typeof node === "object" && "props" in node) {
        return childrenToText((node as {props: {children?: ReactNode}}).props.children);
    }
    return "";
}

function headingId(children: ReactNode): string {
    return slugify(childrenToText(children));
}

// This file is REQUIRED by @next/mdx with the App Router.
// It lets you map MDX/markdown elements to custom React components.
const components: MDXComponents = {
    a: ({href = "", ...props}) => {
        const isInternal = href.startsWith("/") || href.startsWith("#");
        if (isInternal) {
            return <Link href={href} {...props} />;
        }
        return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
    },
    h2: ({children, ...props}) => (
        <h2 id={headingId(children)} {...props}>{children}</h2>
    ),
    h3: ({children, ...props}) => (
        <h3 id={headingId(children)} {...props}>{children}</h3>
    ),
};

export function useMDXComponents(): MDXComponents {
    return components;
}
