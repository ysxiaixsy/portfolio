// Draws public/pixel-portrait.png, a 128×128 pixel-art version of the photo,
// from public/portrait.jpg. Run `npm run pixel-portrait` after changing the
// photo, and commit the output.
//
// 1. Crop to head and shoulders, so the face gets the pixels.
// 2. Scale down, and cut out the figure with scripts/portrait-mask.png (the
//    photo's background mask, made once with a background-removal model; make
//    a new one if the photo changes). The background is left transparent, so
//    the page fills it with one solid colour.
// 3. Map every pixel to a hand-picked palette (in Lab space), one ramp per
//    part: hair, skin, shirt, robe, gold cord.
// 4. Clean up: a pixel none of its neighbours share is noise.
// 5. Draw the eyes by hand, since at this size no filter draws a good eye.
import sharp from "sharp";

const SIZE = 128;
const crop = { left: 150, top: 0, width: 720, height: 720 };

const palette = {
  hair: ["#0f0d0d", "#1e1c1a", "#2e2a28"],
  skin: ["#6e5045", "#9c7464", "#c39682", "#ddb6a4", "#ecd0c2"],
  shirt: ["#aeb2c6", "#dde1ee"],
  robe: ["#05152b", "#0c2646", "#16345c", "#24497a"],
  gold: ["#9c7428", "#dab75c"],
};
// The collar starts about halfway down; above it, the shirt's blue-whites
// would only ever be misread skin highlights.
const shirtFrom = SIZE / 2;

// The eyes, placed from the photo's brightness on the 128 grid. Each row is
// read left to right from (x, y): L lash line, I iris, W white, S lid shadow,
// "." leaves the pixel as it is.
const eyeInk = { L: "#1e1c1a", I: "#0f0d0d", W: "#e3d9d4", S: "#9c7464" };
const eyes = [
  { x: 34, y: 36, rows: [".SLLLLLL.", "SLWWIIIIS", "LLWWIIIW."] },
  { x: 56, y: 34, rows: ["...SLLLLLLL.", "..SLLIIILLLS", ".SSWWIIIWWLL"] },
];

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));

function lab([r, g, b]) {
  const lin = (c) => {
    c /= 255;
    return c > 0.04045 ? ((c + 0.055) / 1.055) ** 2.4 : c / 12.92;
  };
  const [R, G, B] = [lin(r), lin(g), lin(b)];
  const f = (t) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
  const x = f((R * 0.4124 + G * 0.3576 + B * 0.1805) / 0.95047);
  const y = f(R * 0.2126 + G * 0.7152 + B * 0.0722);
  const z = f((R * 0.0193 + G * 0.1192 + B * 0.9505) / 1.08883);
  return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
}

const colors = Object.entries(palette).flatMap(([part, list]) =>
  list.map((h) => ({ part, rgb: hex(h), lab: lab(hex(h)) })),
);

const { data: photo } = await sharp("public/portrait.jpg")
  .extract(crop)
  .resize(SIZE, SIZE, { kernel: "lanczos3" })
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const { data: mask } = await sharp("scripts/portrait-mask.png")
  .extract(crop)
  .resize(SIZE, SIZE, { kernel: "cubic" })
  .extractChannel(0)
  .raw()
  .toBuffer({ resolveWithObject: true });

// RGBA; untouched pixels stay transparent.
const art = Buffer.alloc(SIZE * SIZE * 4);
const at = (x, y) => (y * SIZE + x) * 4;

for (let y = 0; y < SIZE; y++) {
  for (let x = 0; x < SIZE; x++) {
    const p = y * SIZE + x;
    if (mask[p] < 128) continue;
    const L = lab([photo[p * 3], photo[p * 3 + 1], photo[p * 3 + 2]]);
    let best = colors[0];
    let bestD = Infinity;
    for (const c of colors) {
      if (c.part === "shirt" && y < shirtFrom) continue;
      const d = (L[0] - c.lab[0]) ** 2 + (L[1] - c.lab[1]) ** 2 + (L[2] - c.lab[2]) ** 2;
      if (d < bestD) [best, bestD] = [c, d];
    }
    art.set([...best.rgb, 255], at(x, y));
  }
}

// A pixel none of its eight neighbours share takes the colour most of them
// have (transparent counts as a colour). Two passes.
const key = (buf, i) => `${buf[i]},${buf[i + 1]},${buf[i + 2]},${buf[i + 3]}`;
for (let pass = 0; pass < 2; pass++) {
  const src = Buffer.from(art);
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const me = key(src, at(x, y));
      const counts = new Map();
      let same = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const [nx, ny] = [x + dx, y + dy];
          if ((!dx && !dy) || nx < 0 || ny < 0 || nx >= SIZE || ny >= SIZE) continue;
          const k = key(src, at(nx, ny));
          if (k === me) same++;
          counts.set(k, (counts.get(k) ?? 0) + 1);
        }
      }
      if (same === 0) {
        const [top] = [...counts].sort((a, b) => b[1] - a[1])[0];
        art.set(top.split(",").map(Number), at(x, y));
      }
    }
  }
}

for (const { x, y, rows } of eyes) {
  rows.forEach((row, dy) => {
    [...row].forEach((ink, dx) => {
      if (eyeInk[ink]) art.set([...hex(eyeInk[ink]), 255], at(x + dx, y + dy));
    });
  });
}

await sharp(art, { raw: { width: SIZE, height: SIZE, channels: 4 } })
  .png()
  .toFile("public/pixel-portrait.png");
console.log(`public/pixel-portrait.png: ${SIZE}×${SIZE}`);
