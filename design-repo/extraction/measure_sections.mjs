#!/usr/bin/env node
// Re-measure tool for extraction/measured-values.json -> sectionHeights (R9) and the reference-example content.
// Measures routes of routes/routes.json at 1440x900 in a headless browser using the per-template rules in
// extraction/section-map.json: chrome (banner / nav / footer variant + theme), then every semantic section node
// (top, height, CSS position, spacer above it) and, for content routes, a neutral content extraction
// (heading, lead, actions, items, media, quote, body blocks).
//
//   PLAYWRIGHT_MODULE=<path or package name of playwright>   (default: "playwright", resolved normally)
//   BASE_URL=http://localhost:5210                            (the clone's dev server)
//   ROUTES=all | sample | /a/,/b/                             (default: all)
//   CONTENT=sample | none | all                               (routes that also get content extraction; default sample)
//   CONCURRENCY=4   TEMPLATES=T17,T21 (optional filter)   FALLBACK=/an-unmatched-path/ (measure the 404 fallback template only)
//   node extraction/measure_sections.mjs > <output-file>.jsonl
//
// No absolute paths are stored here; the browser comes from the playwright package you point at.
// Output: one JSON object per line: {route, template, docHeightPx, theme, chrome, nodes:[{section, variant, topPx, heightPx,
// position, spaceBeforePx, aside, overlay, content?}], unmatchedRules:[...]}. The repo's builder copies the numbers into
// measured-values.json; wrapper_gate.py checks every route's node list against its template.
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const repo = join(here, '..')
const pw = await import(process.env.PLAYWRIGHT_MODULE || 'playwright')
const chromium = pw.chromium || pw.default.chromium
const base = process.env.BASE_URL || 'http://localhost:5210'
const smap = JSON.parse(readFileSync(join(repo, 'extraction/section-map.json'), 'utf8')).templates
let routes = JSON.parse(readFileSync(join(repo, 'routes/routes.json'), 'utf8')).routes
const byT = {}
for (const r of routes) (byT[r.template] ||= []).push(r.path)
const sample = new Set()
for (const ps of Object.values(byT)) {
  const pick = ps.length <= 3 ? ps : [ps[0], ps[Math.floor(ps.length / 2)], ps[ps.length - 1]]
  pick.forEach((p) => sample.add(p))
}
if (process.env.TEMPLATES) { const ts = new Set(process.env.TEMPLATES.split(',')); routes = routes.filter((r) => ts.has(r.template)) }
if (process.env.FALLBACK) {
  // FALLBACK=<unmatched path>: measure the router's catch-all (404) template on a path no route table matches
  const fb = JSON.parse(readFileSync(join(repo, 'routes/routes.json'), 'utf8')).fallback
  routes = [{ path: process.env.FALLBACK, template: fb.template }]
  sample.add(process.env.FALLBACK)
}
const R = process.env.ROUTES || 'all'
if (R === 'sample') routes = routes.filter((r) => sample.has(r.path))
else if (R !== 'all') { const want = new Set(R.split(',')); routes = routes.filter((r) => want.has(r.path)) }
const C = process.env.CONTENT || 'sample'
const wantContent = (p) => C === 'all' || (C === 'sample' && sample.has(p))

