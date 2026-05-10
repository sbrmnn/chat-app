// Generates static portrait JPEGs of each character's VRM by visiting
// /capture/:id, screenshotting the canvas with a transparent background,
// then auto-trimming and compositing onto a soft per-character gradient.
//
// Run with: npm run capture:avatars
// Requires the dev server (vite) to be running on the URL below.

import { chromium } from "playwright"
import sharp from "sharp"
import { mkdir } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import { dirname, resolve } from "node:path"

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = resolve(__dirname, "../public/avatars")
const baseUrl = process.env.CAPTURE_BASE_URL ?? "http://localhost:5173"

// Per-character config: id + accent color used for the background gradient.
// Keep in sync with frontend/src/data/characters.ts.
const characters = [
  { id: "saki", accent: "#e07a6a" },
  { id: "yuki", accent: "#7a9ac9" },
  { id: "hana", accent: "#c9a96e" },
  { id: "aoi", accent: "#7ecec4" },
  { id: "koharu", accent: "#dfc28e" },
  { id: "mei", accent: "#a3ddd9" },
  { id: "akira", accent: "#5a7d9a" },
]

const OUTPUT_SIZE = 800
// Cream paper base — matches the Ghibli design's --color-cream-50.
const PAPER_COLOR = "#faf3e0"

/** Build a soft, very subtle radial gradient using the character's accent. */
function backgroundSvg(accent) {
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${OUTPUT_SIZE}" height="${OUTPUT_SIZE}">
  <defs>
    <radialGradient id="g" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.15" />
      <stop offset="70%" stop-color="${PAPER_COLOR}" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="${PAPER_COLOR}" />
  <rect width="100%" height="100%" fill="url(#g)" />
</svg>`)
}

async function main() {
  await mkdir(outDir, { recursive: true })

  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: { width: 800, height: 800 },
    deviceScaleFactor: 2,
  })
  const page = await context.newPage()

  for (const { id, accent } of characters) {
    process.stdout.write(`  ${id}.jpg ... `)
    const url = `${baseUrl}/capture/${id}`
    await page.goto(url, { waitUntil: "domcontentloaded" })
    await page.waitForSelector('html[data-capture-ready="true"]', {
      timeout: 30_000,
    })
    await page.waitForTimeout(250)

    // Transparent screenshot of just the canvas (no page background).
    const canvas = await page.locator("canvas").first()
    const png = await canvas.screenshot({ type: "png", omitBackground: true })

    // Auto-trim transparent borders. Higher threshold catches antialiased
    // edge pixels that would otherwise leave a visible rectangular halo.
    const trimmed = await sharp(png)
      .trim({
        background: { r: 0, g: 0, b: 0, alpha: 0 },
        threshold: 30,
      })
      .toBuffer()
    const trimMeta = await sharp(trimmed).metadata()

    // Scale the character so its longest dimension fills 85% of the output —
    // leaves a comfortable margin around the figure.
    const margin = 0.85
    const scale = Math.min(
      (OUTPUT_SIZE * margin) / trimMeta.width,
      (OUTPUT_SIZE * margin) / trimMeta.height,
    )
    const fitW = Math.round(trimMeta.width * scale)
    const fitH = Math.round(trimMeta.height * scale)
    const resized = await sharp(trimmed)
      .resize(fitW, fitH, { fit: "fill" })
      .toBuffer()

    // Center horizontally; bias the figure slightly toward the upper third
    // so the head sits where eyes typically land in a portrait.
    const left = Math.round((OUTPUT_SIZE - fitW) / 2)
    const top = Math.round((OUTPUT_SIZE - fitH) * 0.18)

    const outPath = resolve(outDir, `${id}.jpg`)
    await sharp(backgroundSvg(accent))
      .composite([{ input: resized, left, top }])
      .jpeg({ quality: 88, mozjpeg: true })
      .toFile(outPath)

    console.log("done")
  }

  await browser.close()
  console.log(`\nWrote ${characters.length} portraits to ${outDir}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
