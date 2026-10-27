import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

// Shared content components (specs/content-shared.md §4). Light variants only — these templates are light,
// except guides-index which uses none of these.

export function Spacer({ className }) {
  return <div className={`csp ${className}`} aria-hidden="true" />
}

// ---------- icons (content-assets.md: stroke 2, square caps, currentColor, 24x24) ----------
export function ArrowRight({ className }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 12h10z" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
      <path d="m12 7 5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    </svg>
  )
}
export function ChevronDown({ className }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m16 10-4 4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    </svg>
  )
}
// Breadcrumb "/" glyph: 24x24 svg, path 8x14 (stroke width not recorded).
function Slash() {
  return (
    <svg className="crumbs__slash" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M16 5 8 19" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}

// ---------- §4.5 Breadcrumb (light) ----------
// crumbs: [{text, href, mono?}] — the last one is the current page (rendered as a <button>).
export function Breadcrumb({ crumbs }) {
  const last = crumbs.length - 1
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      {crumbs.map((c, i) => (
        <span key={i} className="crumbs__item">
          {i > 0 && <Slash />}
          {i === last ? (
            <button type="button" className="crumbs__current">{c.text}</button>
          ) : (
            <Link to={c.href} className={i === 0 ? 'crumbs__link cmono' : 'crumbs__link crumbs__link--sans'}>{c.text}</Link>
          )}
        </span>
      ))}
    </nav>
  )
}

// ---------- §4.3 Meta table (light) ----------
// rows: [{label, values:[{text, href}]}]
export function MetaTable({ rows }) {
  if (!rows.length) return null
  return (
    <div className="meta">
      {rows.map((r) => (
        <div key={r.label}>
          <hr className="chr" />
          <div className="meta__row">
            <span className="meta__label cmono">{r.label}</span>
            <span className="meta__value cmono">
              {r.values.map((v, i) => (
                <span key={i}>
                  {i > 0 && ', '}
                  {v.href ? <Link to={v.href} className="meta__link">{v.text}</Link> : v.text}
                </span>
              ))}
            </span>
          </div>
        </div>
      ))}
      <hr className="chr" />
    </div>
  )
}

// ---------- §4.4 Share / Summarize with AI (light) ----------
const I14 = { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': true }
const stroke = { stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'square' }
// Glyphs are simplified stand-ins: the original icon paths weren't recorded (content-assets.md lists only the arrows/chevron).
const ICONS = {
  link: <svg {...I14}><path {...stroke} d="M10 14l4-4M8.5 11.5 6 14a3.5 3.5 0 0 0 5 5l2.5-2.5M15.5 12.5 18 10a3.5 3.5 0 0 0-5-5l-2.5 2.5" /></svg>,
  facebook: <svg {...I14}><path fill="currentColor" d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.5 1.6-1.5h1.7V4.4c-.3 0-1.3-.1-2.5-.1-2.4 0-4.1 1.5-4.1 4.2v2.3H7.5V14h2.7v8z" /></svg>,
  linkedin: <svg {...I14} viewBox="8.5 8.5 15 15"><path fill="currentColor" d="M12.136 22.985H9.233v-9.336h2.903zm-1.451-10.608a1.682 1.682 0 1 1-.006-3.364 1.682 1.682 0 0 1 .006 3.364M23 22.985h-2.9v-4.538c0-1.081-.018-2.476-1.508-2.476-1.51 0-1.738 1.18-1.738 2.4v4.614h-2.896v-9.336h2.781v1.276h.038c.386-.734 1.333-1.51 2.743-1.51 2.938 0 3.48 1.934 3.48 4.447z" /></svg>,
  x: <svg {...I14} viewBox="8.5 8.5 15 15"><path fill="currentColor" d="M20.026 9h2.147l-4.69 5.93L23 23h-4.32l-3.384-4.894L11.425 23H9.276l5.017-6.343L9 9h4.43l3.058 4.474zm-.754 12.578h1.19l-7.679-11.231h-1.276z" /></svg>,
  chatgpt: <svg {...I14}><circle {...stroke} cx="12" cy="12" r="8" /><path {...stroke} d="M12 4v16M5 8l14 8M5 16l14-8" /></svg>,
  claude: <svg {...I14}><path {...stroke} d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" /></svg>,
  perplexity: <svg {...I14}><path {...stroke} d="M12 3v18M5 8h14v8H5zM5 8l7-5 7 5" /></svg>,
  grok: <svg {...I14}><path {...stroke} d="M6 18 18 6M9 6h9v9" /></svg>,
}

export function ShareAi() {
  const [copied, setCopied] = useState('')
  const url = typeof window !== 'undefined' ? window.location.href : ''
  const u = encodeURIComponent(url)
  const prompt = encodeURIComponent(`Summarize this article: ${url}`)
  const copy = () => {
    navigator.clipboard?.writeText(url).then(() => setCopied('Link copied'), () => {})
  }
  // Share/AI destinations aren't recorded in the spec (SSR has href="#", wired in JS); standard intent URLs used.
  const shares = [
    ['Share on Facebook', 'facebook', `https://www.facebook.com/sharer/sharer.php?u=${u}`],
    ['Share on LinkedIn', 'linkedin', `https://www.linkedin.com/sharing/share-offsite/?url=${u}`],
    ['Share on X', 'x', `https://x.com/intent/post?url=${u}`],
  ]
  const ai = [
    ['ChatGPT', 'chatgpt', `https://chatgpt.com/?q=${prompt}`],
    ['Claude', 'claude', `https://claude.ai/new?q=${prompt}`],
    ['Perplexity', 'perplexity', `https://www.perplexity.ai/search?q=${prompt}`],
    ['Grok', 'grok', `https://grok.com/?q=${prompt}`],
  ]
  return (
    <div className="share">
      <div className="share__group">
        <h2 className="share__h">Share</h2>
        <div className="share__btns">
          <button type="button" className="share__btn" aria-label="Copy link" onClick={copy}>
            {ICONS.link}
            <span className="sr-only" aria-live="polite">{copied}</span>
          </button>
          {shares.map(([label, key, href]) => (
            <a key={key} className="share__btn" href={href} target="_blank" rel="noreferrer" aria-label={label}>{ICONS[key]}</a>
          ))}
        </div>
      </div>
      <div className="share__group">
        <h2 className="share__h">Summarize with AI</h2>
        <div className="share__btns">
          {ai.map(([label, key, href]) => (
            <a key={key} className="share__btn" href={href} target="_blank" rel="noreferrer" aria-label={`Summarize with ${label}`}>{ICONS[key]}</a>
          ))}
        </div>
      </div>
    </div>
  )
}

// ---------- §4.1 Rich text (light) ----------
export function RichText({ blocks }) {
  return (
    <div className="rt">
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'p': return <p key={i}>{b.text}</p>
          case 'h2': return <h2 key={i} id={b.id}>{b.text}</h2>
          case 'h3': return <h3 key={i} id={b.id}>{b.text}</h3>
          case 'ul': return <ul key={i}>{b.items.map((t, j) => <li key={j}>{t}</li>)}</ul>
          case 'ol': return <ol key={i}>{b.items.map((t, j) => <li key={j}>{t}</li>)}</ol>
          case 'blockquote': return <blockquote key={i}><p>{b.text}</p></blockquote>
          case 'table':
            return (
              <table key={i}>
                <thead><tr>{b.head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
                <tbody>{b.rows.map((r, j) => <tr key={j}>{r.map((c, k) => <td key={k}>{c}</td>)}</tr>)}</tbody>
              </table>
            )
          default: return null
        }
      })}
    </div>
  )
}

