import { cp, mkdir, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { setTimeout as delay } from "node:timers/promises";

const root = join(fileURLToPath(import.meta.url), "..", "..");
const publicDir = join(root, ".output", "public");
const serverDir = join(root, ".output", "server");
const outDir = join(root, ".github-pages");
const port = 8790;
const basePath = "/chip-power-site";

const routes = [
  ["/", "index.html"],
  ["/oferta", "oferta/index.html"],
  ["/privacy", "privacy/index.html"],
];

async function waitForServer(url, attempts = 60) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const response = await fetch(url, { redirect: "manual" });
      if (response.ok || response.status === 304) return;
    } catch {
      // server still starting
    }
    await delay(500);
  }
  throw new Error(`Timed out waiting for ${url}`);
}

function startWranglerDev() {
  const command = process.platform === "win32" ? "npx wrangler dev --config wrangler.json --port 8790 --local" : "npx";
  const args =
    process.platform === "win32"
      ? []
      : ["wrangler", "dev", "--config", "wrangler.json", "--port", String(port), "--local"];

  const child = spawn(command, args, {
    cwd: serverDir,
    stdio: ["ignore", "pipe", "pipe"],
    env: process.env,
    shell: process.platform === "win32",
  });

  child.stdout?.on("data", (chunk) => process.stdout.write(chunk));
  child.stderr?.on("data", (chunk) => process.stderr.write(chunk));

  return child;
}

async function exportStaticSite() {
  const child = startWranglerDev();

  try {
    await waitForServer(`http://127.0.0.1:${port}/`);

    await mkdir(outDir, { recursive: true });
    await cp(publicDir, outDir, { recursive: true, force: true });

    for (const [route, outputFile] of routes) {
      const response = await fetch(`http://127.0.0.1:${port}${route}`, {
        headers: { accept: "text/html" },
      });

      if (!response.ok) {
        throw new Error(`Failed to prerender ${route}: ${response.status}`);
      }

      let html = await response.text();

      if (!html.includes("CHIP") && !html.includes("чип")) {
        throw new Error(`Unexpected empty HTML for ${route}`);
      }

      if (!html.includes(`${basePath}/assets/`)) {
        html = html
          .replaceAll('href="/assets/', `href="${basePath}/assets/`)
          .replaceAll('src="/assets/', `src="${basePath}/assets/`)
          .replaceAll('href="/brands/', `href="${basePath}/brands/`)
          .replaceAll('src="/brands/', `src="${basePath}/brands/`)
          .replaceAll('href="/favicon.ico', `href="${basePath}/favicon.ico`)
          .replaceAll('href="/oferta', `href="${basePath}/oferta`)
          .replaceAll('href="/privacy', `href="${basePath}/privacy`)
          .replaceAll('href="/"', `href="${basePath}/"`);
      }

      const target = join(outDir, outputFile);
      await mkdir(join(target, ".."), { recursive: true });
      await writeFile(target, html, "utf8");
      console.log(`Exported ${route} -> ${outputFile}`);
    }

    await cp(join(outDir, "index.html"), join(outDir, "404.html"));
    console.log(`GitHub Pages export ready in ${outDir}`);
  } finally {
    child.kill("SIGTERM");
  }
}

await exportStaticSite();
