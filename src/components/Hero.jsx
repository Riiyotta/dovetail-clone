import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import AsciiField from './shared/AsciiField.jsx'
import '../styles/shared.css'
import '../styles/Hero.css'

// CLONE_SPEC.md §3 — Hero

const RATINGS = [
  { label: 'G2', href: 'https://www.g2.com/products/dovetail-research-pty-ltd-dovetail' },
  { label: 'Capterra', href: 'https://www.capterra.com.au/software/174077/dovetail' },
  { label: 'TrustRadius', href: 'https://www.trustradius.com/products/dovetail-user-research' },
]

// 17-item cycle; the first 10 are the initial order.
const LOGOS = ['amazon', 'toyota', 'canva', 'ford', 'notion', 'salesforce', 'dyson', 'milwaukee', 'shopify', 'wise',
  'mercedes-benz', 'volvo', 'kpmg', 'mckinsey-company', 'walgreens', 'aws', 'qantas']
const LOGO_NAMES = { amazon: 'Amazon', toyota: 'Toyota', canva: 'Canva', ford: 'Ford', notion: 'Notion', salesforce: 'Salesforce',
  dyson: 'Dyson', milwaukee: 'Milwaukee', shopify: 'Shopify', wise: 'Wise', 'mercedes-benz': 'Mercedes-Benz', volvo: 'Volvo',
  kpmg: 'KPMG', 'mckinsey-company': 'McKinsey & Company', walgreens: 'Walgreens', aws: 'AWS', qantas: 'Qantas' }

const CONVOS = [
  {
    twin: 'Customer Success Twin',
    q: 'Which accounts are at risk this quarter?',
    lines: ['Corvel Health. Their champion left in', 'August, and the new stakeholder has asked', 'about cost per seat on every call since. Get', 'their VP Product in the room before renewal.'],
    sources: '5 sources from Sales calls and Customer success',
  },
  {
    twin: 'Churned Customer Twin',
    q: 'Why did you really leave?',
    lines: ['It wasn’t price. Nobody outside our research', 'team ever logged in, so when budget review', 'came, no one could explain what we’d lose.'],
    sources: '7 sources from Exit interviews and Sales calls',
  },
  {
    twin: 'Product Expert Twin',
    q: 'Would you use automated tagging?',
    lines: ['Only if I can approve it. I’ve spent two years', 'building tags my team trusts. Suggest them,', 'show me why, and let me accept them in bulk.'],
    sources: '6 sources from Continuous research and Support',
  },
  {
    twin: 'Sales Expert Twin',
    q: 'How do we win against Fieldnote?',
    lines: ['Don’t compete on research features. We win', 'when Sales and Support join the first', 'demo—Fieldnote can’t show value outside', 'research. Bring a second team in early.'],
    sources: '9 sources from Sales calls, Support, and Win-loss',
  },
]

const WORD_START = 1750
const letters = (w) => (w.match(/\p{L}/gu) || []).length
const an = (w) => 70 + 20 * letters(w) + (w.endsWith(',') ? 100 : 0) + (w.endsWith('.') ? 170 : 0) + (w.includes('—') ? 80 : 0)

// Precompute per-word delay (--d) and caret duration (--caret); end = last word end.
const TIMED = CONVOS.map((c) => {
  let d = WORD_START
  const lines = c.lines.map((line) => line.split(' ').map((w) => {
    const item = { w, d, caret: an(w) }
    d += item.caret
    return item
  }))
  const end = d
  const talkCount = Math.max(1, Math.round((end - WORD_START) / 800))
  return { ...c, lines, end, talkCount, talkCycle: (end - WORD_START) / talkCount, total: end + 2600 }
})
const LEAVE_MS = 400

const prefersReduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function Icon({ src, className = '' }) {
  return <span className={`svg-icon ${className}`} style={{ '--icon': `url(${src})` }} />
}

/* ---------- Fax with pointer-following eyes ---------- */
const EYES = [{ left: '21.3%', top: '34.3%' }, { left: '56.3%', top: '37.7%' }]
const REST = { x: 0.2, y: 0.25 }

