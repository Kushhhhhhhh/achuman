/**
 * Rebuilds the gallery from `originals/`.
 *
 * - `originals/` is the source of truth. Drop replacements there (or into
 *   `public/` and they'll be moved in for you) and re-run.
 * - Output filenames carry a hash of the source bytes, so changing a photo
 *   changes its URL. That's what stops a stale copy being served by the
 *   browser, the CDN or Next's image optimizer.
 * - `originals/.order.json` remembers the shuffled order, so adding or
 *   swapping a photo doesn't reshuffle the whole wall.
 */
import sharp from "sharp";
import { createHash } from "node:crypto";
import { readdir, mkdir, writeFile, readFile, rename, unlink, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = path.join(ROOT, "public");
const OUT = path.join(PUBLIC, "photos");
const ORIG = path.join(ROOT, "originals");
const OG = path.join(ROOT, "src/app/_og");
const ORDER_FILE = path.join(ORIG, ".order.json");

const EXT = new Set([".png", ".jpg", ".jpeg", ".webp"]);

/** Bump when the encoder settings change, so every file gets a new hash. */
const ENCODER_VERSION = "v1";

/** Seed for the original shuffle — keeps the first run reproducible. */
const SEED = 20261011;

function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle(items, seed) {
  const rand = mulberry32(seed);
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

async function listImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && EXT.has(path.extname(e.name).toLowerCase()))
    .map((e) => e.name)
    .sort();
}

// ── 1. sweep anything dropped into public/ into originals/ ──────────────────
await mkdir(ORIG, { recursive: true });
await mkdir(OUT, { recursive: true });

for (const name of await listImages(PUBLIC)) {
  await rename(path.join(PUBLIC, name), path.join(ORIG, name));
  console.log(`moved public/${name} -> originals/`);
}

const sources = await listImages(ORIG);
if (sources.length === 0) {
  console.error("No images in originals/ — nothing to build.");
  process.exit(1);
}

// ── 2. work out the display order, keeping any order we already settled on ──
let previous = [];
try {
  previous = JSON.parse(await readFile(ORDER_FILE, "utf8"));
} catch {
  // first run: reproduce the original seeded shuffle
  previous = shuffle(sources, SEED);
}

const known = new Set(sources);
const kept = previous.filter((name) => known.has(name));
const added = shuffle(
  sources.filter((name) => !previous.includes(name)),
  SEED + kept.length,
);
const order = [...kept, ...added];

for (const name of added) console.log(`new photo: ${name}`);
for (const name of previous.filter((n) => !known.has(n))) {
  console.log(`dropped (no longer in originals/): ${name}`);
}

await writeFile(ORDER_FILE, `${JSON.stringify(order, null, 2)}\n`);

// ── 3. convert ──────────────────────────────────────────────────────────────
const manifest = [];
const expected = new Set();
let inBytes = 0;
let outBytes = 0;

for (let i = 0; i < order.length; i++) {
  const name = order[i];
  const src = path.join(ORIG, name);
  const bytes = await readFile(src);

  // sharp sniffs the real format — a .jpg renamed to .webp is still a JPEG
  const meta = await sharp(bytes).metadata();
  const lossless = meta.format === "png";

  const hash = createHash("sha1")
    .update(bytes)
    .update(ENCODER_VERSION)
    .digest("hex")
    .slice(0, 8);

  const outName = `${String(i + 1).padStart(2, "0")}-${hash}.webp`;
  const dest = path.join(OUT, outName);
  expected.add(outName);

  let reused = false;
  try {
    await stat(dest);
    reused = true;
  } catch {
    await sharp(bytes, { limitInputPixels: false })
      .rotate() // honour EXIF orientation
      .webp(
        lossless
          ? { lossless: true, effort: 6 }
          : { quality: 100, effort: 6, smartSubsample: true },
      )
      .toFile(dest);
  }

  const blur = await sharp(bytes, { limitInputPixels: false })
    .rotate()
    .resize(16, 16, { fit: "inside" })
    .webp({ quality: 45 })
    .toBuffer();

  const outMeta = await sharp(dest).metadata();
  const outSize = (await stat(dest)).size;
  inBytes += bytes.length;
  outBytes += outSize;

  manifest.push({
    src: `/photos/${outName}`,
    width: outMeta.width,
    height: outMeta.height,
    blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
  });

  console.log(
    `${String(i + 1).padStart(2)}. ${name} -> photos/${outName}  ` +
      `${outMeta.width}x${outMeta.height}  ` +
      `${(bytes.length / 1024).toFixed(0)}KB -> ${(outSize / 1024).toFixed(0)}KB` +
      `  [${lossless ? "lossless" : "q100"}${reused ? ", unchanged" : ""}]`,
  );
}

// ── 4. bin any output that no longer belongs ────────────────────────────────
for (const name of await readdir(OUT)) {
  if (!expected.has(name)) {
    await unlink(path.join(OUT, name));
    console.log(`removed stale output: photos/${name}`);
  }
}

// ── 5. manifest + the social card's hero crop ───────────────────────────────
await writeFile(
  path.join(ROOT, "src/lib/photos.ts"),
  `// AUTO-GENERATED by scripts/convert-photos.mjs — do not edit by hand.
// ${manifest.length} photos. Filenames include a hash of the source image, so
// swapping a photo changes its URL and no cache can serve the old one.

export type Photo = {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
};

export const photos: Photo[] = ${JSON.stringify(manifest, null, 2)};
`,
);

await mkdir(OG, { recursive: true });
await sharp(path.join(OUT, path.basename(manifest[0].src)))
  .resize({ width: 760 })
  .jpeg({ quality: 88 })
  .toFile(path.join(OG, "hero.jpg"));

console.log(`\n${manifest.length} photos`);
console.log(
  `total ${(inBytes / 1048576).toFixed(2)}MB -> ${(outBytes / 1048576).toFixed(2)}MB`,
);
console.log("og hero -> src/app/_og/hero.jpg");
