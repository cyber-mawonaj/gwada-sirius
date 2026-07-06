import fs from "node:fs";
import path from "node:path";
import EleventyVitePlugin from "@11ty/eleventy-plugin-vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import * as m from "./src/paraglide/messages.js";
import { locales, baseLocale } from "./src/paraglide/runtime.js";

const OUTPUT_DIR = "_site";

// Vite's build wipes the output dir (emptyOutDir) after 11ty has already
// copied passthrough assets into it — re-copy them once Vite is done.
// https://github.com/11ty/eleventy-plugin-vite/issues/42
function restorePassthroughCopy(copies) {
  return {
    name: "restore-passthrough-copy",
    apply: "build",
    closeBundle() {
      for (const [from, to] of copies) {
        if (!fs.existsSync(from)) continue;
        fs.cpSync(from, path.join(OUTPUT_DIR, to), {
          recursive: true,
          force: true,
        });
      }
    },
  };
}

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyVitePlugin, {
    viteOptions: {
      appType: "mpa",
      plugins: [
        svelte(),
        restorePassthroughCopy([
          ["src/assets", "assets"],
          ["public", "."],
        ]),
      ],
      resolve: {
        alias: {
          "/src": path.resolve(".", "src"),
        },
      },
      build: {
        emptyOutDir: false,
      },
    },
  });

  eleventyConfig.ignores.add("src/paraglide/**");
  eleventyConfig.ignores.add("src/islands/**");

  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy({ public: "." });

  // Trilingual message lookup for Nunjucks templates: {{ "hero_title1" | t(locale) }}
  eleventyConfig.addFilter("t", (key, locale, params = {}) => {
    const fn = m[key];
    if (!fn) return key;
    return fn(params, { locale });
  });

  eleventyConfig.addGlobalData("locales", locales);
  eleventyConfig.addGlobalData("baseLocale", baseLocale);
  eleventyConfig.addGlobalData("currentYear", () => new Date().getFullYear());

  eleventyConfig.addFilter("localeHref", (pagePath, locale) => {
    const clean = pagePath.replace(/^\/+/, "");
    return locale === baseLocale ? `/${clean}` : `/${locale}/${clean}`;
  });

  eleventyConfig.addFilter("dump", (value) => JSON.stringify(value).replace(/</g, "\\u003c"));

  eleventyConfig.addFilter("formatDate", (isoDate, locale, options = {}) => {
    // new Date("YYYY-MM-DD") parses as UTC midnight, which can roll back a
    // day once formatted in a timezone behind UTC (e.g. Guadeloupe, UTC-4).
    // Build the date from its local components instead.
    const [year, month, day] = isoDate.split("-").map(Number);
    return new Date(year, month - 1, day).toLocaleDateString(
      locale === "ht" ? "fr" : locale,
      { day: "numeric", month: "long", year: "numeric", ...options }
    );
  });

  return {
    dir: {
      input: "src",
      output: OUTPUT_DIR,
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "md"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