function inPage({ rules, content }) {
  const sy = window.scrollY
  const box = (el) => { const r = el.getBoundingClientRect(); return { top: r.top + sy, bottom: r.bottom + sy } }
  const vis = (el) => { const cs = getComputedStyle(el); const r = el.getBoundingClientRect(); return cs.display !== 'none' && cs.visibility !== 'hidden' && (r.width > 0 || r.height > 0) && !el.closest('[aria-hidden="true"]') }
  const T = (el) => (el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim()
  const SPACER = /(^|\s)(mk-spacer|co-sp|lsp|csp|t-sp|cmp-spacer|en-sp-inner|blog-post__spacer[\w-]*|blog-index__[\w-]*spacer[\w-]*)(\s|$)/
  const spacerBefore = (el) => { let p = el.previousElementSibling; let h = 0; while (p && SPACER.test(p.className || '')) { h += p.getBoundingClientRect().height; p = p.previousElementSibling } return Math.round(h) }
  const within = (els, sel) => { const out = []; for (const e of els) { if (e.matches(sel)) out.push(e); out.push(...e.querySelectorAll(sel)) } return [...new Set(out)] }
  const qsa = (sel) => [...document.querySelectorAll(sel)]
  const variantOf = (rule, els) => {
    for (const [css, v] of rule.vmap || []) if (els.some((e) => e.matches(css) || e.querySelector(css))) return v
    return rule.v || 'default'
  }
  const BLOCK = 'h1,h2,h3,h4,p,li,blockquote,img,figure,table,iframe,video,pre'
  function extract(els, rule) {
    const out = {}
    const itemsEls = rule.items ? within(els, rule.items).filter(vis) : []
    const inItem = (e) => itemsEls.some((it) => it !== e && it.contains(e))
    const head = within(els, 'h1,h2').filter((e) => vis(e) && !inItem(e))[0] || (rule.headingFromPrev && els[0].previousElementSibling && els[0].parentElement.querySelector(rule.headingFromPrev) && (() => { let p = els[0].previousElementSibling; while (p && !p.matches(rule.headingFromPrev)) p = p.previousElementSibling; return p })())
    if (head && T(head)) out.heading = T(head)
    const ps = within(els, 'p').filter((e) => vis(e) && !inItem(e) && !e.closest('a,button,li,blockquote') && T(e).split(' ').length >= 3)
    if (ps[0] && !rule.prose) out.lead = T(ps[0])
    const acts = within(els, 'a,button').filter((e) => vis(e) && !inItem(e) && T(e) && T(e).split(' ').length <= 8 && !e.closest('h1,h2,h3,nav.blog-crumb'))
    const seen = new Set()
    const actions = []
    for (const a of acts) { const l = T(a); if (seen.has(l) || actions.length >= 6) continue; seen.add(l); actions.push({ label: l, href: a.tagName === 'A' ? (a.getAttribute('href') || '#') : '#' }) }
    if (actions.length && !rule.prose) out.actions = actions
    if (itemsEls.length) {
      out.items = itemsEls.slice(0, 60).map((it) => {
        const o = {}
        const t = (rule.itemTitle && it.querySelector(rule.itemTitle)) || it.querySelector('h2,h3,h4,[class*=title],[class*=__q],[class*=qtext],[class*=label],[class*=name],strong') || it
        if (T(t)) o.title = T(t).slice(0, 400)
        const p = (rule.itemText && it.querySelector(rule.itemText)) || [...it.querySelectorAll('p')].find((x) => T(x) && T(x) !== o.title && (!o.title || !o.title.includes(T(x))))
        if (p) o.text = T(p).slice(0, 1200)
        const a = it.matches('a') ? it : it.querySelector('a')
        if (a && a.getAttribute('href')) o.href = a.getAttribute('href')
        const im = it.querySelector('img')
        if (im && im.getAttribute('src')) o.media = { ref: im.getAttribute('src'), alt: im.getAttribute('alt') || '' }
        return o
      })
    }
    const media = []
    for (const im of within(els, 'img,video,iframe')) {
      if (inItem(im) || media.length >= 16) continue
      const src = im.tagName === 'IFRAME' ? im.getAttribute('src') : (im.getAttribute('src') || im.getAttribute('poster') || (im.querySelector('source') || {}).src)
      if (!src) continue
      media.push({ ref: src, alt: im.getAttribute('alt') || im.getAttribute('title') || '', kind: im.tagName.toLowerCase(), hiddenAt1440: !vis(im) })
    }
    if (media.length) out.media = media
    const bq = within(els, 'blockquote').filter(vis)[0]
    if (bq && !rule.prose) out.quote = { text: T(bq) }
    if (rule.prose) {
      const blocks = []
      for (const b of within(els, BLOCK)) {
        if (!vis(b) || b.parentElement.closest(BLOCK) || blocks.length >= 400) continue
        const tag = b.tagName.toLowerCase()
        const kind = /h[1-4]/.test(tag) ? 'heading' : tag === 'p' ? 'paragraph' : tag === 'li' ? 'list-item' : tag === 'blockquote' ? 'quote' : tag === 'table' ? 'table' : tag === 'pre' ? 'code' : ['img', 'figure'].includes(tag) ? 'image' : 'embed'
        const o = { kind }
        if (['heading', 'paragraph', 'list-item', 'quote', 'code'].includes(kind)) o.text = T(b).slice(0, 4000)
        if (kind === 'table') o.text = `${b.querySelectorAll('tr').length} rows`
        if (kind === 'image') { const im = b.tagName === 'IMG' ? b : b.querySelector('img'); if (im) o.media = { ref: im.getAttribute('src'), alt: im.getAttribute('alt') || '' } }
        if (kind === 'embed') o.media = { ref: b.getAttribute('src') || b.getAttribute('poster') || '', alt: b.getAttribute('title') || '' }
        if (o.text === '') continue
        blocks.push(o)
      }
      if (blocks.length) out.body = blocks
    }
    return out
  }
  const nodes = []
  const unmatched = []
  rules.forEach((rule, i) => {
    const groups = []
    if (rule.virtual) {
      if (document.querySelector(rule.virtual)) groups.push({ els: [], overlay: true })
    } else if (rule.sel) {
      for (const el of qsa(rule.sel)) {
        if (!vis(el) && !rule.aside) continue
        const els = rule.pair && el.nextElementSibling ? [el, el.nextElementSibling] : [el]
        const b = els.map(box)
        groups.push({ els, top: Math.min(...b.map((x) => x.top)), bottom: Math.max(...b.map((x) => x.bottom)) })
      }
    } else if (rule.union) {
      const els = rule.union.flatMap(qsa).filter(vis)
      if (els.length) { const b = els.map(box); groups.push({ els, top: Math.min(...b.map((x) => x.top)), bottom: Math.max(...b.map((x) => x.bottom)) }) }
    } else if (rule.split) {
      const c = document.querySelector(rule.split.in)
      if (c && vis(c)) {
        const cb = box(c)
        const bounds = [...c.querySelectorAll(rule.split.at)].filter(vis)
        const tops = bounds.map((h) => box(h).top)
        const cuts = tops.length ? [cb.top, ...tops.slice(1), cb.bottom] : [cb.top, cb.bottom]
        const kids = [...c.querySelectorAll('*')].filter((e) => e.matches('h1,h2,h3,h4,p,li,blockquote,img,figure,table,iframe,video,pre,div,section,ul,ol'))
        for (let k = 0; k < cuts.length - 1; k++) {
          const lo = cuts[k], hi = cuts[k + 1]
          const els = kids.filter((e) => { const t = box(e).top; return t >= lo - 0.5 && t < hi - 0.5 && !e.parentElement.closest('h1,h2,h3,h4,p,li,blockquote,figure,table') })
          groups.push({ els: els.length ? els : [c], top: lo, bottom: hi })
        }
      }
    } else if (rule.groups) {
      const c = document.querySelector(rule.groups.in)
      if (c) {
        let cur = []
        const flush = () => { if (cur.length) { const b = cur.map(box); groups.push({ els: cur, top: Math.min(...b.map((x) => x.top)), bottom: Math.max(...b.map((x) => x.bottom)) }) } cur = [] }
        for (const k of c.querySelectorAll(rule.groups.child)) {
          if (k.querySelector(rule.groups.sep) || k.matches(rule.groups.sep)) flush(); else cur.push(k)
        }
        flush()
      }
    } else if (rule.years) {
      let cur = null
      for (const row of qsa(rule.years.rows)) {
        if (!vis(row)) continue
        const m = (T(row.querySelector(rule.years.date) || row).match(/\b(19|20)\d\d\b/) || [''])[0]
        if (!cur || cur.year !== m) { cur = { year: m, els: [] }; groups.push(cur) }
        cur.els.push(row)
      }
      for (const g of groups) { const b = g.els.map(box); g.top = Math.min(...b.map((x) => x.top)); g.bottom = Math.max(...b.map((x) => x.bottom)) }
    }
    if (!groups.length) { unmatched.push({ rule: i, section: rule.s }); return }
    for (const g of groups) {
      const n = { section: rule.s, variant: g.els.length ? variantOf(rule, g.els) : (rule.v || 'default'), rule: i }
      if (g.overlay) { n.overlay = true; n.topPx = null; n.heightPx = 0; n.position = 'fixed' }
      else {
        n.topPx = Math.round(g.top); n.heightPx = Math.round((g.bottom - g.top) * 10) / 10
        n.position = getComputedStyle(g.els[0]).position
        n.spaceBeforePx = rule.split || rule.groups || rule.years ? 0 : spacerBefore(g.els[0].closest('main > *') || g.els[0])
        if (rule.aside) n.aside = true
        if (rule.afterFooter) n.afterFooter = true
        if (g.year !== undefined) n.groupKey = g.year
      }
      if (content && g.els.length) n.content = extract(g.els, rule)
      nodes.push(n)
    }
  })
  nodes.sort((a, b) => (a.overlay ? 1e12 : a.topPx) - (b.overlay ? 1e12 : b.topPx) || a.rule - b.rule)
  // parallel columns (aside rules) are emitted together, in rule order, right before the first node of the section they run beside
  const asides = nodes.filter((n) => n.aside)
  if (asides.length) {
    const flow = nodes.filter((n) => !n.aside)
    asides.sort((a, b) => a.rule - b.rule || a.topPx - b.topPx)
    const target = rules[asides[0].rule].asideOf
    let at = flow.findIndex((n) => n.section === target)
    if (at < 0) at = flow.findIndex((n) => !n.overlay && n.topPx >= asides[0].topPx)
    if (at < 0) at = flow.length
    flow.splice(at, 0, ...asides)
    nodes.length = 0
    nodes.push(...flow)
  }
  const ban = document.querySelector('.banner')
  const nav = document.querySelector('nav.nav')
  const foot = document.querySelector('footer.site-footer')
  const chrome = {
    banner: !ban ? 'none' : ban.classList.contains('banner--legal') ? 'legal' : /gradient/.test(ban.getAttribute('style') || '') ? 'accent' : ban.classList.contains('banner--light') ? 'light' : 'default',
    nav: !nav ? 'none' : nav.classList.contains('nav--legal') ? 'legal' : nav.classList.contains('nav--light') ? 'light' : (nav.getAttribute('style') || '').includes('background') ? 'accent' : 'default',
    footer: !foot ? 'none' : foot.querySelector('.footer-band') ? 'cta-band' : foot.classList.contains('site-footer--light') ? 'light' : 'default',
    navSpacer: !!document.querySelector('.nav-spacer'),
  }
  const shell = {}
  if (ban) shell['shell.banner'] = { heightPx: Math.round(ban.getBoundingClientRect().height), position: getComputedStyle(ban).position, variant: chrome.banner }
  if (nav) shell['shell.navbar'] = { heightPx: Math.round(nav.getBoundingClientRect().height), position: getComputedStyle(nav).position, variant: chrome.nav, style: nav.getAttribute('style') || '' }
  if (foot) shell['shell.footer'] = { heightPx: Math.round(foot.getBoundingClientRect().height), position: getComputedStyle(foot).position, variant: chrome.footer }
  let shellContent = null
  if (content) {
    shellContent = {}
    if (foot && foot.querySelector('.footer-band h2')) shellContent.footerBandHeading = T(foot.querySelector('.footer-band h2'))
    if (ban) shellContent.bannerStyle = ban.getAttribute('style') || ''
  }
  const dupInline = document.querySelectorAll('section.inline-cta, section.co-pagecta, main section.cl-grid:has(> .cl-cta), section.t-grid:has(> .t-ctaf__col)').length
  return { docHeightPx: document.documentElement.scrollHeight, theme: document.documentElement.dataset.theme || 'dark', title: document.title, chrome, shell, shellContent, nodes, unmatchedRules: unmatched, inlineCtaBands: dupInline }
}

const browser = await chromium.launch()
const conc = Number(process.env.CONCURRENCY || 4)
const queue = [...routes]
async function worker() {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })
  while (queue.length) {
    const r = queue.shift()
    const rules = smap[r.template].rules
    let res
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        await page.goto(base + r.path, { waitUntil: 'networkidle', timeout: 60000 })
        await page.evaluate(async () => {
          for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise((s) => setTimeout(s, 25)) }
          window.scrollTo(0, 0)
        })
        await page.waitForTimeout(250)
        res = await page.evaluate(inPage, { rules, content: wantContent(r.path) })
        break
      } catch (e) { res = { error: String(e).slice(0, 300) } }
    }
    process.stdout.write(JSON.stringify({ route: r.path, template: r.template, viewport: 1440, ...res }) + '\n')
  }
  await page.close()
}
await Promise.all(Array.from({ length: conc }, worker))
await browser.close()
