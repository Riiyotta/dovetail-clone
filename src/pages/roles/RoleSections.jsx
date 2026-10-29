import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Eyebrow, MaskIcon, MkButton, ctaProps, txt } from './common.jsx'
import { phLines } from '../../components/marketing/placeholder.js'
import GridImageBackground from '../../components/marketing/GridImageBackground.jsx'

const byRole = (content, role) => content.filter((c) => c.role === role)
const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ---------------------------------------------------------------- 1. RoleHero (roles.md §1) */

// Fixed slot pairs from source; the slots start on the first of each pair.
const LOGO_PAIRS = [
  [{ slug: 'notion', alt: 'Notion' }, { slug: 'wise', alt: 'Wise' }],
  [{ slug: 'salesforce', alt: 'Salesforce' }, { slug: 'aws', alt: 'AWS' }],
  [{ slug: 'toyota', alt: 'Toyota' }, { slug: 'zapier', alt: 'Zapier' }],
  [{ slug: 'shopify', alt: 'Shopify' }, { slug: 'amazon', alt: 'Amazon' }],
]
const SLOT_ORDER = [0, 2, 1, 3]
const logoSrc = (slug) => `/assets/marketing/customer-${slug}-white-logo.svg`

function LogoSwapper() {
  const [which, setWhich] = useState([0, 0, 0, 0]) // index into each pair
  const [hidden, setHidden] = useState([false, false, false, false])

  useEffect(() => {
    LOGO_PAIRS.flat().forEach(({ slug }) => { const i = new Image(); i.src = logoSrc(slug) })
    if (reducedMotion()) return undefined
    let step = 0
    const timers = []
    const id = setInterval(() => {
      const slot = SLOT_ORDER[step % SLOT_ORDER.length]
      step += 1
      setHidden((h) => h.map((v, i) => (i === slot ? true : v)))
      timers.push(setTimeout(() => {
        setWhich((w) => w.map((v, i) => (i === slot ? 1 - v : v)))
        requestAnimationFrame(() => setHidden((h) => h.map((v, i) => (i === slot ? false : v))))
      }, 350))
    }, 1800)
    return () => { clearInterval(id); timers.forEach(clearTimeout) }
  }, [])

  return (
    <div className="rh__logos">
      {LOGO_PAIRS.map((pair, i) => {
        const l = pair[which[i]]
        return (
          <img key={i} className={`rh__logo${hidden[i] ? ' is-hidden' : ''}`} src={logoSrc(l.slug)} alt={l.alt} />
        )
      })}
    </div>
  )
}

export function RoleHero({ section }) {
  const c = section.content
  const imgs = byRole(c, 'img')
  const desktop = imgs.find((i) => !i.hiddenAt1440 && i.el === 'eb5iodx2')
  const mobile = imgs.find((i) => i.hiddenAt1440)
  const eyebrow = c.find((i) => i.role === 'text')
  const h1 = c.find((i) => i.role === 'h1')
  return (
    <div className="rh">
      <picture className="rh__pic">
        <img className="rh__img" src={desktop?.src} alt="" />
      </picture>
      <div className="rh__overlay">
        <div className="mk-grid rh__grid">
          <div className="rh__text">
            <Eyebrow>{txt(eyebrow)}</Eyebrow>
            <h1 className="rh__h1">{txt(h1)}</h1>
          </div>
          <div className="rh__logos-col">
            <LogoSwapper />
          </div>
        </div>
      </div>
      {mobile && <img className="rh__mobile" src={mobile.src} alt="" />}
    </div>
  )
}

/* ---------------------------------------------------------------- 2. Challenge (roles.md §2) */

