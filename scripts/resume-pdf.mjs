// Prints the /resume page to public/resume.pdf with headless Chrome.
// Start the site first (`npm run build && npm start`), then run
// `npm run resume`, optionally passing another URL for the page.
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const url = process.argv[2] ?? "http://localhost:3000/resume";
const out = resolve("public/resume.pdf");

const chrome = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].find((path) => path && existsSync(path));

if (!chrome) {
  console.error("Couldn't find Chrome or Edge. Set CHROME_PATH to its executable.");
  process.exit(1);
}

execFileSync(
  chrome,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-pdf-header-footer",
    "--virtual-time-budget=5000",
    `--print-to-pdf=${out}`,
    url,
  ],
  { stdio: "ignore" },
);

console.log(`Saved ${out}`);
