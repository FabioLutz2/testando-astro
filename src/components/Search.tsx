import { useState, useEffect } from "preact/hooks";
import { loadSearchIndexJSON } from "@utils/search/indexLoader";
import { initSearch, performSearch } from "@utils/search/searchEngine";

export default function SearchClient() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    loadSearchIndexJSON()
      .then((docs) => initSearch(docs))
      .catch(console.error);
  }, []);

  useEffect(() => {
    setResults(query.length < 2 ? [] : performSearch(query));
  }, [query]);

  return (
    <div>
      <input
        type="search"
        placeholder="Buscar…"
        value={query}
        onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
      />
      <ul>
        {results.length > 0 ? (
          results.map((r) => (
            <li key={r.id}>
              <a href={`/docs${r.id}`}>{r.title}</a>
            </li>
          ))
        ) : (
          <li>Nenhum resultado</li>
        )}
      </ul>
    </div>
  );
}
