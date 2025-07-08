// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import mdx from "@astrojs/mdx";

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

  integrations: [react(), markdoc(), mdx()],

  markdown: {
    syntaxHighlight: "shiki",
    remarkPlugins: [],
    rehypePlugins: [],
    remarkRehype: {},
  },

  server: {
    host: false,
    port: 4321,
  },

  build: {
    format: "directory",
    assets: "_astro",
  },

  vite: {
    plugins: [tailwindcss()],
  },

  devToolbar: {
    enabled: true,
  },
});