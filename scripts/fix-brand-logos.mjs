import { mkdir, writeFile, readFile, readdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "brands");
const CDN = "https://cdn.jsdelivr.net/gh/filippofilip95/car-logos-dataset@master/logos/optimized";
const UA = "ChipPowerSite/1.0 (logo-fix; github.com/arlana1541987-arch/chip-power-site)";

/** Verified sources — never substitute another brand's logo. */
const manualSources = {
  gac: "https://upload.wikimedia.org/wikipedia/commons/d/dc/%D7%9C%D7%95%D7%92%D7%95_%D7%A9%D7%9C_%D7%A7%D7%91%D7%95%D7%A6%D7%AA_GAC.png",
  forthing:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Forthing_badge.jpg/500px-Forthing_badge.jpg",
  jaecoo:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Jaecoo_wordmark.svg/960px-Jaecoo_wordmark.svg.png",
  kaiyi:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Kaiyi_logo.png/960px-Kaiyi_logo.png",
  tenet: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Tenet_Logo.png",
  tank: "https://commons.wikimedia.org/wiki/Special:FilePath/Tank_(Great_Wall_Motor_brand)_logo,_global_market.svg?width=512",
  moskvich: "https://commons.wikimedia.org/wiki/Special:FilePath/Logo_of_Moskvich.svg?width=640",
  livan: "https://commons.wikimedia.org/wiki/Special:FilePath/Livan_Automotive_logo.svg?width=512",
  swm: "https://upload.wikimedia.org/wikipedia/commons/b/bb/SWM_logo.png",
  cheryexeed: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Exeed_logo.png",
  exeed: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Exeed_logo.png",
};

const cdnRefresh = [
  "gaz",
  "omoda",
  "jetour",
  "hongqi",
  "chery",
  "geely",
  "great-wall",
  "lada",
  "uaz",
  "lifan",
  "dongfeng",
  "changan",
];

function md5(buf) {
  return createHash("md5").update(buf).digest("hex");
}

function isPng(buf) {
  return (
    buf.length >= 8 &&
    buf[0] === 0x89 &&
    buf[1] === 0x50 &&
    buf[2] === 0x4e &&
    buf[3] === 0x47
  );
}

function isJpeg(buf) {
  return buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
}

function isValidImage(buf) {
  return (isPng(buf) || isJpeg(buf)) && buf.length >= 500;
}

async function fetchBuffer(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": UA },
    redirect: "follow",
  });
  if (!res.ok) return null;
  const buf = Buffer.from(await res.arrayBuffer());
  if (!isValidImage(buf)) return null;
  return buf;
}

async function downloadOne(name, url) {
  const dest = path.join(outDir, `${name}.png`);
  const buf = await fetchBuffer(url);
  if (!buf) {
    console.warn(`FAIL ${name}.png <- ${url}`);
    return false;
  }
  await writeFile(dest, buf);
  console.log(`ok   ${name}.png (${buf.length} bytes)`);
  return true;
}

async function sleep(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

await mkdir(outDir, { recursive: true });

console.log("=== CDN refresh ===");
for (const name of cdnRefresh) {
  await downloadOne(name, `${CDN}/${name}.png`);
  await sleep(2000);
}

console.log("\n=== Manual sources ===");
for (const [name, url] of Object.entries(manualSources)) {
  await downloadOne(name, url);
  await sleep(2500);
}

console.log("\n=== Duplicate check ===");
const files = await readdir(outDir);
const hashes = new Map();
for (const file of files.filter((f) => f.endsWith(".png"))) {
  const buf = await readFile(path.join(outDir, file));
  const h = md5(buf);
  if (!hashes.has(h)) hashes.set(h, []);
  hashes.get(h).push(file);
}

const dups = [...hashes.entries()].filter(([, list]) => list.length > 1);
const allowedDupes = new Set(["cheryexeed.png, exeed.png", "exeed.png, cheryexeed.png"]);
if (dups.length === 0) {
  console.log("No duplicate PNG logos.");
} else {
  let unexpected = 0;
  for (const [, list] of dups) {
    const key = list.join(", ");
    if (allowedDupes.has(key)) {
      console.log("ALLOWED DUPLICATE:", key);
      continue;
    }
    console.warn("DUPLICATE:", key);
    unexpected++;
  }
  if (unexpected > 0) process.exitCode = 1;
}
