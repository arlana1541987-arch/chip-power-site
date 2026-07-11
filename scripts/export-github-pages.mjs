import { cp, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(import.meta.url), "..", "..");
const publicDir = join(root, ".output", "public");
const outDir = join(root, ".github-pages");
const origin =
  process.env.PAGES_EXPORT_ORIGIN ??
  "https://arlana1541987-arch-chip-power-site.chip-power.workers.dev";
const basePath = "/chip-power-site";

const routes = [
  ["/", "index.html"],
  ["/oferta", "oferta/index.html"],
  ["/privacy", "privacy/index.html"],
];

const TEXT_EXTENSIONS = new Set([".html", ".js", ".css", ".json", ".txt", ".xml"]);

function rewriteForGitHubPages(content) {
  let result = content;

  // Root-absolute paths -> GitHub Pages project prefix (skip already rewritten).
  result = result.replace(/(?<!chip-power-site)\/assets\//g, `${basePath}/assets/`);
  result = result.replace(/(?<!chip-power-site)\/brands\//g, `${basePath}/brands/`);
  result = result.replace(/(?<!chip-power-site)\/favicon\.ico/g, `${basePath}/favicon.ico`);
  result = result.replace(/(?<!chip-power-site)\/oferta/g, `${basePath}/oferta`);
  result = result.replace(/(?<!chip-power-site)\/privacy/g, `${basePath}/privacy`);
  result = result.replace(/href="\/#/g, `href="${basePath}/#`);
  result = result.replace(/href="\/"/g, `href="${basePath}/"`);

  return result;
}

async function rewriteTree(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }

  for (const entry of entries) {
    const filePath = join(dir, entry.name);
    if (entry.isDirectory()) {
      await rewriteTree(filePath);
      continue;
    }

    const ext = entry.name.slice(entry.name.lastIndexOf("."));
    if (!TEXT_EXTENSIONS.has(ext)) continue;

    const original = await readFile(filePath, "utf8");
    const rewritten = rewriteForGitHubPages(original);
    if (rewritten !== original) {
      await writeFile(filePath, rewritten, "utf8");
    }
  }
}

async function fetchRouteHtml(route) {
  let lastError;
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    try {
      const response = await fetch(`${origin}${route}`, {
        headers: { accept: "text/html" },
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const html = await response.text();
      if (html.length < 1000) {
        throw new Error(`Unexpected short HTML (${html.length} bytes)`);
      }
      return html;
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
    }
  }
  throw new Error(`Failed to export ${route} from ${origin}: ${lastError}`);
}

async function exportStaticSite() {
  await mkdir(outDir, { recursive: true });
  await cp(publicDir, outDir, { recursive: true, force: true });
  await rewriteTree(outDir);

  for (const [route, outputFile] of routes) {
    const html = await fetchRouteHtml(route);
    const target = join(outDir, outputFile);
    await mkdir(join(target, ".."), { recursive: true });
    await writeFile(target, rewriteForGitHubPages(html), "utf8");
    console.log(`Exported ${route} -> ${outputFile}`);
  }

  await rewriteTree(outDir);
  await cp(join(outDir, "index.html"), join(outDir, "404.html"));
  console.log(`GitHub Pages export ready in ${outDir}`);
}

await exportStaticSite();
