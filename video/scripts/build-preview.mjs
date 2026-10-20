/** Build a single, offline HTML Player preview without rendering a video. */
import { build } from "esbuild";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = path.join(root, "src");
const publicRoot = path.join(root, "public");
const output = path.join(root, "out", "ani-hamuda-preview.html");
const mime = {
  ".wav": "audio/wav",
  ".mp3": "audio/mpeg",
  ".ogg": "audio/ogg",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

async function filesIn(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const full = path.join(dir, entry.name);
      return entry.isDirectory() ? filesIn(full) : [full];
    }),
  );
  return nested.flat();
}

// Remotion's staticFile() checks this browser manifest before constructing a URL.
// Embed each referenced asset once, retaining exactly the same scene source.
const assetNames = new Set();
for (const source of await filesIn(sourceRoot)) {
  if (!/\.[cm]?[jt]sx?$/.test(source)) continue;
  const text = await fs.readFile(source, "utf8");
  for (const match of text.matchAll(/staticFile\(\s*["']([^"']+)["']\s*\)/g))
    assetNames.add(match[1]);
}
const assets = [];
for (const name of [...assetNames].sort()) {
  const full = path.resolve(publicRoot, name);
  if (!full.startsWith(publicRoot + path.sep))
    throw new Error(`Invalid asset path: ${name}`);
  const data = await fs.readFile(full);
  const type = mime[path.extname(full).toLowerCase()];
  if (!type) throw new Error(`Add a MIME type for ${name}`);
  assets.push({
    name,
    src: `data:${type};base64,${data.toString("base64")}`,
    sizeInBytes: data.length,
    lastModified: 0,
  });
}

const result = await build({
  absWorkingDir: root,
  entryPoints: ["src/Preview.tsx"],
  bundle: true,
  write: false,
  platform: "browser",
  format: "iife",
  target: ["chrome110", "firefox115", "safari16.4"],
  jsx: "automatic",
  minify: true,
  sourcemap: false,
  legalComments: "inline",
  define: { "process.env.NODE_ENV": '"production"' },
});
const safeScript = (text) => text.replace(/<\/script/gi, "<\\/script");
const html = `<!doctype html>
<html lang="he">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="color-scheme" content="dark">
<title>אני חמודה</title>
<link rel="icon" href="data:,">
<style>
*{box-sizing:border-box}html,body,#root{margin:0;min-height:100%;width:100%}body{background:#171b25;color:#f9f4e9;font-family:Arial,sans-serif}.preview{min-height:100vh;min-height:100dvh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:18px 12px;gap:10px}.preview-heading{display:flex;align-items:baseline;justify-content:space-between;gap:18px;width:min(100%,440px)}h1{font-size:25px;margin:0;line-height:1.2}.preview-heading span{font-size:13px;opacity:.7}.player-shell{width:min(100%,440px,calc((100vh - 136px)*9/16));width:min(100%,440px,calc((100dvh - 136px)*9/16));min-width:200px;aspect-ratio:9/16;overflow:hidden;border-radius:14px;box-shadow:0 18px 70px #0007}.voice-note{font-size:11px;line-height:1.45;opacity:.65;text-align:center;max-width:440px;margin:0;direction:ltr}.preview-error{padding:30px;color:white;font-size:20px;background:#49202a;direction:ltr}@media(max-width:380px){.preview-heading{gap:10px}.preview-heading span{font-size:11px}h1{font-size:22px}}
</style>
</head>
<body>
<div id="root"></div>
<script>window.remotion_staticBase="";window.remotion_staticFiles=${safeScript(JSON.stringify(assets))};</script>
<script>${safeScript(result.outputFiles[0].text)}</script>
</body>
</html>
`;
await fs.mkdir(path.dirname(output), { recursive: true });
await fs.writeFile(output, html);
console.log(
  `Wrote ${path.relative(root, output)} (${(Buffer.byteLength(html) / 1048576).toFixed(1)} MiB), ${assets.length} embedded assets. No video render.`,
);
