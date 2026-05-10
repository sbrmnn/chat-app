// Generates static portrait JPEGs of each character's VRM by visiting
// /capture/:id in the running dev server and screenshotting the canvas.
//
// Run with: npm run capture:avatars
// Requires the dev server (vite) to be running on the URL below.
//
// Re-run any time you swap a VRM model or change the capture framing.

import { chromium } from "playwright"
import { mkdir } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import { dirname, resolve } from "node:path"

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = resolve(__dirname, "../public/avatars")
const baseUrl = process.env.CAPTURE_BASE_URL ?? "http://localhost:5173"
const characterIds = ["saki", "yuki", "hana", "aoi", "koharu", "mei", "akira"]

async function main() {
  await mkdir(outDir, { recursive: true })

  const browser = await chromium.launch()
  const context = await browser.newContext({
    // Square viewport gives asymmetric hair/clothing room to render fully;
    // cards crop with object-position to portrait aspect.
    viewport: { width: 800, height: 800 },
    deviceScaleFactor: 2,
  })
  const page = await context.newPage()

  for (const id of characterIds) {
    process.stdout.write(`  ${id}.jpg ... `)
    const url = `${baseUrl}/capture/${id}`
    await page.goto(url, { waitUntil: "domcontentloaded" })
    // Wait for VRM to load (Capture page sets data-capture-ready on <html>).
    await page.waitForSelector('html[data-capture-ready="true"]', {
      timeout: 30_000,
    })
    // Extra settle frame.
    await page.waitForTimeout(250)

    const outPath = resolve(outDir, `${id}.jpg`)
    await page.screenshot({
      path: outPath,
      type: "jpeg",
      quality: 85,
      fullPage: false,
    })
    console.log("done")
  }

  await browser.close()
  console.log(`\nWrote ${characterIds.length} portraits to ${outDir}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
