// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import markdoc from "@astrojs/markdoc";
import mdx from "@astrojs/mdx";

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  root: process.cwd(),
  srcDir: "./src",
  publicDir: "./public",
  outDir: "./dist",
  cacheDir: "./node_modules/.astro",

  site: undefined,
  base: "/",
  trailingSlash: "ignore",

  output: "static",
  adapter: undefined,

  integrations: [markdoc(), mdx(), preact()],

  markdown: {
    syntaxHighlight: "shiki",
    remarkPlugins: [],
    rehypePlugins: [],
    remarkRehype: {},
  },

  server: {
    host: process.env.HOST || "localhost",
    port: Number(process.env.PORT) || 4321,
  },

  build: {
    format: "directory",
    assets: "_astro",
  },

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        react: "preact/compat",
        "react-dom": "preact/compat",
        "react/jsx-runtime": "preact/jsx-runtime",
        "react/jsx-dev-runtime": "preact/jsx-dev-runtime",
      },
    },
  },

  devToolbar: {
    enabled: true,
  },
});
