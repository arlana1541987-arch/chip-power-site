import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "brands");
const CDN = "https://cdn.jsdelivr.net/gh/filippofilip95/car-logos-dataset@master/logos/optimized";
const UA = "ChipPowerSite/1.0 (logo-download; github.com/arlana1541987-arch/chip-power-site)";
const force = process.argv.includes("--force");

/** slug -> dataset filename (without .png) */
const files = {
  acura: "acura",
  "alfa-romeo": "alfa-romeo",
  audi: "audi",
  baic: "baic",
  bmw: "bmw",
  bentley: "bentley",
  cadillac: "cadillac",
  changan: "changan",
  chery: "chery",
  cheryexeed: "exeed",
  chevrolet: "chevrolet",
  chrysler: "chrysler",
  citroen: "citroen",
  dodge: "dodge",
  dongfeng: "dongfeng",
  exeed: "exeed",
  faw: "faw",
  ferrari: "ferrari",
  fiat: "fiat",
  ford: "ford",
  forthing: "forthing",
  gac: "gac",
  gmc: "gmc",
  gaz: "gaz",
  geely: "geely",
  genesis: "genesis",
  "great-wall": "great-wall",
  haval: "haval",
  honda: "honda",
  hongqi: "hongqi",
  hummer: "hummer",
  hyundai: "hyundai",
  infiniti: "infiniti",
  isuzu: "isuzu",
  iveco: "iveco",
  jac: "jac",
  jaecoo: "jaecoo",
  jaguar: "jaguar",
  jeep: "jeep",
  jetour: "jetour",
  kaiyi: "kaiyi",
  kia: "kia",
  lamborghini: "lamborghini",
  "land-rover": "land-rover",
  lexus: "lexus",
  lifan: "lifan",
  lincoln: "lincoln",
  livan: "livan",
  maserati: "maserati",
  mazda: "mazda",
  "mercedes-benz": "mercedes-benz",
  mini: "mini",
  mitsubishi: "mitsubishi",
  moskvich: "moskvich",
  nissan: "nissan",
  omoda: "omoda",
  opel: "opel",
  peugeot: "peugeot",
  porsche: "porsche",
  renault: "renault",
  swm: "swm",
  saab: "saab",
  seat: "seat",
  skoda: "skoda",
  smart: "smart",
  soueast: "soueast",
  ssangyong: "ssangyong",
  subaru: "subaru",
  suzuki: "suzuki",
  tank: "tank",
  tenet: "tenet",
  toyota: "toyota",
  volkswagen: "volkswagen",
  volvo: "volvo",
  zotye: "zotye",
  lada: "lada",
  uaz: "uaz",
};

/** Out filename -> manual URL when CDN has no logo. Never use another brand as fallback. */
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

function isValidImage(buf) {
  const png =
    buf.length >= 8 &&
    buf[0] === 0x89 &&
    buf[1] === 0x50 &&
    buf[2] === 0x4e &&
    buf[3] === 0x47;
  const jpeg = buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8;
  return (png || jpeg) && buf.length >= 500;
}

async function fetchBuffer(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": UA },
    redirect: "follow",
  });
  if (!res.ok) return null;
  const buf = Buffer.from(await res.arrayBuffer());
  return isValidImage(buf) ? buf : null;
}

async function downloadOne(outName, cdnName) {
  const dest = path.join(outDir, `${outName}.png`);
  if (existsSync(dest) && !force) {
    console.log(`skip ${outName}.png`);
    return;
  }

  const manual = manualSources[outName];
  if (manual) {
    const buf = await fetchBuffer(manual);
    if (buf) {
      await writeFile(dest, buf);
      console.log(`ok   ${outName}.png <- manual`);
      return;
    }
  }

  const buf = await fetchBuffer(`${CDN}/${cdnName}.png`);
  if (buf) {
    await writeFile(dest, buf);
    console.log(`ok   ${outName}.png <- ${cdnName}.png`);
    return;
  }

  console.warn(`miss ${outName}.png (cdn: ${cdnName})`);
}

await mkdir(outDir, { recursive: true });

const slugToOut = Object.entries(files);
const uniqueCdn = [...new Set(Object.values(files))];

for (const cdnName of uniqueCdn) {
  const outNames = slugToOut.filter(([, cdn]) => cdn === cdnName).map(([slug]) => slug);
  for (const outName of outNames) {
    await downloadOne(outName, cdnName);
  }
}

console.log("\nNote: xcite uses public/brands/xcite.svg (no PNG on Wikimedia).");
