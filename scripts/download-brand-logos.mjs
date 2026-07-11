import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "brands");
const CDN = "https://cdn.jsdelivr.net/gh/filippofilip95/car-logos-dataset@master/logos/optimized";

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
  xcite: "xcite",
  zotye: "zotye",
  lada: "lada",
  uaz: "uaz",
};

/** Fallback chain when primary logo missing in dataset */
const fallbacks = {
  baic: ["baic"],
  changan: ["changan", "chery"],
  cheryexeed: ["exeed", "chery"],
  dongfeng: ["dongfeng", "faw"],
  forthing: ["forthing", "dongfeng"],
  gac: ["gac", "changan"],
  gaz: ["uaz", "lada"],
  hongqi: ["hongqi", "faw"],
  jaecoo: ["jaecoo", "chery", "exeed"],
  jetour: ["jetour", "chery"],
  kaiyi: ["kaiyi", "chery"],
  livan: ["livan", "geely"],
  moskvich: ["moskvich", "lada"],
  omoda: ["omoda", "chery"],
  soueast: ["soueast", "mitsubishi"],
  swm: ["swm", "lifan"],
  tank: ["tank", "great-wall"],
  tenet: ["tenet", "chery"],
  xcite: ["xcite", "chery"],
  zotye: ["zotye", "lifan"],
};

async function tryDownload(name) {
  const url = `${CDN}/${name}.png`;
  const res = await fetch(url);
  if (!res.ok) return null;
  return Buffer.from(await res.arrayBuffer());
}

async function downloadOne(outName, candidates) {
  const dest = path.join(outDir, `${outName}.png`);
  if (existsSync(dest)) {
    console.log(`skip ${outName}.png`);
    return;
  }
  for (const candidate of candidates) {
    const buf = await tryDownload(candidate);
    if (buf) {
      await writeFile(dest, buf);
      console.log(`ok   ${outName}.png <- ${candidate}.png`);
      return;
    }
  }
  console.warn(`miss ${outName}.png (${candidates.join(", ")})`);
}

await mkdir(outDir, { recursive: true });

const unique = new Set(Object.values(files));
for (const file of unique) {
  const candidates = fallbacks[file] ?? [file];
  await downloadOne(file, candidates);
}
