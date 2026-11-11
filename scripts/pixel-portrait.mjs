// Draws public/pixel-portrait.png, a 64×64 pixel-art version of the photo,
// from public/portrait.jpg. Run `npm run pixel-portrait` after changing the
// photo, and commit the output.
//
// 1. Crop to head and shoulders, so the face gets the pixels.
// 2. Sharpen, then scale down, keeping eyes, brows and moustache readable.
// 3. Map every pixel to a hand-picked palette (in Lab space), one ramp per
//    part: hair, backdrop, skin, shirt, robe, gold cord.
// 4. Clean up: a pixel none of its neighbours share is noise.
import sharp from "sharp";

const SIZE = 64;
const crop = { left: 150, top: 0, width: 720, height: 720 };

const palette = {
  hair: ["#0f0d0d", "#1e1c1a"],
  backdrop: ["#2b2928", "#403e3d"],
  skin: ["#6e5045", "#9c7464", "#c39682", "#ddb6a4", "#ecd0c2"],
  shirt: ["#aeb2c6", "#dde1ee"],
  robe: ["#05152b", "#0c2646", "#16345c", "#24497a"],
  gold: ["#9c7428", "#dab75c"],
};
// The collar starts about halfway down; above it, the shirt's blue-whites
// would only ever be misread skin highlights.
const shirtFrom = SIZE / 2;

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

const { data } = await sharp("public/portrait.jpg")
  .extract(crop)
  .sharpen({ sigma: 2 })
  .resize(SIZE, SIZE, { kernel: "lanczos3" })
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const px = (x, y) => (y * SIZE + x) * 3;

for (let y = 0; y < SIZE; y++) {
  for (let x = 0; x < SIZE; x++) {
    const i = px(x, y);
    const L = lab([data[i], data[i + 1], data[i + 2]]);
    let best = colors[0];
    let bestD = Infinity;
    for (const c of colors) {
      if (c.part === "shirt" && y < shirtFrom) continue;
      const d = (L[0] - c.lab[0]) ** 2 + (L[1] - c.lab[1]) ** 2 + (L[2] - c.lab[2]) ** 2;
      if (d < bestD) [best, bestD] = [c, d];
    }
    data.set(best.rgb, i);
  }
}

// A pixel none of its eight neighbours share takes the colour most of them
// have. Two passes.
const key = (buf, i) => `${buf[i]},${buf[i + 1]},${buf[i + 2]}`;
for (let pass = 0; pass < 2; pass++) {
  const src = Buffer.from(data);
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const me = key(src, px(x, y));
      const counts = new Map();
      let same = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const [nx, ny] = [x + dx, y + dy];
          if ((!dx && !dy) || nx < 0 || ny < 0 || nx >= SIZE || ny >= SIZE) continue;
          const k = key(src, px(nx, ny));
          if (k === me) same++;
          counts.set(k, (counts.get(k) ?? 0) + 1);
        }
      }
      if (same === 0) {
        const [top] = [...counts].sort((a, b) => b[1] - a[1])[0];
        data.set(top.split(",").map(Number), px(x, y));
      }
    }
  }
}

await sharp(data, { raw: { width: SIZE, height: SIZE, channels: 3 } })
  .png({ palette: true, colours: colors.length })
  .toFile("public/pixel-portrait.png");
console.log(`public/pixel-portrait.png: ${SIZE}×${SIZE}, ${colors.length} colours`);
