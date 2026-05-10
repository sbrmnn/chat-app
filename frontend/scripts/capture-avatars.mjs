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

// Per-character config: accent color + a distinct gradient "feel" so each
// portrait's backdrop has its own personality.
//   bg: { cx, cy, r, opacity } — radial gradient parameters as percentages
const characters = [
  // Saki — warm cheerful sunrise from the upper-left
  { id: "saki", accent: "#e07a6a", bg: { cx: 25, cy: 25, r: 75, opacity: 0.22 } },
  // Yuki — calm sky settling from above
  { id: "yuki", accent: "#7a9ac9", bg: { cx: 50, cy: 15, r: 80, opacity: 0.20 } },
  // Hana — bright energetic center bloom
  { id: "hana", accent: "#c9a96e", bg: { cx: 50, cy: 45, r: 60, opacity: 0.22 } },
  // Aoi — soft afternoon teal glow from the right
  { id: "aoi", accent: "#7ecec4", bg: { cx: 75, cy: 35, r: 70, opacity: 0.18 } },
  // Koharu — gentle warm hearth-light from the lower-left
  { id: "koharu", accent: "#dfc28e", bg: { cx: 30, cy: 70, r: 75, opacity: 0.20 } },
  // Mei — fresh, lifted from below
  { id: "mei", accent: "#a3ddd9", bg: { cx: 50, cy: 80, r: 70, opacity: 0.22 } },
  // Akira — dramatic spotlight from above, dignified
  { id: "akira", accent: "#5a7d9a", bg: { cx: 50, cy: 20, r: 65, opacity: 0.20 } },
]

const OUTPUT_SIZE = 800
// Cream paper base — matches the Ghibli design's --color-cream-50.
const PAPER_COLOR = "#faf3e0"

/** Build a soft radial gradient using the character's accent + bg config. */
function backgroundSvg(accent, bg) {
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${OUTPUT_SIZE}" height="${OUTPUT_SIZE}">
  <defs>
    <radialGradient id="g" cx="${bg.cx}%" cy="${bg.cy}%" r="${bg.r}%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="${bg.opacity}" />
      <stop offset="75%" stop-color="${PAPER_COLOR}" stop-opacity="0" />
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

  for (const { id, accent, bg } of characters) {
    process.stdout.write(`  ${id}.jpg ... `)
    const url = `${baseUrl}/capture/${id}`
    await page.goto(url, { waitUntil: "domcontentloaded" })
    await page.waitForSelector('html[data-capture-ready="true"]', {
      timeout: 30_000,
    })
    await page.waitForTimeout(250)

    // Transparent screenshot of the canvas region. Use page.screenshot
    // with a clip rect — locator.screenshot waits for "stable" which
    // never resolves with a continuously animating WebGL canvas.
    const box = await page.locator("canvas").first().boundingBox()
    const png = await page.screenshot({
      type: "png",
      omitBackground: true,
      clip: box,
    })

    // Compute the visible-content bbox manually from the alpha channel.
    // High threshold to ignore antialiased edges and stray near-transparent
    // pixels that would otherwise pull the bbox off-center.
    const { width: pw, height: ph } = await sharp(png).metadata()
    const raw = await sharp(png).ensureAlpha().raw().toBuffer()
    const ALPHA_THRESHOLD = 220 // near-opaque only; ignores faint hair tips
                                // and glow that would otherwise inflate the bbox
    let minX = pw, minY = ph, maxX = -1, maxY = -1
    for (let y = 0; y < ph; y++) {
      for (let x = 0; x < pw; x++) {
        const alpha = raw[(y * pw + x) * 4 + 3]
        if (alpha > ALPHA_THRESHOLD) {
          if (x < minX) minX = x
          if (x > maxX) maxX = x
          if (y < minY) minY = y
          if (y > maxY) maxY = y
        }
      }
    }
    if (maxX < 0) {
      console.log("skipped (no visible content)")
      continue
    }
    const cropW = maxX - minX + 1
    const cropH = maxY - minY + 1
    const trimmed = await sharp(png)
      .extract({ left: minX, top: minY, width: cropW, height: cropH })
      .toBuffer()
    const trimMeta = { width: cropW, height: cropH }

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
    await sharp(backgroundSvg(accent, bg))
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
