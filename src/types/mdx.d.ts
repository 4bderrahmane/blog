// Augments the `*.mdx` module type from @types/mdx so the `metadata` export
// each post defines is typed. Ambient module declarations of the same name
// merge, so this adds `metadata` on top of the default (component) export.
declare module "*.mdx" {
    import type {PostMeta} from "@/lib/blog";
    export const metadata: PostMeta;
}
