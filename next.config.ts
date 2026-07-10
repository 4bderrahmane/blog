import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import { monoCodeTheme } from "./src/lib/code-theme";

const nextConfig: NextConfig = {
  devIndicators: false,
  // Allow .mdx files to be treated as pages/imports.
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  // Dev only: let the apex + blog subdomain reach the dev server's HMR/RSC
  // endpoints when testing the proxy via /etc/hosts. Without this, Next blocks
  // those cross-origin requests, so client components (e.g. the canvas mark)
  // never hydrate. No effect in production.
  allowedDevOrigins: [
    "4bderrahmane.com",
    "blog.4bderrahmane.com",
    "192.168.0.187", // LAN IP for testing on phone / other devices
  ],
};

const withMDX = createMDX({
  // Turbopack requires plugins to be referenced by name (string form),
  // since JS functions can't be passed to the Rust compiler. Options must be
  // JSON-serializable for the same reason, which is why the Shiki theme is a
  // plain object.
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [
      [
        "rehype-pretty-code",
        {
          theme: monoCodeTheme,
          // Let our own .prose pre box supply the background instead of
          // baking Shiki's editor background into inline styles.
          keepBackground: false,
          // Fenced blocks with no language (the ASCII diagrams) render as
          // plain text and get no language label.
          defaultLang: "plaintext",
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
