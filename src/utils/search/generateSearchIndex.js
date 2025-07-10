import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import removeMd from "remove-markdown";

const contentDir = path.resolve("src/content");
const outputFile = path.resolve("public/search-index.json");

export async function generateIndex() {
  const files = await getMarkdownFiles(contentDir);
  const index = [];

  for (let file of files) {
    const raw = await fs.readFile(file, "utf-8");
    const { data, content } = matter(raw);

    validateMarkdown(content, file);

    const id = normalizeId(file, contentDir);
    const contentClean = removeMd(content).trim();
    const headings = extractHeadings(content);
    const slicedContent = contentClean.slice(0, 500);

    index.push({
      id,
      title: data.title,
      description: data.description || "",
      headings,
      content: slicedContent,
    });
  }

  await fs.writeFile(outputFile, JSON.stringify(index, null, 2));
  console.log(`Índice de busca gerado com ${index.length} entradas.`);
}

async function getMarkdownFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  let files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files = [...files, ...(await getMarkdownFiles(fullPath))];
    } else if (entry.name.endsWith(".md")) {
      files.push(fullPath);
    }
  }

  return files;
}

function normalizeId(filePath, contentDir) {
  const relative = path.posix
    .normalize(filePath.replace(contentDir, ""))
    .replace(/\s/g, "-");

  return relative.replace(/\.md$/, "").replace(/\/index$/, "/");
}

function extractHeadings(content) {
  const matches = [...content.matchAll(/^#{2,3}\s+(.*)$/gm)];
  return matches.map((m) => m[1]);
}

function validateMarkdown(content, filePath) {
  const h1Matches = content.match(/^#\s.+/gm);
  if (h1Matches) {
    throw new Error(
      `Foi usado H1 em "${filePath}". Ele deve ser reservado apenas ao título da página.`,
    );
  }
}

(async () => {
  try {
    await generateIndex();
  } catch (error) {
    console.error("Erro ao gerar índice:", error);
    process.exit(1);
  }
})();
