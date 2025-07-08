import type { MarkdownHeading } from 'astro';
import type { AstroComponentFactory } from 'astro/runtime/server/index.js';

export type ProcessedDoc = {
  title: string;
  description: string;
  id: string;
  headings: MarkdownHeading[];
  ContentComponent: AstroComponentFactory;
};