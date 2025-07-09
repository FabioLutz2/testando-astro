import MiniSearch from "minisearch";

let searchInstance: MiniSearch | null = null;

const miniSearchConfig = {
  fields: ["title", "content", "description", "headings"],
  storeFields: ["id", "title", "description", "headings"],
};

export async function initSearch(documents: any[]) {
  if (searchInstance) return searchInstance;

  const miniSearch = new MiniSearch(miniSearchConfig);
  miniSearch.addAll(documents);

  searchInstance = miniSearch;
  return searchInstance;
}

export function performSearch(query: string) {
  if (!searchInstance || query.length < 2) return [];

  return searchInstance.search(query, {
    prefix: true,
    fuzzy: 0.2,
  });
}

export function clearSearch() {
  searchInstance = null;
}
