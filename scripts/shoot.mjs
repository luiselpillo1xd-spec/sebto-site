/* Headless-Edge capture + DOM probe (no Playwright install).
   Usage: node scripts/shoot.mjs <base-url>
   Writes full-page PNGs + a JSON probe report to .impeccable/review/. */
import { mkdirSync, writeFileSync, existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import http from "node:http";
import puppeteer from "puppeteer-core";

const EDGE_CANDIDATES = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
];

const ROOT = path.resolve("out");
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".json": "application/json",
  ".ico": "image/x-icon",
};
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (p.endsWith("/")) p += "index.html";
  const file = path.join(ROOT, p);
  if (!file.startsWith(ROOT) || !existsSync(file) || !statSync(file).isFile()) {
    res.writeHead(404).end("not found");
    return;
  }
  res.writeHead(200, { "content-type": MIME[path.extname(file)] ?? "application/octet-stream" });
  res.end(readFileSync(file));
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;
const outDir = path.resolve(".impeccable/review");
mkdirSync(outDir, { recursive: true });

const routes = [
  ["home", "/"],
  ["servicios", "/servicios/"],
  ["mario", "/servicios/castillo-mario-bros/"],
  ["fletes", "/servicios/fletes-mudanzas/"],
  ["galeria", "/galeria/"],
  ["contacto", "/contacto/"],
];
const viewports = [
  ["mobile", 390, 844],
  ["tablet", 768, 1024],
  ["desktop", 1440, 900],
];

const executablePath = EDGE_CANDIDATES.find((p) => existsSync(p));
if (!executablePath) throw new Error("msedge.exe not found");

const browser = await puppeteer.launch({
  executablePath,
  headless: "shell",
  protocolTimeout: 60000,
  args: ["--no-sandbox", "--hide-scrollbars", "--force-color-profile=srgb"],
});

const report = [];
for (const [vpName, width, height] of viewports) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  for (const [routeName, route] of routes) {
    const url = base + route;
    const resp = await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });
    await page.evaluate(() => document.fonts.ready);
    // capture harness: force lazy images eager, scroll the whole document,
    // then poll until everything is decoded (max 5s) — a real 404 still fails
    await page.evaluate(async () => {
      for (const i of document.images) i.loading = "eager";
      const doc = document.documentElement;
      const step = Math.max(400, window.innerHeight / 2);
      for (let y = 0; y <= doc.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
      const t0 = Date.now();
      while (Date.now() - t0 < 5000) {
        const imgs = [...document.images];
        if (imgs.every((i) => i.complete && i.naturalWidth > 0)) break;
        await new Promise((r) => setTimeout(r, 150));
      }
    });
    await new Promise((r) => setTimeout(r, 300)); // settle entrance motion

    const probe = await page.evaluate(() => {
      const doc = document.documentElement;
      const overflowX = doc.scrollWidth - doc.clientWidth;
      const offenders = [];
      if (overflowX > 1) {
        for (const el of document.querySelectorAll("*")) {
          const r = el.getBoundingClientRect();
          if (r.right > doc.clientWidth + 1 || r.left < -1) {
            offenders.push(
              el.tagName.toLowerCase() +
                "." + (el.className?.toString?.().split(" ")[0] ?? "?") +
                ` [${Math.round(r.left)}..${Math.round(r.right)}]`
            );
            if (offenders.length > 8) break;
          }
        }
      }
      let minFont = Infinity;
      for (const el of document.querySelectorAll("p,li,dt,dd,small,figcaption,span,a")) {
        if (!el.textContent?.trim()) continue;
        const fs = parseFloat(getComputedStyle(el).fontSize);
        if (fs < minFont) minFont = fs;
      }
      const brokenImgs = [...document.images]
        .filter((i) => !i.complete || i.naturalWidth === 0)
        .map((i) => i.currentSrc || i.src);
      const imgsNoAlt = [...document.images].filter((i) => !i.alt).length;
      const hiddenReveals = [...document.querySelectorAll("[data-reveal]")].filter(
        (el) => getComputedStyle(el).opacity === "0"
      ).length;
      return { overflowX, offenders, minFont, brokenImgs, imgsNoAlt, hiddenReveals };
    });

    const file = path.join(outDir, `${routeName}-${vpName}.png`);
    await page.screenshot({ path: file, fullPage: true });
    report.push({
      route, vpName, status: resp?.status(), ...probe,
      shot: path.relative(process.cwd(), file),
    });
    console.log(`${route} @${vpName}: status=${resp?.status()} overflowX=${probe.overflowX} minFont=${probe.minFont === Infinity ? "-" : probe.minFont}px broken=${probe.brokenImgs.length}`);
  }
  await page.close();
}
await browser.close();
server.close();
writeFileSync(path.join(outDir, "probe.json"), JSON.stringify(report, null, 1));
console.log("Wrote", path.join(outDir, "probe.json"));
