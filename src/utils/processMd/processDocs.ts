import { getCollection, render } from "astro:content";

import type { ProcessedDoc } from "./docTypes";

export async function getProcessedDoc(doc: any): Promise<ProcessedDoc> {
  const { Content, headings } = await render(doc);
  return {
    ...doc.data,
    id: doc.id,
    headings,
    ContentComponent: Content,
  };
}

export async function getAllProcessedDocs(): Promise<ProcessedDoc[]> {
  const allDocs = await getCollection("docs");

  const processedDocs = await Promise.all(
    allDocs.map(async (doc) => getProcessedDoc(doc)),
  );

  return processedDocs;
}