// ---------- Smooth scroll (guide TOC: ≈500ms, ease-in-out, heading top lands at 0) ----------
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)
export function smoothScrollToId(id, duration = 500) {
  const el = document.getElementById(id)
  if (!el) return
  const start = window.scrollY
  const target = el.getBoundingClientRect().top + start
  const t0 = performance.now()
  const step = (now) => {
    const t = Math.min(1, (now - t0) / duration)
    window.scrollTo(0, start + (target - start) * easeInOutCubic(t))
    if (t < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

export function TocList({ items, onPick, style, listRef }) {
  return (
    <ul className="toc" style={style} ref={listRef}>
      {items.map((it) => (
        <li key={it.id}>
          <button type="button" className="toc__btn" onClick={() => onPick(it.id)}>{it.text}</button>
        </li>
      ))}
    </ul>
  )
}

// ---------- Mobile "Contents" bottom sheet (guide-article.md item 4; ≤1280 only) ----------
export function ContentsSheet({ items }) {
  const [open, setOpen] = useState(false)
  const sheetRef = useRef(null)
  const listRef = useRef(null)
  const rafRef = useRef(0)

  useEffect(() => () => cancelAnimationFrame(rafRef.current), [])

  const animate = useCallback((opening) => {
    const sheet = sheetRef.current
    const list = listRef.current
    if (!sheet || !list) return
    cancelAnimationFrame(rafRef.current)
    const vh = window.innerHeight
    const from = sheet.getBoundingClientRect().top
    const to = opening ? Math.max(0, vh - 520) : vh - 64
    const t0 = performance.now()
    if (!opening) { list.style.opacity = '0'; sheet.style.overflow = 'hidden' }
    const step = (now) => {
      const ms = now - t0
      const k = Math.min(1, ms / 500)
      sheet.style.top = `${from + (to - from) * easeInOutCubic(k)}px`
      if (opening) list.style.opacity = String(Math.min(1, Math.max(0, (ms - 350) / 350)))
      if (k < 1 || (opening && ms < 700)) {
        rafRef.current = requestAnimationFrame(step)
      } else if (opening) {
        sheet.style.top = 'auto'
        sheet.style.overflow = 'auto'
      } else {
        sheet.style.top = ''
      }
    }
    rafRef.current = requestAnimationFrame(step)
  }, [])

  const toggle = () => {
    const next = !open
    setOpen(next)
    animate(next)
  }
  const pick = (id) => {
    setOpen(false)
    animate(false)
    smoothScrollToId(id)
  }

  return (
    <>
      <div className={`csheet-backdrop${open ? ' is-open' : ''}`} aria-hidden="true" />
      <div className="csheet" ref={sheetRef}>
        <button type="button" className="csheet__head" aria-expanded={open} onClick={toggle}>
          <span>Contents</span>
          <ChevronDown />
        </button>
        <div className="csheet__body">
          <TocList items={items} onPick={pick} listRef={listRef} style={{ opacity: 0 }} />
        </div>
      </div>
    </>
  )
}

// ---------- §4.7 Text carousel with draggable progress handle ----------
function trackWidths(n) {
  // Generalised from the recorded N=4 / N=8 widths (content-shared.md §4.7).
  return {
    '--n': n,
    '--w-lg': `calc(${n * 352 - 592}px + 560px + ((100vw - 1264px) / 2))`,
    '--w-md': `calc(min(${n * 50}%, ${n * 160}px) - ${96 + 32 * n}px)`,
    '--w-sm': `calc(min(${n * 100}%, ${n * 320}px) - ${48 * n - 48}px)`,
  }
}

export function TextCarousel({ items }) {
  const scrollerRef = useRef(null)
  const barRef = useRef(null)
  const [p, setP] = useState(0)
  const [barW, setBarW] = useState(0)

  const read = useCallback(() => {
    const s = scrollerRef.current
    if (!s) return
    const max = s.scrollWidth - s.clientWidth
    setP(max > 0 ? s.scrollLeft / max : 0)
  }, [])

  useLayoutEffect(() => {
    const bar = barRef.current
    if (!bar) return undefined
    const ro = new ResizeObserver(() => { setBarW(bar.getBoundingClientRect().width); read() })
    ro.observe(bar)
    return () => ro.disconnect()
  }, [read])

  const onPointerDown = (e) => {
    const s = scrollerRef.current
    const handle = e.currentTarget
    if (!s) return
    e.preventDefault()
    handle.setPointerCapture?.(e.pointerId)
    handle.style.cursor = 'grabbing'
    const startX = e.clientX
    const max = s.scrollWidth - s.clientWidth
    const startP = max > 0 ? s.scrollLeft / max : 0
    const range = Math.max(1, barW - 16)
    const move = (ev) => {
      const np = Math.min(1, Math.max(0, startP + (ev.clientX - startX) / range))
      s.scrollLeft = np * max
    }
    const up = () => {
      handle.style.cursor = 'grab'
      handle.removeEventListener('pointermove', move)
      handle.removeEventListener('pointerup', up)
      handle.removeEventListener('pointercancel', up)
    }
    handle.addEventListener('pointermove', move)
    handle.addEventListener('pointerup', up)
    handle.addEventListener('pointercancel', up)
  }

  return (
    <div className="ccar">
      <div className="ccar__block">
        <div className="ccar__fade" />
        <div className="ccar__scroller" ref={scrollerRef} onScroll={read}>
          <div style={{ paddingRight: 272 }}>
            <div className="ccar__grid" style={trackWidths(items.length)}>
              {items.map((it) => (
                <div key={it.href} className="ccar__item">
                  <Link to={it.href} className="ccar__title">{it.title}</Link>
                  <span className="ccar__date cmono">{it.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="ccar__progress">
        <div className="ccar__track" ref={barRef}>
          <div className="ccar__fill"><span style={{ width: `${p * 100}%` }} /></div>
          <div
            className="ccar__handle"
            onPointerDown={onPointerDown}
            style={{
              transform: `translate3d(${p * Math.max(0, barW - 16)}px, 0, 0)`,
              cursor: 'grab', touchAction: 'pan-y', userSelect: 'none',
            }}
          />
        </div>
      </div>
    </div>
  )
}

// ---------- §4.8 Related topics / Skills cloud ----------
export function TagCloud({ heading, headingAs: H = 'h2', items }) {
  return (
    <div className="tags">
      <div>
        <H className="tags__h cmono">{heading}</H>
        <hr className="chr" />
      </div>
      <div>
        {items.map((t) => (
          <Link key={t.href} to={t.href} className="tags__link cmono">[{t.text}]</Link>
        ))}
      </div>
    </div>
  )
}

// ---------- Editorial process box (contributors-index item 6; reused on profiles) ----------
export function EditorialBox({ data, body }) {
  return (
    <div className="ebox">
      <section className="cgrid">
        <div className="c-span-8">
          <h3 className="ebox__h">{data?.heading || 'About our editorial process'}</h3>
          <p className="ebox__p">
            {body[0]}
            <br />
            <br />
            {body[1]}
          </p>
        </div>
      </section>
    </div>
  )
}
