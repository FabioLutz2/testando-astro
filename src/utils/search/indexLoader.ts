export async function loadSearchIndexJSON(url = "/search-index.json") {
  const response = await fetch(url);

  if (!response.ok) throw new Error("Falha ao carregar o índice de busca");

  return await response.json();
}
