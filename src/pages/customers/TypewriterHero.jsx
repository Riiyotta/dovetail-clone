import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import Icon from '../../components/company/Icon.jsx'
import Spacer from '../../components/company/Spacer.jsx'

// Customers index §1 — typewriter quote hero (specs/customers-index.md).
// typing (42ms/char, 260ms/icon) → holding 1800 → highlighting 450 (per-line #313131 rects) → blank 260 → next.
// Reduced motion: full quote, no caret, advance every 5000ms.
function tokensOf(quote) {
  const out = []
  quote.parts.forEach((p) => {
    if (p.icon) out.push({ icon: p.icon })
    else Array.from(p.text).forEach((ch) => out.push({ ch }))
  })
  return out
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setReduced(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return reduced
}

export default function TypewriterHero({ hero }) {
  const { quotes, icons, timing, eyebrow, tagline } = hero
  const tokenLists = useMemo(() => quotes.map(tokensOf), [quotes])
  const reduced = usePrefersReducedMotion()
  const [state, setState] = useState({ index: 0, phase: 'typing', count: 0 })
  const [rects, setRects] = useState([])
  const rootRef = useRef(null)
  const h1Ref = useRef(null)
  const typedRef = useRef(null)
  const n = quotes.length
  const tokens = tokenLists[state.index]

  // min-height: calc(100vh - header height); header = banner + nav above the hero.
  useLayoutEffect(() => {
    const el = rootRef.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    el.style.minHeight = `calc(100vh - ${Math.round(top)}px)`
  }, [])

  // Preload the icon images on mount.
  useEffect(() => {
    Object.values(icons).forEach(({ src }) => { const img = new Image(); img.src = src })
  }, [icons])

  // Phase machine.
  useEffect(() => {
    if (reduced) return undefined
    const { phase, count } = state
    let t
    if (phase === 'typing') {
      if (count < tokens.length) {
        t = setTimeout(() => setState((s) => ({ ...s, count: s.count + 1 })), tokens[count].icon ? timing.iconMs : timing.charMs)
      } else {
        setState((s) => ({ ...s, phase: 'holding' }))
      }
    } else if (phase === 'holding') {
      t = setTimeout(() => setState((s) => ({ ...s, phase: 'highlighting' })), timing.holdMs)
    } else if (phase === 'highlighting') {
      t = setTimeout(() => setState((s) => ({ ...s, phase: 'blank', count: 0 })), timing.highlightMs)
    } else if (phase === 'blank') {
      t = setTimeout(() => setState((s) => ({ index: (s.index + 1) % n, phase: 'typing', count: 0 })), timing.blankMs)
    }
    return () => clearTimeout(t)
  }, [state, tokens, timing, n, reduced])

  // Reduced motion: full quote, auto-advance every 5s.
  useEffect(() => {
    if (!reduced) return undefined
    const id = setInterval(() => setState((s) => ({ index: (s.index + 1) % n, phase: 'holding', count: 0 })), timing.reducedMotionIntervalMs)
    return () => clearInterval(id)
  }, [reduced, n, timing])

  // Highlight rects: Range.getClientRects over the typed text, merged per line, relative to the h1.
  useLayoutEffect(() => {
    if (state.phase !== 'highlighting' || !typedRef.current || !h1Ref.current) { setRects([]); return }
    const range = document.createRange()
    range.selectNodeContents(typedRef.current)
    const base = h1Ref.current.getBoundingClientRect()
    const lines = []
    Array.from(range.getClientRects()).forEach((r) => {
      if (r.width === 0 || r.height === 0) return
      const line = lines.find((l) => Math.abs(l.top - r.top) < r.height / 2 || (r.top < l.bottom && r.bottom > l.top && Math.abs((r.top + r.bottom) / 2 - (l.top + l.bottom) / 2) < r.height / 2))
      if (line) {
        line.left = Math.min(line.left, r.left); line.right = Math.max(line.right, r.right)
        line.top = Math.min(line.top, r.top); line.bottom = Math.max(line.bottom, r.bottom)
      } else lines.push({ left: r.left, right: r.right, top: r.top, bottom: r.bottom })
    })
    setRects(lines.map((l) => ({ left: l.left - base.left, top: l.top - base.top, width: l.right - l.left, height: l.bottom - l.top })))
  }, [state.phase, state.index])

  const go = (d) => setState((s) => ({ index: (s.index + d + n) % n, phase: reduced ? 'holding' : 'typing', count: 0 }))

  const shown = reduced ? tokens.length : state.count
  const visible = []
  let buf = ''
  tokens.slice(0, shown).forEach((tk, i) => {
    if (tk.ch !== undefined) { buf += tk.ch; return }
    if (buf) { visible.push(buf); buf = '' }
    const ic = icons[tk.icon]
    visible.push(
      <span
        key={`i${i}`}
        className="cu-icon"
        style={{ '--w-d': `${ic.wrapperWidth[0]}px`, '--w-md': `${ic.wrapperWidth[1]}px`, '--w-sm': `${ic.wrapperWidth[2]}px` }}
      >
        <img src={ic.src} alt="" />
      </span>,
    )
  })
  if (buf) visible.push(buf)
  const fullText = quotes[state.index].parts.map((p) => p.text || '').join('')
  const showCaret = !reduced && (state.phase === 'typing' || state.phase === 'holding')

  return (
    <section ref={rootRef} className="cu-hero">
      <Spacer size="hero" />
      <div className="co-container cu-hero__body">
        <div>
          <p className="cu-hero__eyebrow co-m14">{eyebrow}</p>
          <h1 ref={h1Ref} className="cu-hero__h1 co-h96">
            <span className="co-sr-only">{fullText}</span>
            <span className="cu-hero__hl" aria-hidden="true">
              {rects.map((r, i) => <span key={i} style={{ left: r.left, top: r.top, width: r.width, height: r.height }} />)}
            </span>
            <span className="cu-hero__typed" aria-hidden="true">
              <span ref={typedRef}>{visible}</span>
              {showCaret && <span className="cu-caret" />}
            </span>
          </h1>
        </div>
        <div className="cu-hero__row">
          <p className="cu-hero__tagline co-h32">{tagline.text} <span>{tagline.emphasis}</span></p>
          <div className="cu-hero__arrows">
            <button type="button" className="cu-arrow cu-arrow--prev" aria-label="Previous quote" onClick={() => go(-1)}>
              <Icon src="/assets/company/svg/arrow-pixel-39x32.svg" />
            </button>
            <button type="button" className="cu-arrow" aria-label="Next quote" onClick={() => go(1)}>
              <Icon src="/assets/company/svg/arrow-pixel-39x32.svg" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
