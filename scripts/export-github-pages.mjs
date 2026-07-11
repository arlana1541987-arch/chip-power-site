import { cp, mkdir, writeFile } from "node:fs/promises";
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

function rewriteForGitHubPages(html) {
  return html
    .replaceAll('href="/assets/', `href="${basePath}/assets/`)
    .replaceAll('src="/assets/', `src="${basePath}/assets/`)
    .replaceAll('href="/brands/', `href="${basePath}/brands/`)
    .replaceAll('src="/brands/', `src="${basePath}/brands/`)
    .replaceAll('href="/favicon.ico', `href="${basePath}/favicon.ico`)
    .replaceAll('href="/oferta', `href="${basePath}/oferta`)
    .replaceAll('href="/privacy', `href="${basePath}/privacy`)
    .replaceAll('href="/"', `href="${basePath}/"`);
}

async function exportStaticSite() {
  await mkdir(outDir, { recursive: true });
  await cp(publicDir, outDir, { recursive: true, force: true });

  for (const [route, outputFile] of routes) {
    const response = await fetch(`${origin}${route}`, {
      headers: { accept: "text/html" },
    });

    if (!response.ok) {
      throw new Error(`Failed to export ${route} from ${origin}: ${response.status}`);
    }

    const html = await response.text();
    if (html.length < 1000) {
      throw new Error(`Unexpected short HTML for ${route} (${html.length} bytes)`);
    }

    const target = join(outDir, outputFile);
    await mkdir(join(target, ".."), { recursive: true });
    await writeFile(target, rewriteForGitHubPages(html), "utf8");
    console.log(`Exported ${route} -> ${outputFile}`);
  }

  await cp(join(outDir, "index.html"), join(outDir, "404.html"));
  console.log(`GitHub Pages export ready in ${outDir}`);
}

await exportStaticSite();
