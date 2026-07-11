import { cp, mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(import.meta.url), "..", "..");
const publicDir = join(root, ".output", "public");
const outDir = join(root, ".github-pages");
const origin = process.env.PAGES_EXPORT_ORIGIN ?? "http://127.0.0.1:8790";
const basePath = "/chip-power-site";

const routes = [
  [`${basePath}/`, "index.html"],
  [`${basePath}/oferta`, "oferta/index.html"],
  [`${basePath}/privacy`, "privacy/index.html"],
];

const TEXT_EXTENSIONS = new Set([".html", ".js", ".css", ".json", ".txt", ".xml"]);

function rewriteForGitHubPages(content) {
  let result = content;

  // Root-absolute paths -> GitHub Pages project prefix (skip already rewritten).
  result = result.replace(/(?<!chip-power-site)\/assets\//g, `${basePath}/assets/`);
  result = result.replace(/(?<!chip-power-site)\/brands\//g, `${basePath}/brands/`);
  result = result.replace(/(?<!chip-power-site)\/favicon\.ico/g, `${basePath}/favicon.ico`);
  result = result.replace(/(?<!chip-power-site)(?<!\/assets)\/oferta/g, `${basePath}/oferta`);
  result = result.replace(/(?<!chip-power-site)(?<!\/assets)\/privacy/g, `${basePath}/privacy`);
  result = result.replace(/href="\/#/g, `href="${basePath}/#`);
  result = result.replace(/href="\/"/g, `href="${basePath}/"`);

  return result;
}

function finalizeMirrorHtml(html) {
  // Keep the document visible while JS hydrates (prevents black/white flash).
  const antiFlash = `<style id="mirror-anti-flash">html,body{background:#09090b;margin:0}</style>`;
  if (html.includes("<head")) {
    return html.replace(/<head([^>]*)>/i, `<head$1>${antiFlash}`);
  }
  return antiFlash + html;
}

function normalizeSsrHtml(html) {
  const nested = html.match(/<body[^>]*>\s*(<!DOCTYPE html>[\s\S]*?)<\/body>\s*<\/html>\s*$/i);
  const doc = nested ? nested[1].trim() : html.trim();
  return finalizeMirrorHtml(doc);
}

async function buildAssetLookup(assetsDir) {
  const files = await readdir(assetsDir);
  const byStem = new Map();

  for (const file of files) {
    const match = file.match(/^(.+?)-[A-Za-z0-9_-]+(\.[a-z0-9]+)$/i);
    if (match) {
      byStem.set(`${match[1]}${match[2]}`, file);
    }
  }

  return byStem;
}

function reconcileAssetReferences(html, byStem) {
  return html.replace(/\/assets\/([A-Za-z0-9_.-]+)/g, (full, filename) => {
    const match = filename.match(/^(.+?)-[A-Za-z0-9_-]+(\.[a-z0-9]+)$/i);
    if (!match) return full;

    const actual = byStem.get(`${match[1]}${match[2]}`);
    return actual ? `/assets/${actual}` : full;
  });
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

async function assertAssetsExist(html, assetsDir) {
  const refs = [
    ...html.matchAll(/\/assets\/([A-Za-z0-9_.-]+\.(?:js|css|jpg|jpeg|png|webp|svg|ico))/g),
  ].map((match) => match[1]);
  const unique = [...new Set(refs)];
  const missing = [];

  for (const ref of unique) {
    try {
      await stat(join(assetsDir, ref));
    } catch {
      missing.push(ref);
    }
  }

  if (missing.length > 0) {
    throw new Error(`HTML references missing assets: ${missing.join(", ")}`);
  }
}

async function fetchRouteHtml(route) {
  let lastError;
  for (let attempt = 1; attempt <= 30; attempt += 1) {
    try {
      const response = await fetch(`${origin}${route}`, {
        headers: { accept: "text/html" },
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const html = normalizeSsrHtml(await response.text());
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
  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });
  await cp(publicDir, outDir, { recursive: true, force: true });
  await rm(join(outDir, "_headers"), { force: true });
  await writeFile(join(outDir, ".nojekyll"), "");
  await rewriteTree(outDir);

  const assetsDir = join(outDir, "assets");
  const assetLookup = await buildAssetLookup(assetsDir);

  for (const [route, outputFile] of routes) {
    const fetched = await fetchRouteHtml(route);
    const html = reconcileAssetReferences(fetched, assetLookup);
    await assertAssetsExist(html, assetsDir);
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