export function Challenge({ section, seed }) {
  const c = section.content
  const bg = c.find((i) => i.role === 'img')
  const texts = byRole(c, 'text')
  const eyebrow = texts[0]
  const body = txt(texts[1], seed)
  const links = byRole(c, 'link')
  const words = body.split(' ')
  return (
    <div className="mk-container">
      <GridImageBackground data={{ src: bg?.src, alt: bg?.alt, w: bg?.w, h: bg?.h }}>
        <div className="mk-grid ch__grid">
          <div className="ch__col">
            <Eyebrow>{txt(eyebrow)}</Eyebrow>
            <p className="mk-sr-only">{body}</p>
            {/* Word spans start at text.manifestoText; the scroll-scrub colouring is left for the animation pass. */}
            <p className="ch__p" aria-hidden="true" data-manifesto="true">
              {words.map((w, i) => (
                <span key={i}>
                  <span className="word">{w}</span>{i < words.length - 1 ? ' ' : ''}
                </span>
              ))}
            </p>
            <div className="ch__btns">
              {links.map((l, i) => (
                <MkButton key={i} variant={i === 0 ? 'primary' : 'secondary'} {...ctaProps(l)}>{l.text}</MkButton>
              ))}
            </div>
          </div>
        </div>
      </GridImageBackground>
    </div>
  )
}

/* ---------------------------------------------------------------- 3. How Dovetail helps (roles.md §3) */

export function HelpsHeader({ section }) {
  const c = section.content
  return (
    <div className="mk-grid">
      <div className="hh__col">
        <Eyebrow>{txt(c.find((i) => i.role === 'text'))}</Eyebrow>
        <h2 className="mk-h56 hh__h2">{txt(c.find((i) => i.role === 'h2'))}</h2>
      </div>
    </div>
  )
}

