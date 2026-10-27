import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { usePageChrome } from '../../chrome.jsx'
import Button from '../../components/company/Button.jsx'
import Icon from '../../components/company/Icon.jsx'
import { copy, seedOf } from '../../components/company/text.js'
import { MetaTable, Spacer, TagCloud } from '../guides/components.jsx'
import Carousel from '../../components/company/Carousel.jsx'
import PageCta from '../../components/company/PageCta.jsx'
import { ctaButtons } from './Parts.jsx'
import '../../styles/guides/primitives.css'
import '../../styles/guides/content.css'
import '../../styles/guides/guide-article.css'
import '../../styles/company-pages/guide.css'

gsap.registerPlugin(CustomEase)
CustomEase.create('guide-nav-ease', 'M0,0 C0.5,0 0,1 1,1')

// /resources/{slug}/ comparison guides (light theme) — specs/resources-guide.md.
// Routes owned here: dovetail-review, insight7-alternatives. The four dovetail-vs-* pages are ToolsArticle (legal group).
// Reuses the guide-article styles + MetaTable / TagCloud / TextCarousel from src/pages/guides/. Built locally:
// breadcrumb (spec slash icon), share/summarize (real icon files + data hrefs), body renderer (company data schema)
// and the ≤1280 Contents drawer (0.5s cubic-bezier(.5,0,0,1) per spec; guides' ContentsSheet uses easeInOutCubic).

const loaders = import.meta.glob('../../data/company/resources/*.json', { import: 'default' })

const SVG = '/assets/company/svg'
const SHARE_ICONS = [
  [/copy/i, 'share-copy-link'], [/facebook/i, 'share-facebook'], [/linkedin/i, 'share-linkedin'], [/ on x$/i, 'share-x'],
  [/chatgpt/i, 'ai-chatgpt'], [/claude/i, 'ai-claude'], [/perplexity/i, 'ai-perplexity'], [/grok/i, 'ai-grok'],
]
const iconFor = (label) => (SHARE_ICONS.find(([re]) => re.test(label)) || [null, 'share-copy-link'])[1]