function Fax() {
  const eyeRefs = useRef([])
  const pupilRefs = useRef([])

  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches || prefersReduced()) return
    const cur = EYES.map(() => ({ ...REST }))
    const tgt = EYES.map(() => ({ ...REST }))
    let raf = 0
    const frame = () => {
      let moving = false
      cur.forEach((c, i) => {
        c.x += (tgt[i].x - c.x) * 0.25
        c.y += (tgt[i].y - c.y) * 0.25
        if (Math.abs(tgt[i].x - c.x) >= 0.002 || Math.abs(tgt[i].y - c.y) >= 0.002) moving = true
        const p = pupilRefs.current[i]
        if (p) p.style.transform = `translate(${42 * c.x}%, ${42 * c.y}%)`
      })
      raf = moving ? requestAnimationFrame(frame) : 0
    }
    const onMove = (e) => {
      eyeRefs.current.forEach((eye, i) => {
        if (!eye) return
        const r = eye.getBoundingClientRect()
        const dx = e.clientX - (r.left + r.width / 2)
        const dy = e.clientY - (r.top + r.height / 2)
        const dist = Math.hypot(dx, dy)
        const k = Math.min(1, dist / 240)
        tgt[i] = dist > 0 ? { x: (dx / dist) * k, y: (dy / dist) * k } : { x: 0, y: 0 }
      })
      if (!raf) raf = requestAnimationFrame(frame)
    }
    window.addEventListener('pointermove', onMove)
    return () => { window.removeEventListener('pointermove', onMove); cancelAnimationFrame(raf) }
  }, [])

  return (
    <span className="hero-fax" aria-hidden="true">
      <span className="hero-fax__box">
        <img className="hero-fax__img" src="/assets/home-hero-fax.png" alt="" width="564" height="600" />
        {EYES.map((pos, i) => (
          <span key={i} className="hero-eye" style={pos} ref={(el) => { eyeRefs.current[i] = el }}>
            <span className="hero-pupil" ref={(el) => { pupilRefs.current[i] = el }} style={{ transform: `translate(${42 * REST.x}%, ${42 * REST.y}%)` }} />
          </span>
        ))}
      </span>
    </span>
  )
}

/* ---------- Logo cycler ---------- */
function LogoRow() {
  const [slots, setSlots] = useState(() => LOGOS.slice(0, 10))
  const [hidden, setHidden] = useState(-1)
  const slotsRef = useRef(slots)
  slotsRef.current = slots

  useEffect(() => {
    if (prefersReduced()) return
    let a = 0
    let pointer = 10
    let swapTimer = 0
    const interval = setInterval(() => {
      const idx = a % 10
      a += 1
      setHidden(idx)
      swapTimer = setTimeout(() => {
        const shown = slotsRef.current
        let next = LOGOS[pointer % LOGOS.length]
        for (let n = 0; n < LOGOS.length && shown.includes(next); n++) {
          pointer += 1
          next = LOGOS[pointer % LOGOS.length]
        }
        pointer += 1
        setSlots((s) => s.map((l, i) => (i === idx ? next : l)))
        setHidden(-1)
      }, 350)
    }, 2200)
    return () => { clearInterval(interval); clearTimeout(swapTimer) }
  }, [])

  return (
    <div className="hero-logos">
      {slots.map((logo, i) => (
        <div key={i} className="hero-logos__slot" style={hidden === i ? { opacity: 0 } : undefined}>
          <img src={`/assets/svg/hero-logo-${logo}.svg`} alt={LOGO_NAMES[logo]} />
        </div>
      ))}
    </div>
  )
}

