import fs from "fs";
import path from "path";
import matter from "gray-matter";
import removeMd from "remove-markdown";

const contentDir = path.resolve("src/content");
const outputFile = path.resolve("public/search-index.json");

function generateIndex() {
  const files = getMarkdownFiles(contentDir);
  const index = [];

  for (let file of files) {
    const raw = fs.readFileSync(file, "utf-8");
    const { data, content } = matter(raw);
    
    validateMarkdown(content, file)

    const id = normalizeId(file, contentDir);
    const contentClean = removeMd(content).trim();
    const headings = extractHeadings(content);
    
    const slicedContent = contentClean.slice(0, 500)

    index.push({
      id: id,
      title: data.title,
      description: data.description || extractFirstParagraph(slicedContent),
      headings: headings,
      content: slicedContent,
    });
  }

  fs.writeFileSync(outputFile, JSON.stringify(index, null, 2));
  console.log(`Índice de busca gerado com ${index.length} entradas.`);
}

function getMarkdownFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];

  for (let entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      files = files.concat(getMarkdownFiles(fullPath));
      
    } else if (entry.name.endsWith(".md")) {
      files.push(fullPath);
    }
  }

  return files;
}

function normalizeId(filePath, contentDir) {
  const relative = filePath.replace(contentDir, "").replace(/\\/g, "/");
  const cleaned = relative.replace(/\.md$/, "");

  return cleaned.endsWith("/index")
    ? cleaned.replace(/\/index$/, "/")
    : cleaned;
}

function extractFirstParagraph(content) {
  const paragraphs = content.split(/\n\s*\n/);
  
  return paragraphs[0] || "";
}

function extractHeadings(content) {
  const matches = [...content.matchAll(/^#{2,3}\s+(.*)$/gm)];
  return matches.map(m => m[1]);
}

function validateMarkdown(content, filePath) {
  const h1Matches = content.match(/^#\s.+/gm);
  if (h1Matches) {
    throw new Error(
      `Foi usado H1 em "${filePath}". Ele deve ser reservado apenas ao título da página.`
    );
  }
}

generateIndex();
