export async function loadSearchIndexJSON(url = "/search-index.json") {
  const res = await fetch(url);
  
  if (!res.ok) throw new Error("Falha ao carregar o índice de busca");
  
  return await res.json();
}