/* ---------- Digital Twin chat window ---------- */
function Conversation({ convo, leaving }) {
  const words = convo.lines.flat()
  const last = words[words.length - 1]
  return (
    <div
      className="hchat__inner"
      data-leaving={leaving ? '' : undefined}
      style={{ '--talk-count': convo.talkCount, '--talk-cycle': `${convo.talkCycle}ms`, '--src-d': `${convo.end + 250}ms` }}
    >
      <div className="hchat__header">
        <div className="hchat__title hchat__fadeable">
          <Icon src="/assets/svg/chat-twin-icon.svg" className="hchat__twin-icon" />
          <span className="hchat__twin-name">{convo.twin}</span>
        </div>
        <div className="hchat__actions">
          {['menu', 'history', 'close'].map((n) => (
            <span key={n} className="hchat__action"><Icon src={`/assets/svg/chat-header-${n}.svg`} className="hchat__action-icon" /></span>
          ))}
        </div>
      </div>

      <div className="hchat__body hchat__fadeable">
        <div className="hchat__q-row"><div className="hchat__q">{convo.q}</div></div>
        <div className="hchat__a">
          {convo.lines.map((line, li) => (
            <div key={li} className="hchat__line">
              {line.map((it, wi) => (
                <span key={wi}>
                  <span
                    className={`hchat__word${it === last ? ' hchat__word--last' : ''}`}
                    style={{ '--d': `${it.d}ms`, '--caret': `${it === last ? 1800 : it.caret}ms` }}
                  >{it.w}</span>
                  {wi < line.length - 1 ? ' ' : ''}
                </span>
              ))}
            </div>
          ))}
          <div className="hchat__sources">{convo.sources}</div>
        </div>
      </div>

      <div className="hchat__composer">
        <div className="hchat__glow"><div className="hchat__glow-talk"><img src="/assets/svg/chat-glow.svg" alt="" /></div></div>
        <div className="hchat__box-wrap">
          <div className="hchat__box">
            <div className="hchat__placeholder hchat__fadeable">Chat with {convo.twin}</div>
            <div className="hchat__toolbar">
              <span className="hchat__chip"><Icon src="/assets/svg/chat-tool-plus.svg" className="hchat__chip-icon" /></span>
              <div className="hchat__tools-right">
                <span className="hchat__chip"><Icon src="/assets/svg/chat-tool-sliders.svg" className="hchat__chip-icon" /></span>
                <span className="hchat__chip hchat__chip--agent"><Icon src="/assets/svg/chat-tool-agent-active.svg" className="hchat__chip-icon" /></span>
                <span className="hchat__chip"><Icon src="/assets/svg/chat-tool-square-chip.svg" className="hchat__chip-icon" /></span>
                <span className="hchat__chip"><Icon src="/assets/svg/chat-tool-sparkle.svg" className="hchat__chip-icon" /></span>
                <span className="hchat__stop"><Icon src="/assets/svg/chat-stop-square.svg" className="hchat__chip-icon" />Stop</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ChatWindow() {
  const ref = useRef(null)
  const [reduced] = useState(prefersReduced)
  const [playing, setPlaying] = useState(false)
  const [index, setIndex] = useState(0)
  const [cycle, setCycle] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const remaining = useRef(TIMED[0].total)

  useEffect(() => {
    if (reduced) return
    const io = new IntersectionObserver(([e]) => setPlaying(e.isIntersecting && e.intersectionRatio >= 0.4), { threshold: 0.4 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [reduced])

  // Phase timer that only advances while the window is intersecting.
  useEffect(() => {
    if (!playing || reduced) return
    const startedAt = performance.now()
    let fired = false
    const id = setTimeout(() => {
      fired = true
      if (!leaving) {
        remaining.current = LEAVE_MS
        setLeaving(true)
      } else {
        const next = (index + 1) % TIMED.length
        remaining.current = TIMED[next].total
        setLeaving(false)
        setIndex(next)
        setCycle((c) => c + 1)
      }
    }, remaining.current)
    return () => {
      clearTimeout(id)
      if (!fired) remaining.current = Math.max(0, remaining.current - (performance.now() - startedAt))
    }
  }, [playing, leaving, index, reduced])

  return (
    <div
      ref={ref}
      className="hchat"
      data-playing={playing ? '' : undefined}
      data-reduced={reduced ? '' : undefined}
      aria-hidden="true"
    >
      <Conversation key={cycle} convo={TIMED[index]} leaving={leaving} />
    </div>
  )
}

/* ---------- Hero ---------- */
export default function Hero() {
  const sectionRef = useRef(null)

  // --hero-top = Section 1's document top (used by its min-height).
  useLayoutEffect(() => {
    const el = sectionRef.current
    const set = () => el.style.setProperty('--hero-top', `${el.getBoundingClientRect().top + window.scrollY}px`)
    set()
    const ro = new ResizeObserver(set)
    ro.observe(document.body)
    window.addEventListener('resize', set)
    return () => { ro.disconnect(); window.removeEventListener('resize', set) }
  }, [])

  return (
    <div className="hero bg-bg">
      <AsciiField />

      <section ref={sectionRef} className="container hero-s1">
        <div className="hero-top">
          <div className="hero-intro" data-hero-text="">
            <p className="hero-intro__p text-text-muted">
              <span className="hero-intro__lead font-serif text-text-strong">The Customer Context Layer</span>
              {' '}turns sales calls, support tickets and interviews your teams already collect into the structured context that every agent reads before it acts.
            </p>
            <div className="cta-row">
              <a className="btn btn-primary" href="#">Book a demo</a>
              <a className="btn btn-glass" href="#">Start free trial</a>
            </div>
          </div>
          <div className="hero-ratings">
            {RATINGS.map((r) => (
              <a key={r.label} className="hero-rating" href={r.href} target="_blank" rel="noreferrer">
                <span className="hero-rating__stars">
                  {[0, 1, 2, 3].map((i) => <Icon key={i} src="/assets/svg/rating-star-full.svg" className="hero-rating__star text-white" />)}
                  <img className="hero-rating__star" src="/assets/svg/rating-star-half.svg" alt="" />
                </span>
                <span className="hero-rating__label mono-12">{r.label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="hero-bottom">
          <h1 className="hero-h1 text-text-strong" data-hero-text="">
            <span className="hero-h1__row">
              <span>Feed</span>
              <Fax />
              <span className="hero-h1__the">the</span>
            </span>
            <span className="hero-h1__row hero-h1__row--2">
              <span className="hero-h1__tf"><span className="hero-h1__the-mobile">the </span>facts</span>{' '}
              <span>machine</span>
            </span>
          </h1>
          <LogoRow />
        </div>
      </section>

      <section className="container hero-s2">
        <div className="hero-shot">
          <picture>
            <source media="(max-width: 799px)" srcSet="/assets/hero-image-bg-mobile.png" />
            <img className="hero-shot__img" src="/assets/hero-image-bg.png" alt="Dovetail product screenshot" width="2528" height="1140" />
          </picture>
          <ChatWindow />
        </div>
      </section>
    </div>
  )
}
