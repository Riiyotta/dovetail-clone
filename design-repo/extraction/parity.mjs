#!/usr/bin/env node
// Live-vs-clone pixel parity harness (R12). For each route: the clone and the live original are loaded at the same
// viewport (1440x900, reduced motion, CSS animations/transitions frozen), scrolled to the SAME offsets (the top of every
// measured clone section from extraction/measured-values.json -> sectionHeights) and screenshotted; each pair is compared
// pixel by pixel (a pixel matches when every channel differs by <= TOLERANCE). Gate: every section >= 80% AND the average.
// Both pages wait for `load` and are scrolled through once before capture, then wait (cap 10s) until every <img> has
// loaded (pending lazy images are switched to eager) and web fonts are ready; the number still pending is recorded
// per route as imagesPending. <video> elements are paused and hidden on both pages (their frames depend on playback
// time) and counted per route as videosMasked. Nothing else is masked.
//
//   PLAYWRIGHT_MODULE=<path or package name of playwright>   BASE_URL=http://localhost:5210   LIVE_URL=<origin of the live site>
//   ROUTES=representative | /a/,/b/     TOLERANCE=24     node extraction/parity.mjs > <output-file>.json
//
// LIVE_URL has no default on purpose: the harness only contacts a live site you name. Nothing is submitted, clicked or
// accepted on the live site; a style tag freezes animations and hides fixed overlays (dialogs) in the headless browser only.
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const repo = join(here, '..')
const pw = await import(process.env.PLAYWRIGHT_MODULE || 'playwright')
const chromium = pw.chromium || pw.default.chromium
const base = process.env.BASE_URL || 'http://localhost:5210'
const live = process.env.LIVE_URL
if (!live) { console.error('LIVE_URL is required (origin of the live original)'); process.exit(2) }
const tol = Number(process.env.TOLERANCE || 24)
const mv = JSON.parse(readFileSync(join(repo, 'extraction/measured-values.json'), 'utf8'))
const templates = JSON.parse(readFileSync(join(repo, 'templates/templates.json'), 'utf8')).templates
const R = process.env.ROUTES || 'representative'
const routes = R === 'representative' ? Object.values(templates).map((t) => t.representativeRoute).filter(Boolean) : R.split(',')
const FREEZE = '*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important} [role=dialog],[aria-modal=true]{display:none!important}'

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })
// The timed Digital Twins promo (CLONE_SPEC §12) opens 10s after load on the first scroll and dims the page with a
// backdrop; mark it as already seen on both pages (the state of a returning visitor) so it never opens mid-capture.
await ctx.addInitScript(() => { try { localStorage.setItem('digital-twins-popup-seen', 'true') } catch {} })
const [pc, pl, cmp] = [await ctx.newPage(), await ctx.newPage(), await ctx.newPage()]
await cmp.setContent('<canvas id=a></canvas><canvas id=b></canvas>')
async function shot(page, y) {
  await page.evaluate((y) => window.scrollTo(0, y), y)
  await page.waitForTimeout(350)
  return (await page.screenshot({ type: 'png' })).toString('base64')
}
async function similarity(a, b) {
  return cmp.evaluate(async ([a, b, tol]) => {
    const load = async (s) => createImageBitmap(await (await fetch('data:image/png;base64,' + s)).blob())
    const [ia, ib] = [await load(a), await load(b)]
    const w = Math.min(ia.width, ib.width), h = Math.min(ia.height, ib.height)
    const da = new OffscreenCanvas(w, h).getContext('2d'); da.drawImage(ia, 0, 0)
    const db = new OffscreenCanvas(w, h).getContext('2d'); db.drawImage(ib, 0, 0)
    const pa = da.getImageData(0, 0, w, h).data, pb = db.getImageData(0, 0, w, h).data
    let same = 0
    for (let i = 0; i < pa.length; i += 4) {
      if (Math.abs(pa[i] - pb[i]) <= tol && Math.abs(pa[i + 1] - pb[i + 1]) <= tol && Math.abs(pa[i + 2] - pb[i + 2]) <= tol) same++
    }
    return Math.round((same / (w * h)) * 10000) / 100
  }, [a, b, tol])
}
const out = { viewport: 1440, tolerance: tol, liveOrigin: live, measuredAt: new Date().toISOString().slice(0, 10), routes: {} }
for (const route of routes) {
  const m = mv.sectionHeights.routes[route]
  if (!m) { out.routes[route] = { error: 'no measurement' }; continue }
  const rec = { sections: [] }
  try {
    // Both pages are loaded the same way: wait for `load` (the live site adds some media only after it), scroll
    // through once so IntersectionObserver/lazy content mounts, then freeze. Playing <video> frames depend on
    // playback time, so videos are paused and hidden on BOTH pages; the count is recorded per route (videosMasked).
    const rl = await pl.goto(live + route, { waitUntil: 'load', timeout: 60000 })
    rec.liveStatus = rl ? rl.status() : null
    await pc.goto(base + route, { waitUntil: 'load', timeout: 60000 })
    rec.videosMasked = {}
    for (const [k, p] of [['clone', pc], ['live', pl]]) {
      await p.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)) } window.scrollTo(0, 0) })
      // Settle (revision 2026-10-29): lazy <img> that the scroll-through started must finish (or fail) and web
      // fonts must be ready before anything is measured or captured, on BOTH pages (cap 10s). Without this the live
      // page's lazily loaded article images could still be 0px tall when the capture ran (live /blog/2025-fall-launch/
      // measured 13,031-15,630px across runs), and a lazy card thumbnail could be captured empty.
      rec.imagesPending = rec.imagesPending || {}
      rec.imagesPending[k] = await p.evaluate(async () => {
        // Images still pending are switched to eager loading (the state a reader reaches by scrolling to them).
        const pending = [...document.images].filter((i) => !i.complete)
        pending.forEach((i) => { i.loading = 'eager' })
        await Promise.race([
          Promise.all([document.fonts ? document.fonts.ready : null, ...pending.map((i) => new Promise((r) => { i.addEventListener('load', r, { once: true }); i.addEventListener('error', r, { once: true }) }))]),
          new Promise((r) => setTimeout(r, 10000)),
        ])
        return [...document.images].filter((i) => !i.complete).length
      })
      await p.addStyleTag({ content: FREEZE + ' video{visibility:hidden!important}' })
      rec.videosMasked[k] = await p.evaluate(() => { const v = [...document.querySelectorAll('video')]; v.forEach((x) => { try { x.pause() } catch {} }); return v.length })
      await p.waitForTimeout(1500)
    }
    rec.liveDocHeightPx = await pl.evaluate(() => document.documentElement.scrollHeight)
    rec.cloneDocHeightPx = await pc.evaluate(() => document.documentElement.scrollHeight)
    for (const n of m.nodes) {
      if (n.overlay || n.aside) continue
      const [a, b] = [await shot(pc, n.topPx), await shot(pl, n.topPx)]
      rec.sections.push({ section: n.section, topPx: n.topPx, similarityPct: await similarity(a, b) })
    }
    const s = rec.sections.map((x) => x.similarityPct)
    rec.averagePct = s.length ? Math.round((s.reduce((x, y) => x + y, 0) / s.length) * 100) / 100 : null
    rec.minPct = s.length ? Math.min(...s) : null
    rec.everySectionAtLeast80 = s.length ? s.every((x) => x >= 80) : false
  } catch (e) { rec.error = String(e).slice(0, 300) }
  out.routes[route] = rec
  console.error(route, rec.averagePct, rec.minPct, rec.error || '')
}
await browser.close()
const all = Object.values(out.routes).flatMap((r) => (r.sections || []).map((x) => x.similarityPct))
out.summary = { routes: Object.keys(out.routes).length, sections: all.length, averagePct: all.length ? Math.round((all.reduce((x, y) => x + y, 0) / all.length) * 100) / 100 : null,
  sectionsAtLeast80: all.filter((x) => x >= 80).length, gatePassed: all.length > 0 && all.every((x) => x >= 80) }
process.stdout.write(JSON.stringify(out, null, 1) + '\n')
