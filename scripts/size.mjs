// Weighs what the home page makes a browser download, from the last
// `npm run build`: its HTML, and the stylesheets, scripts and fonts that HTML
// asks for. Sizes are gzipped, as they travel (WOFF2 is already compressed, so
// it counts as it is). Fails when a kind outgrows its budget.
//
//   npm run build && npm run size
//
// A budget is the weight after the last deliberate change plus a little room.
// When a change needs more, raise the number in the same commit and say why.
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { gzipSync } from "node:zlib";

const root = join(import.meta.dirname, "..", ".next");

// Gzipped bytes. `null` means not budgeted yet.
const budgets = {
  html: null,
  css: null,
  js: null,
  fonts: null,
};

const html = await readFile(join(root, "server", "app", "index.html")).catch(
  () => {
    console.error("No build found. Run `npm run build` first.");
    process.exit(1);
  },
);
const page = html.toString();

// Every file under /_next/static the page names, whether in a tag or in the
// preload hints Next streams after the markup.
const files = new Set(
  page.match(/\/_next\/static\/[\w./~-]+\.(?:css|js|woff2|woff|ttf|otf)/g),
);

const kinds = { css: [], js: [], fonts: [] };
for (const file of files) {
  const ext = file.slice(file.lastIndexOf(".") + 1);
  const kind = ext === "css" ? "css" : ext === "js" ? "js" : "fonts";
  const bytes = await readFile(join(root, file.replace("/_next/", "")));
  const size = ext === "woff2" ? bytes.length : gzipSync(bytes).length;
  kinds[kind].push({ file: file.split("/").pop(), size });
}

const totals = {
  html: gzipSync(html).length,
  css: sum(kinds.css),
  js: sum(kinds.js),
  fonts: sum(kinds.fonts),
};

function sum(list) {
  return list.reduce((total, { size }) => total + size, 0);
}

function kb(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`.padStart(9);
}

let over = false;
console.log("Home page, gzipped\n");
for (const [kind, size] of Object.entries(totals)) {
  const budget = budgets[kind];
  const count = kinds[kind] ? ` (${kinds[kind].length} files)` : "";
  let verdict = "";
  if (budget !== null) {
    verdict = size > budget ? `  OVER ${kb(budget).trim()}` : `  of ${kb(budget).trim()}`;
    if (size > budget) over = true;
  }
  console.log(`${kind.padEnd(6)}${kb(size)}${verdict}${count}`);
}
console.log(`${"total".padEnd(6)}${kb(sum(Object.values(totals).map((size) => ({ size }))))}`);

if (process.argv.includes("--files")) {
  for (const [kind, list] of Object.entries(kinds)) {
    console.log(`\n${kind}`);
    for (const { file, size } of list.sort((a, b) => b.size - a.size)) {
      console.log(`${kb(size)}  ${file}`);
    }
  }
}

if (over) {
  console.error("\nOver budget. Trim the page, or raise the budget in scripts/size.mjs and say why.");
  process.exit(1);
}
