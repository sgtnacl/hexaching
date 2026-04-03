import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const base = process.env.GITHUB_ACTIONS === "true" ? "/hexaching" : "";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HexaChing",
    short_name: "HexaChing",
    description: "Calculate present and future I Ching hexagrams from a six-line cast.",
    start_url: `${base}/`,
    scope: `${base}/`,
    display: "standalone",
    background_color: "#0d1117",
    theme_color: "#0d1117",
    icons: [
      {
        src: `${base}/icon.svg`,
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: `${base}/icon.svg`,
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
