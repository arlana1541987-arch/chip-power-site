import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const root = join(fileURLToPath(import.meta.url), "..", "..");

process.env.GITHUB_PAGES = "true";

const build = spawnSync(process.execPath, ["./node_modules/vite/bin/vite.js", "build"], {
  cwd: root,
  stdio: "inherit",
  env: process.env,
  shell: false,
});

if (build.status !== 0) {
  process.exit(build.status ?? 1);
}

await import("./export-github-pages.mjs");