export function HelpsCards({ section, seed }) {
  const cards = []
  for (const item of section.content) {
    if (item.role === 'img') cards.push({ img: item })
    else if (item.role === 'h3') cards[cards.length - 1].h3 = item
    else if (item.role === 'text') cards[cards.length - 1].p = item
  }
  return (
    <div className="mk-container">
      <div className="hh__grid">
        {cards.map((card, i) => (
          <div key={i} className="hh__card">
            <img className="hh__img" src={card.img.src} alt={card.img.alt || ''} />
            <div className="hh__body">
              <h3 className="mk-h20">{txt(card.h3)}</h3>
              <p className="hh__p">{txt(card.p, seed + i)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- 3b. Prioritization (roles.md §3b) */

export function Prioritization({ section, seed }) {
  const c = section.content
  const eyebrow = c[0]
  const h2 = c.find((i) => i.role === 'h2')
  const h2Index = c.indexOf(h2)
  const intro = c[h2Index + 1] && c[h2Index + 1].el === 'exidxjs2' ? c[h2Index + 1] : null
  const steps = []
  for (const item of c) {
    if (item.el === 'exidxjs5') steps.push({ n: item })
    else if (item.el === 'exidxjs7') steps[steps.length - 1].h3 = item
    else if (item.el === 'exidxjs8') steps[steps.length - 1].p = item
  }
  return (
    <div className="mk-grid">
      <div className="pr__left">
        <Eyebrow>{txt(eyebrow)}</Eyebrow>
        <h2 className="mk-h56 pr__h2">{txt(h2)}</h2>
        {intro && <p className="pr__intro">{txt(intro, seed)}</p>}
      </div>
      <ol className="pr__list">
        {steps.map((s, i) => (
          <li key={i} className="pr__step">
            <span className="pr__num">{txt(s.n)}</span>
            <div className="pr__step-body">
              <h3 className="mk-h20">{txt(s.h3)}</h3>
              <p className="mk-p16 mk-p16--dim">{txt(s.p, seed + i + 1)}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

/* ---------------------------------------------------------------- 4. Integrations (roles.md §4) */

export function Integrations({ section, seed }) {
  const c = section.content
  const eyebrow = c[0]
  const h2 = c.find((i) => i.role === 'h2')
  const links = byRole(c, 'link')
  const ctas = links.filter((l) => l.el === 'a')
  const discover = links.find((l) => l.el === 'e1ttzgas13')
  const arrow = c.find((i) => i.role === 'svg')
  const items = []
  let pendingIcons = []
  for (const item of c) {
    if (item.el === 'e1ttzgas10') pendingIcons.push(item)
    else if (item.el === 'e1ttzgas11') { items.push({ icons: pendingIcons, name: item }); pendingIcons = [] }
    else if (item.el === 'e1ttzgas12') items[items.length - 1].desc = item
  }
  return (
    <div className="mk-grid in__grid">
      <div className="in__left">
        <Eyebrow>{txt(eyebrow)}</Eyebrow>
        <h2 className="mk-h56 in__h2">{txt(h2)}</h2>
        <div className="in__btns">
          {ctas.map((l, i) => (
            <MkButton key={i} variant={i === 0 ? 'primary' : 'secondary'} {...ctaProps(l)}>{l.text}</MkButton>
          ))}
        </div>
      </div>
      <div className="in__right">
        <ul className="in__list">
          {items.map((it, i) => (
            <li key={i} className="in__item">
              <hr className="in__hr" />
              <div className="in__block">
                <div className="in__row">
                  <div className="in__icons">
                    {it.icons.map((ic, j) => <img key={j} className="in__icon" src={ic.src} alt={ic.alt || ''} />)}
                  </div>
                  <span className="in__name">{txt(it.name)}</span>
                </div>
                <p className="mk-p16 mk-p16--dim" {...phLines(it.desc)}>{txt(it.desc, seed + i)}</p>
              </div>
            </li>
          ))}
        </ul>
        <hr className="in__hr" />
        {discover && (
          <a className="in__discover" href={discover.href} target="_blank" rel="noopener noreferrer">
            {discover.text}
            {arrow && <MaskIcon src={arrow.src} />}
          </a>
        )}
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- 5. Use-case tabs (roles.md §5) */

// useTabGroup(0, 60, false): progress +1 every 60ms → 6s per tab, wraps. Starts on first view,
// pauses while the card is hovered, and a click selects + stops auto-advance permanently.
function useTabGroup(count, stepMs, rootRef, hoverRef) {
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  const [started, setStarted] = useState(false)
  const [stopped, setStopped] = useState(false)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const el = rootRef.current
    if (!el || reducedMotion()) return undefined
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); io.disconnect() } })
    io.observe(el)
    return () => io.disconnect()
  }, [rootRef])

  useEffect(() => {
    const el = hoverRef.current
    if (!el) return undefined
    const on = () => setPaused(true)
    const off = () => setPaused(false)
    el.addEventListener('mouseenter', on)
    el.addEventListener('mouseleave', off)
    return () => { el.removeEventListener('mouseenter', on); el.removeEventListener('mouseleave', off) }
  }, [hoverRef])

  useEffect(() => {
    if (!started || stopped || paused) return undefined
    const id = setInterval(() => {
      setProgress((p) => {
        if (p + 1 >= 100) { setActive((a) => (a + 1) % count); return 0 }
        return p + 1
      })
    }, stepMs)
    return () => clearInterval(id)
  }, [started, stopped, paused, count, stepMs])

  const select = (i) => { setActive(i); setProgress(0); setStopped(true) }
  return { active, progress, select }
}

export function UseCaseTabs({ section, seed }) {
  const c = section.content
  const eyebrow = c[0]
  const h2 = c.find((i) => i.role === 'h2')
  const images = byRole(c, 'img')
  const tabs = byRole(c, 'button')
  const desc = c.find((i) => i.el === 'e1af4wr410')
  // Only the description of the captured (first) tab is in the data; the others get same-length placeholders.
  const descFor = (i) => (i === 0 ? txt(desc, seed) : placeholderLike(desc, seed + i))
  const rootRef = useRef(null)
  const cardRef = useRef(null)
  const { active, progress, select } = useTabGroup(tabs.length, 60, rootRef, cardRef)

  return (
    <div ref={rootRef}>
      <div className="mk-grid">
        <div className="hh__col">
          <Eyebrow>{txt(eyebrow)}</Eyebrow>
          <h2 className="mk-h56 hh__h2">{txt(h2)}</h2>
        </div>
      </div>
      <div className="mk-container">
        <div className="uc__card" ref={cardRef}>
          <div className="uc__media">
            {images.map((im, i) => (
              <img key={i} className={`uc__img${i === active ? ' is-active' : ''}`} src={im.src} alt={im.alt || ''} />
            ))}
          </div>
          <div className="uc__right">
            <div className="uc__tabs" role="tablist">
              {tabs.map((t, i) => (
                <button key={i} type="button" role="tab" aria-selected={i === active}
                  className={`uc__tab${i === active ? ' is-active' : ''}`} onClick={() => select(i)}>
                  {t.text}
                </button>
              ))}
            </div>
            <div className="uc__bottom">
              <p className="uc__desc">{descFor(active)}</p>
              <div className="uc__track"><div className="uc__fill" style={{ width: `${progress}%` }} /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function placeholderLike(item, seed) {
  if (!item) return ''
  const n = item.placeholder ? item.chars : (item.text || '').length
  return txt({ placeholder: true, chars: n }, seed)
}

/* ---------------------------------------------------------------- 7. Customer story cards (roles.md §7) */

const GRID = 7
const CELLS = Array.from({ length: GRID * GRID }, (_, i) => i)

function PixelThumb({ children }) {
  const cellsRef = useRef(null)
  const tween = useRef(null)
  const run = (display) => {
    if (!window.matchMedia('(min-width: 1281px)').matches) return
    const cells = cellsRef.current?.children
    if (!cells) return
    tween.current?.kill()
    tween.current = gsap.to(cells, { display, duration: 0, stagger: { each: 0.3 / 49, from: 'random' } })
  }
  useEffect(() => () => tween.current?.kill(), [])
  return (
    <div className="sc__pixwrap">
      <div className="sc__pix" onMouseEnter={() => run('block')} onMouseLeave={() => run('none')}>
        {children}
        <div className="sc__cells" ref={cellsRef} aria-hidden="true">
          {CELLS.map((i) => (
            <div key={i} className="sc__cell"
              style={{ left: `${-2 + (i % GRID) * 14.857}%`, top: `${-2 + Math.floor(i / GRID) * 14.857}%` }} />
          ))}
        </div>
      </div>
    </div>
  )
}

export function StoryCards({ section }) {
  const cards = []
  for (const item of section.content) {
    if (item.role === 'img' && !item.src.includes('white-logo')) cards.push({ image: item })
    else if (item.role === 'img') cards[cards.length - 1].logo = item
    else if (item.el === 'e1xybz5410') cards[cards.length - 1].title = item
  }
  return (
    <div className="mk-container">
      <div className="mk-basegrid">
        {cards.map((card, i) => {
          const href = card.title?.href
          return (
            <div key={i} className="sc__col">
              <div className="sc__card">
                <a className="sc__thumb" href={href}>
                  <PixelThumb>
                    <div className="sc__imgbox"><img src={card.image.src} alt={card.image.alt || ''} /></div>
                    {card.logo && (
                      <div className="sc__logo"><img src={card.logo.src} alt={card.logo.alt || ''} /></div>
                    )}
                    {/* Hover quote overlay (.e1xybz540): quote/name/title aren't in the data file, so it renders empty. */}
                    <div className="sc__overlay" aria-hidden="true" />
                  </PixelThumb>
                </a>
                {card.title?.text && (
                  <div className="sc__titlewrap">
                    <a className="sc__title" href={href}>{card.title.text}</a>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- 7b. Quiz promo (roles.md §7b) */

export function QuizPromo({ section }) {
  const c = section.content
  const texts = byRole(c, 'text')
  const h2 = c.find((i) => i.role === 'h2')
  const link = c.find((i) => i.role === 'link')
  return (
    <section className="qp">
      <div className="qp__box">
        <div className="qp__inner">
          <span className="qp__eyebrow">{txt(texts[0])}</span>
          <div className="qp__sp16" />
          <h2 className="qp__h2">{txt(h2)}</h2>
          <div className="qp__sp16" />
          <p className="qp__p">{txt(texts[1])}</p>
          <div className="qp__sp32" />
          <MkButton variant="secondary" href={link.href}>{link.text}</MkButton>
        </div>
      </div>
    </section>
  )
}
