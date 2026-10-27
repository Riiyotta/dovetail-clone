#!/usr/bin/env node
// Responsive + rendered-style re-measure (R11): for each template's representative route, document height at
// 1440 / 1280 / 768 / 390 and computed styles (font, size, line-height, weight, colour, background) of h1, first h2,
// body and the first button/link-button at 1440, to confirm the token layer against what actually renders.
//   PLAYWRIGHT_MODULE=<playwright>  BASE_URL=http://localhost:5210  node extraction/measure_responsive.mjs > <file>.json
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..')
const pw = await import(process.env.PLAYWRIGHT_MODULE || 'playwright')
const chromium = pw.chromium || pw.default.chromium
const base = process.env.BASE_URL || 'http://localhost:5210'
const templates = JSON.parse(readFileSync(join(repo, 'templates/templates.json'), 'utf8')).templates
const reps = Object.fromEntries(Object.entries(templates).map(([k, t]) => [k, t.representativeRoute]))
const browser = await chromium.launch()
const out = { viewports: [1440, 1280, 768, 390], byTemplate: {} }
for (const [tid, route] of Object.entries(reps)) {
  const rec = { route, docHeightPx: {}, styles1440: {} }
  for (const [w, h] of [[1440, 900], [1280, 800], [768, 1024], [390, 844]]) {
    const page = await browser.newPage({ viewport: { width: w, height: h }, reducedMotion: 'reduce' })
    await page.goto(base + route, { waitUntil: 'networkidle' })
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 800) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 15)) } scrollTo(0, 0) })
    await page.waitForTimeout(200)
    rec.docHeightPx[w] = await page.evaluate(() => document.documentElement.scrollHeight)
    if (w === 1440) {
      rec.styles1440 = await page.evaluate(() => {
        const pick = (el) => { if (!el) return null; const s = getComputedStyle(el); return { fontFamily: s.fontFamily.split(',')[0].replace(/"/g, ''), fontSize: s.fontSize, lineHeight: s.lineHeight, fontWeight: s.fontWeight, color: s.color, backgroundColor: s.backgroundColor, borderRadius: s.borderRadius } }
        return { h1: pick(document.querySelector('main h1, h1')), h2: pick(document.querySelector('main h2')), body: pick(document.body), button: pick(document.querySelector('main a[class*=btn], main button[class*=btn]')) }
      })
    }
    await page.close()
  }
  out.byTemplate[tid] = rec
}
await browser.close()
process.stdout.write(JSON.stringify(out, null, 1) + '\n')
