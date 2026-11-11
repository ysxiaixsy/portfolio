// Draws the site icons from one 16×16 pixel grid: "JP" in paper on an ink
// tile, the letters copied from Geist Pixel at two-pixel strokes, with the
// corners notched like the site's pixel frames. Run `npm run favicon` after
// changing the grid, and commit the output.
//
// src/app/icon.svg     the grid as crisp SVG squares
// src/app/favicon.ico  16, 32 and 48px PNGs (whole multiples of the grid)
// src/app/apple-icon.png  180px: the grid at 10× on a 10px ink border (iOS
//                         rounds its own corners, so no notches)
import { writeFile } from "node:fs/promises";
import sharp from "sharp";

// The theme's foreground and background (globals.css, light), in sRGB.
const INK = "#12161d";
const PAPER = "#fbfcfd";

// # paper (the letters), . ink, x transparent (the notched corners).
const grid = [
  "x..............x",
  "................",
  "................",
  ".....##.#####...",
  ".....##.######..",
  ".....##.##..##..",
  ".....##.##..##..",
  ".....##.######..",
  ".....##.#####...",
  ".....##.##......",
  "..##.##.##......",
  "..#####.##......",
  "...###..##......",
  "................",
  "................",
  "x..............x",
];
const SIZE = grid.length;

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const fill = { "#": [...hex(PAPER), 255], ".": [...hex(INK), 255], x: [0, 0, 0, 0] };

function png(scale, { notched = true } = {}) {
  const raw = Buffer.alloc(SIZE * SIZE * 4);
  grid.forEach((row, y) =>
    [...row].forEach((cell, x) => {
      raw.set(fill[cell === "x" && !notched ? "." : cell], (y * SIZE + x) * 4);
    }),
  );
  return sharp(raw, { raw: { width: SIZE, height: SIZE, channels: 4 } })
    .resize(SIZE * scale, SIZE * scale, { kernel: "nearest" })
    .png();
}

// SVG: the ink tile as one notched square, the letters as one path of 1×1
// cells on top.
const tile = `M1 0h${SIZE - 2}v1h1v${SIZE - 2}h-1v1H1v-1H0V1h1z`;
const letters = grid
  .flatMap((row, y) => [...row].flatMap((cell, x) => (cell === "#" ? [`M${x} ${y}h1v1h-1z`] : [])))
  .join("");
await writeFile(
  "src/app/icon.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" shape-rendering="crispEdges"><path fill="${INK}" d="${tile}"/><path fill="${PAPER}" d="${letters}"/></svg>\n`,
);

// ICO: a header, one directory entry per size, then the PNGs as they are.
const sizes = [1, 2, 3];
const images = await Promise.all(sizes.map((s) => png(s).toBuffer()));
const header = Buffer.alloc(6 + 16 * images.length);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(images.length, 4);
let offset = header.length;
images.forEach((image, i) => {
  const px = SIZE * sizes[i];
  const entry = 6 + 16 * i;
  header.writeUInt8(px, entry);
  header.writeUInt8(px, entry + 1);
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(image.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += image.length;
});
await writeFile("src/app/favicon.ico", Buffer.concat([header, ...images]));

const apple = await png(10, { notched: false }).toBuffer();
await sharp(apple)
  .extend({ top: 10, bottom: 10, left: 10, right: 10, background: INK })
  .png()
  .toFile("src/app/apple-icon.png");

console.log("src/app/icon.svg, favicon.ico, apple-icon.png");