export const slugId = (s) => s.toLowerCase().replace(/[’'“”"]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

// ---------- rich text ----------
// Placeholder text with verbatim `strong` phrases interleaved (first one as the lead-in); phrases that also appear in
// `links` are rendered as inline links.
function Inline({ block, seed }) {
  if (block.text && !block.placeholder) return block.text
  const strongs = block.strong || []
  const links = block.links || []
  const used = strongs.reduce((n, s) => n + s.length + 1, 0)
  const words = copy({ placeholder: true, chars: Math.max(24, (block.chars || 40) - used) }, seed).split(' ')
  const phrase = (s, i) => {
    const l = links.find((x) => x.text === s)
    const inner = <strong>{s}</strong>
    return l ? <a key={`s${i}`} href={l.href}>{inner}</a> : <strong key={`s${i}`}>{s}</strong>
  }
  if (!strongs.length) return words.join(' ')
  const out = []
  const k = strongs.length
  strongs.forEach((s, i) => {
    const from = Math.floor((i * words.length) / k)
    const to = Math.floor(((i + 1) * words.length) / k)
    out.push(phrase(s, i), ` ${words.slice(from, to).join(' ')}${i < k - 1 ? ' ' : ''}`)
  })
  return out
}

const cell = (c, seed) => (typeof c === 'string' ? c : copy(c, seed))

function Body({ blocks, slug }) {
  let inFaq = false
  return (
    <div className="rt rg-rt">
      {blocks.map((b, i) => {
        const seed = seedOf(slug) + i
        if (b.t === 'h2') {
          inFaq = b.text === 'FAQs'
          return <h2 key={i} id={slugId(b.text)} className={inFaq ? 'rg-faq__h2' : undefined}>{b.text}</h2>
        }
        if (b.t === 'h3') return <h3 key={i} id={slugId(b.text)} className={inFaq ? 'rg-faq__h3' : undefined}>{b.text}</h3>
        if (b.t === 'p') return <p key={i}><Inline block={b} seed={seed} /></p>
        if (b.t === 'blockquote') return <blockquote key={i}><p>{copy(b, seed)}</p></blockquote>
        if (b.t === 'ul' || b.t === 'ol') {
          const L = b.t
          return <L key={i}>{b.items.map((it, j) => <li key={j}><Inline block={it} seed={seed + j} /></li>)}</L>
        }
        if (b.t === 'table') {
          return (
            <div key={i} className="rg-table">
              <table>
                <thead><tr>{b.head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
                <tbody>{b.rows.map((r, j) => <tr key={j}>{r.map((c, k) => <td key={k}>{cell(c, seed + j * 7 + k)}</td>)}</tr>)}</tbody>
              </table>
            </div>
          )
        }
        return null
      })}
    </div>
  )
}

// ---------- breadcrumb ----------
function Breadcrumb({ crumbs }) {
  const last = crumbs.length - 1
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      {crumbs.map((c, i) => (
        <span key={i} className="crumbs__item">
          {i > 0 && <Icon src={`${SVG}/icon-breadcrumb-slash.svg`} className="rg-crumbs__slash" />}
          {i === last
            ? <button type="button" className="crumbs__current">{c.label}</button>
            : <Link to={c.href} className="crumbs__link cmono">{c.label}</Link>}
        </span>
      ))}
    </nav>
  )
}

// ---------- share / summarize ----------
function ShareGroups({ groups }) {
  const [copied, setCopied] = useState('')
  return (
    <div className="share">
      {groups.map((g) => (
        <div className="share__group" key={g.heading}>
          <h2 className="share__h">{g.heading}</h2>
          <div className="share__btns">
            {g.links.map((l) => (l.href
              ? (
                <a key={l.label} className="share__btn" href={l.href} target="_blank" rel="noreferrer" aria-label={l.label}>
                  <Icon src={`${SVG}/${iconFor(l.label)}.svg`} className="rg-share__icon" />
                </a>
              ) : (
                <button
                  key={l.label}
                  type="button"
                  className="share__btn"
                  aria-label={l.label}
                  onClick={() => navigator.clipboard?.writeText(window.location.href).then(() => setCopied('Link copied'), () => {})}
                >
                  <Icon src={`${SVG}/${iconFor(l.label)}.svg`} className="rg-share__icon" />
                  <span className="co-sr-only" aria-live="polite">{copied}</span>
                </button>
              )))}
          </div>
        </div>
      ))}
    </div>
  )
}

function Toc({ items, onPick, listRef, style }) {
  return (
    <ul className="toc" ref={listRef} style={style}>
      {items.map((t) => (
        <li key={t}><button type="button" className="toc__btn" onClick={() => onPick(slugId(t))}>{t}</button></li>
      ))}
    </ul>
  )
}

const scrollToHeading = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

// ---------- ≤1280 Contents drawer ----------
function ContentsDrawer({ items }) {
  const [open, setOpen] = useState(false)
  const panelRef = useRef(null)
  const listRef = useRef(null)
  const tlRef = useRef(null)

  useEffect(() => () => tlRef.current?.kill(), [])

  const animate = useCallback((opening, after) => {
    const panel = panelRef.current
    const list = listRef.current
    if (!panel || !list) return
    tlRef.current?.kill()
    const vh = window.innerHeight
    const from = panel.getBoundingClientRect().top
    // top:"auto" equivalent: the panel's natural height, capped by max-height 520.
    const full = Math.min(520, panel.scrollHeight)
    const to = opening ? Math.max(0, vh - full) : vh - 64
    panel.style.overflow = 'hidden'
    const tl = gsap.timeline({
      onComplete() {
        if (opening) { panel.style.top = 'auto'; panel.style.overflow = 'auto' } else { panel.style.top = '' }
        after?.()
      },
    })
    tl.fromTo(panel, { top: from }, { top: to, duration: 0.5, ease: 'guide-nav-ease' })
    tl.to(list.children, { opacity: opening ? 1 : 0, duration: 0.4 }, '-=0.2')
    tlRef.current = tl
  }, [])

  const toggle = () => { const next = !open; setOpen(next); animate(next) }
  const pick = (id) => { setOpen(false); animate(false, () => scrollToHeading(id)) }

  return (
    <>
      <div className={`csheet-backdrop${open ? ' is-open' : ''}`} aria-hidden="true" />
      <div className="csheet rg-drawer" ref={panelRef}>
        <button type="button" className="csheet__head" aria-expanded={open} onClick={toggle}>
          <span>Contents</span>
          <Icon src={`${SVG}/icon-chevron-down-toc.svg`} className={`rg-drawer__chev${open ? ' is-open' : ''}`} />
        </button>
        <div className="csheet__body">
          <Toc items={items} onPick={pick} listRef={listRef} />
        </div>
      </div>
    </>
  )
}

// ---------- Related articles carousel (S8, light) ----------
// Track widths per spec for 5 items: calc(1096px + 50vw) / ≤1280 calc(-256px + min(250%, 800px)) / ≤799
// calc(-192px + min(500%, 1600px)); generalised to N items with the same per-item terms (9 items on these two pages).
// The data repeats some articles (recorded as-is), so items are keyed by index.
function RelatedCarousel({ items }) {
  const n = items.length
  const style = {
    '--n': n,
    '--w-lg': `calc(${n * 352 - 664}px + 50vw)`,
    '--w-md': `calc(min(${n * 50}%, ${n * 160}px) - ${96 + 32 * n}px)`,
    '--w-sm': `calc(min(${n * 100}%, ${n * 320}px) - ${48 * n - 48}px)`,
  }
  return (
    <Carousel theme="light" bg="var(--c-light-bg)" className="rg-car">
      <div className="ccar__grid" style={style}>
        {items.map((it, i) => (
          <div key={i} className="ccar__item">
            <Link to={it.href} className="ccar__title">{it.title}</Link>
            <span className="ccar__date cmono">{it.date}</span>
          </div>
        ))}
      </div>
    </Carousel>
  )
}

function useGuideData(slug) {
  const [data, setData] = useState(null)
  useEffect(() => {
    let live = true
    setData(null)
    loaders[`../../data/company/resources/${slug}.json`]?.().then((d) => { if (live) setData(d) })
    return () => { live = false }
  }, [slug])
  return data
}

export default function ResourcesGuide({ slug }) {
  usePageChrome({ theme: 'light' })
  const data = useGuideData(slug)
  useEffect(() => { if (data?.title) document.title = data.title }, [data])
  const metaRows = useMemo(() => (data?.meta || []).map(([label, value]) => ({ label, values: [{ text: value }] })), [data])
  if (!data) return <main className="ga co-main" />
  const topics = data.relatedTopics.map((t) => ({ text: t.label.replace(/^\[(.*)\]$/, '$1'), href: t.href }))
  return (
    <main className="ga co-main rg">
      <div className="ctitle">
        <section className="co-container">
          <Breadcrumb crumbs={data.breadcrumb} />
          <Spacer className="h-[32px]" />
          <h1 className="ctitle__h1">{data.h1}</h1>
        </section>
      </div>

      <div className="ga__body">
        <section className="co-grid rg-grid">
          <aside className="ga__aside rg-aside">
            <div className="ga__meta">
              <MetaTable rows={metaRows} />
            </div>
            <ShareGroups groups={data.share} />
            <Spacer className="h-[48px]" />
            <div className="ga__desktop">
              <Spacer className="h-[40px]" />
              <div className="ga-promo">
                <h2 className="ga-promo__h">{data.sidebarCta.heading}</h2>
                <p className="ga-promo__p">{data.sidebarCta.body}</p>
                <Button href={data.sidebarCta.button.href} variant="light-primary" className="rg-promo__btn">{data.sidebarCta.button.label}</Button>
              </div>
              <Spacer className="h-[40px]" />
              <hr className="chr" />
              <Spacer className="h-[40px]" />
              <h3 className="ga__contents-h">Contents</h3>
              <Toc items={data.toc} onPick={scrollToHeading} />
            </div>
          </aside>
          <div className="ga__content">
            <hr className="chr" />
            <Spacer className="h-[40px]" />
            <Body blocks={data.body} slug={slug} />
            <Spacer className="h-[80px]" />
            <TagCloud heading="Related topics" items={topics} />
          </div>
        </section>
      </div>

      <section className="co-container">
        <Spacer className="ga__sp-carousel" />
        <h2 className="ccar__h">Related articles↘</h2>
        <Spacer className="h-[40px]" />
        <RelatedCarousel items={data.relatedArticles} />
      </section>

      <PageCta heading={data.cta.heading} buttons={ctaButtons(data.cta.buttons)} theme="light" />
      <ContentsDrawer items={data.toc} />
    </main>
  )
}
