// Monochrome Shiki theme for code blocks.
//
// The whole site is pure black & white, so this theme carries all of its
// hierarchy through gray level and font weight alone — no hue. Keywords go
// bold near-black, types bold dark-gray, comments dim + italic, strings and
// punctuation mid-gray. It is a plain JSON object on purpose: next.config
// serializes it across to the Rust (Turbopack) MDX compiler, so it must stay
// free of functions.

export const monoCodeTheme = {
  name: "mono-bw",
  type: "light" as const,
  colors: {
    "editor.background": "#ffffff",
    "editor.foreground": "#1f2937",
  },
  // VS Code theme key (`tokenColors`); rehype-pretty-code only treats the theme
  // as a custom JSON theme when this property is present.
  tokenColors: [
    { settings: { foreground: "#1f2937" } }, // default text
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: "#9ca3af", fontStyle: "italic" },
    },
    {
      scope: [
        "keyword",
        "keyword.control",
        "storage",
        "storage.type",
        "storage.modifier",
      ],
      settings: { foreground: "#0a0a0a", fontStyle: "bold" },
    },
    {
      scope: [
        "entity.name.type",
        "entity.name.class",
        "support.type",
        "support.class",
      ],
      settings: { foreground: "#111827", fontStyle: "bold" },
    },
    {
      scope: ["entity.name.function", "support.function", "meta.function-call"],
      settings: { foreground: "#111827" },
    },
    {
      scope: ["string", "string.quoted", "punctuation.definition.string"],
      settings: { foreground: "#6b7280" },
    },
    {
      scope: ["constant.numeric", "constant.language", "constant.character"],
      settings: { foreground: "#4b5563" },
    },
    {
      scope: ["variable", "variable.other", "variable.parameter"],
      settings: { foreground: "#1f2937" },
    },
    {
      scope: ["punctuation", "meta.brace", "keyword.operator"],
      settings: { foreground: "#6b7280" },
    },
  ],
};
