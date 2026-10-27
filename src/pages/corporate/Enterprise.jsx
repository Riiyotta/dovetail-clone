import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import data from '../../data/marketing/enterprise.json'
import { usePageChrome } from '../../chrome.jsx'
import FinalCta from '../../components/FinalCta.jsx'
import Spacer from '../../components/marketing/Spacer.jsx'
import ProgressTabs from '../../components/marketing/ProgressTabs.jsx'
import useTabGroup from '../../components/marketing/useTabGroup.js'
import { SmartLink, textOf } from '../../components/marketing/content.jsx'
import { placeholder } from '../../components/marketing/placeholder.js'
import CompactLogoSlice from '../../components/marketing/CompactLogoSlice.jsx'
import TestimonialSlice from '../../components/marketing/TestimonialSlice.jsx'
import CustomerStoriesSlice from '../../components/marketing/CustomerStoriesSlice.jsx'
import PixelTransitionSlice from '../../components/marketing/PixelTransitionSlice.jsx'
import { BaseHeading, GradientBanner, SectionBg, SecurityGrid, allIn, findIn, useDocTitle } from './common.jsx'
import '../../styles/corporate/enterprise.css'

// specs/enterprise.md — /enterprise/.

const links = (content) => allIn(content, (x) => x.role === 'link' && x.el === 'a')

// ---------------- §1 EnterpriseHero ----------------
function EnterpriseHero({ section }) {
  const c = section.content
  const img = findIn(c, (x) => x.role === 'img')
  return (
    <div className="mk-slicegrid">
      <div className="en-hero__text">
        <BaseHeading
          as="h1"
          eyebrow={findIn(c, (x) => x.role === 'text' && !x.placeholder)?.text}
          heading={findIn(c, (x) => x.role === 'h1').text}
          maxW={774}
          sub={findIn(c, (x) => x.placeholder)}
          subSeed={1}
          subMaxW={508}
          links={links(c)}
        />
      </div>
      <div className="en-hero__img">
        <img src={img.src} alt={img.alt} width="2528" height="1810" />
      </div>
    </div>
  )
}

// ---------------- §2 VerticalTabs ----------------
// useTabGroup(0, 40) with hover preview: hovering pauses and previews a tab, mouse-leave resumes; click or
// focus selects and stops auto-advance for good. (The shared useTabGroup has no pause, hence this variant.)
function usePreviewTabs(count, stepMs, rootRef) {
  const [state, setState] = useState({ index: 0, progress: 0 })
  const [hover, setHover] = useState(null)
  const [running, setRunning] = useState(false)
  const stopped = useRef(false)

  useEffect(() => {
    const el = rootRef.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const io = new IntersectionObserver((es) => {
      if (es.some((e) => e.isIntersecting)) { if (!stopped.current) setRunning(true); io.disconnect() }
    })
    io.observe(el)
    return () => io.disconnect()
  }, [rootRef])

  useEffect(() => {
    if (!running || hover !== null) return undefined
    const id = setInterval(() => {
      setState((s) => (s.progress + 1 >= 100 ? { index: (s.index + 1) % count, progress: 0 } : { ...s, progress: s.progress + 1 }))
    }, stepMs)
    return () => clearInterval(id)
  }, [running, hover, stepMs, count])

  const select = useCallback((i) => {
    stopped.current = true
    setRunning(false)
    setState({ index: i, progress: 0 })
  }, [])

  return { ...state, hover, setHover, select }
}

function VerticalTabs({ section }) {
  const c = section.content
  const rootRef = useRef(null)
  const listRef = useRef(null)
  const imgs = allIn(c, (x) => x.role === 'img')
  const titles = allIn(c, (x) => x.role === 'h3').map((x) => x.text)
  // Only the description of the tab that was active at capture is in the data (one sentence each per the
  // spec); the other three are neutral placeholders of the same length.
  const known = findIn(c, (x) => x.el === 'etikis34')
  const knownIdx = c.indexOf(known)
  const descs = titles.map((t, i) => {
    const h3 = c.findIndex((x) => x.role === 'h3' && x.text === t)
    return h3 + 1 === knownIdx ? known.text : placeholder(known.text.length, i + 3)
  })

  const { index, progress, hover, setHover, select } = usePreviewTabs(titles.length, 40, rootRef)
  const shown = hover ?? index

  // Rail geometry from the tab rects (recomputed on resize and whenever the open description changes).
  const [geo, setGeo] = useState({ tops: [] })
  useLayoutEffect(() => {
    const measure = () => {
      const tabs = listRef.current ? [...listRef.current.querySelectorAll('.en-tab')] : []
      setGeo({ tops: tabs.map((t) => t.offsetTop) })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [shown])
  const t = geo.tops
  const first = t[0] ?? 0
  const trackH = t.length ? t[t.length - 1] - first + 5 : 0
  const fillH = t.length ? (t[index] ?? first) - first + 5 : 0
  const seg = t[index + 1] != null ? t[index + 1] - t[index] : 0
  const progH = fillH + (progress / 70) * seg

  return (
    <div className="mk-container" ref={rootRef}>
      <BaseHeading
        heading={findIn(c, (x) => x.role === 'h2').text}
        maxW={726}
        sub={findIn(c, (x) => x.el === 'e18o1u1v4')}
        subMaxW={620}
        links={links(c)}
      />
      <div className="en-vt__sp" />
      <div className="mk-innergrid en-vt__grid">
        <div className="en-vt__tabs">
          <div className="en-vt__box">
            <div className="en-vt__rail" aria-hidden="true">
              <div className="en-vt__track" style={{ height: trackH }} />
              <div className="en-vt__fill" style={{ height: fillH }} />
              <div className="en-vt__prog" style={{ height: progH }} />
            </div>
            <div className="en-vt__list" role="tablist" aria-orientation="vertical" ref={listRef}>
              {titles.map((title, i) => {
                const on = i === shown
                return (
                  <div key={title} className="en-tab" data-active={on ? 'true' : undefined}>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={i === index}
                      className="en-tab__btn"
                      onMouseEnter={() => setHover(i)}
                      onMouseLeave={() => setHover(null)}
                      onClick={() => select(i)}
                      onFocus={() => select(i)}
                    >
                      <div className="en-tab__marker" data-lit={i <= index || i === hover ? 'true' : undefined} />
                      <div>
                        <h3 className="en-tab__title" data-on={on ? 'true' : undefined}>{title}</h3>
                        <p className="en-tab__desc" data-on={on ? 'true' : undefined}>{descs[i]}</p>
                      </div>
                    </button>
                  </div>
                )
              })}
            </div>
            <div className="en-vt__mdline" aria-hidden="true">
              <div className="en-vt__mdtrack" />
              <div className="en-vt__mdfill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
        <div className="en-vt__images">
          {imgs.map((img, i) => (
            <div key={img.src} className={`en-vt__panel${i === 0 ? ' en-vt__panel--first' : ''}`} data-on={i === shown ? 'true' : undefined}>
              <img src={img.src} alt={img.alt} width="1448" height="1400" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ---------------- §3 ROI map ----------------
const HOTSPOTS = [
  { top: 'calc(50% - 50px)', left: 'calc(50% - 182px)' },
  { top: 'calc(50% - 86px)', left: 'calc(50% + 38px)' },
  { top: 'calc(50% - 86px)', left: 'calc(50% + 118px)' },
  { top: 'calc(50% - 251px)', left: 'calc(50% + 191px)' },
]

function StatCard({ stat, className = '' }) {
  return (
    <div className={`en-stat ${className}`}>
      <p className="co-m14 text-text-dim en-stat__eyebrow">{stat.eyebrow}</p>
      <p className="en-stat__num">{stat.num}</p>
      <div className="en-stat__head">{stat.head}</div>
      <p className="co-p16 text-text-dim">{stat.body}</p>
    </div>
  )
}

// 3x3 dashed cells; one 10x10 square at every grid intersection (top-left of each cell, plus the right
// column's right corners and the bottom row's bottom corners).
function DashedGrid() {
  return (
    <div className="en-roi__grid" aria-hidden="true">
      {[0, 1, 2].map((col) => (
        <div key={col} className="en-roi__gcol">
          {[0, 1, 2].map((row) => (
            <div key={row} className="en-roi__gcell">
              <div className="en-roi__corner en-roi__corner--tl" />
              {col === 2 && <div className="en-roi__corner en-roi__corner--tr" />}
              {col === 2 && row === 2 && <div className="en-roi__corner en-roi__corner--br" />}
              {row === 2 && <div className="en-roi__corner en-roi__corner--bl" />}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

function RoiMap({ section }) {
  const c = section.content
  const rootRef = useRef(null)
  const stats = []
  c.forEach((x, i) => {
    if (x.el === 'e1ml9unk0.etfyu4r0' && !x.hiddenAt1440) {
      stats.push({ eyebrow: x.text, num: c[i + 1].text, head: c[i + 2].text, body: c[i + 3].text })
    }
  })
  const { index, progress, select } = useTabGroup(stats.length, 70, rootRef)
  const labels = stats.map((_, i) => String(i + 1).padStart(2, '0'))
  const lineSvg = findIn(c, (x) => x.role === 'svg' && x.w === 1424)
  const h2 = findIn(c, (x) => x.role === 'h2')
  const want = findIn(c, (x) => x.el === 'ev8np7u5')
  const tei = findIn(c, (x) => x.el === 'ev8np7u6')
  const tail = 'across the product lifecycle.'
  const pays = findIn(c, (x) => x.el === 'eycheoc1').text

  return (
    <section className="en-roi" ref={rootRef}>
      <DashedGrid />
      <div className="en-roi__line" aria-hidden="true">
        <img className="en-roi__line-svg" src={lineSvg.src} alt="" width="1424" height="663" />
      </div>
      <GradientBanner className="en-roi__fade en-roi__fade--top" />
      <GradientBanner className="en-roi__fade en-roi__fade--bottom300" />
      <GradientBanner className="en-roi__fade en-roi__fade--left" />
      <GradientBanner className="en-roi__fade en-roi__fade--rot" />
      <GradientBanner className="en-roi__fade en-roi__fade--right" />
      <GradientBanner className="en-roi__fade en-roi__fade--bottom600" />

      <div className="en-roi__hotspots">
        {HOTSPOTS.map((pos, i) => {
          const on = i === index
          return (
            <div key={i} className="en-hot" style={pos} data-on={on ? 'true' : undefined}>
              <div className="en-hot__pop">
                <StatCard stat={stats[i]} className="en-hot__card" />
                <div className="en-hot__conn">
                  {/* svg/ev8np7u11-e17gze030-822842.svg inlined so it takes currentColor and the path can be
                      stroke-dash animated (enterprise.md §3). Rendered in its drawn state. */}
                  <svg width="132" height="62" viewBox="0 0 132 62" fill="none" aria-hidden="true">
                    <path className="en-hot__path" d="M6 6.5L82.5 6.5L132 56" stroke="currentColor" />
                    <path d="M0 11.8154L-5.16467e-07 4.57764e-05L11.8154 4.52599e-05L11.8154 11.8154L0 11.8154Z" fill="currentColor" />
                  </svg>
                </div>
              </div>
              <button type="button" className="en-hot__btn" aria-label={stats[i].eyebrow} onClick={() => select(i)}>
                <div className="en-hot__l2"><div className="en-hot__l3"><div className="en-hot__l4" /></div></div>
              </button>
            </div>
          )
        })}
      </div>

      <div className="en-roi__stack">
        <ProgressTabs labels={labels} index={index} progress={progress} onSelect={select} />
        {stats.map((s, i) => <StatCard key={i} stat={s} className={`en-roi__stackcard${i === index ? ' is-on' : ''}`} />)}
      </div>

      <ProgressTabs labels={labels} index={index} progress={progress} onSelect={select} className="en-roi__tabs" />

      <div className="en-roi__copy">
        <h2 className="en-roi__h2">{h2.text}</h2>
        <p className="en-roi__pays">
          {' '}{pays.endsWith(tail) ? pays.slice(0, -tail.length) : pays}
          {pays.endsWith(tail) && <span className="en-roi__nowrap">{tail}</span>}
        </p>
        <div className="en-roi__sp64" />
        <p className="en-roi__want">{want.text}</p>
        <div className="co-h16">
          <SmartLink href={tei.href} className="en-roi__tei">{tei.text}</SmartLink>
        </div>
      </div>
    </section>
  )
}

// ---------------- §4 Integrations ----------------
function FeatureCard({ img, title, body, variant, textMax, seed }) {
  return (
    <div className={`en-fc en-fc--${variant}`}>
      <div className="en-fc__media"><img src={img.src} alt={img.alt} width={img.w} height={img.h} loading="lazy" /></div>
      <div className="en-fc__text" style={{ '--tmax': `${textMax}px` }}>
        <h3 className="en-fc__title">{title}</h3>
        <p className="co-p16 text-text-dim en-fc__body">{textOf(body, seed)}</p>
      </div>
    </div>
  )
}

function Integrations({ section }) {
  const c = section.content
  const bg = findIn(c, (x) => x.el === 'e1jvfgez2')
  const cards = []
  c.forEach((x, i) => {
    if (x.role === 'img' && x.el === 'img') cards.push({ img: x, title: c[i + 1].text, body: c[i + 2] })
  })
  const TEXT_MAX = [380, 336, 354]
  return (
    <SectionBg src={bg.src} innerClassName="en-int__inner">
      <div className="mk-container">
        <div className="mk-innergrid">
          <div className="en-int__head">
            <BaseHeading
              heading={findIn(c, (x) => x.role === 'h2').text}
              maxW={871}
              sub={findIn(c, (x) => x.el === 'e18o1u1v4')}
              subMaxW={800}
              links={links(c)}
            />
          </div>
        </div>
        <div className="en-sp-inner" />
        <div className="mk-innergrid">
          {cards.map((card, i) => (
            <div key={card.title} className={i === 0 ? 'en-int__full' : 'en-int__half'}>
              <FeatureCard {...card} variant={i === 0 ? 'h' : 'v'} textMax={TEXT_MAX[i]} seed={i + 5} />
            </div>
          ))}
        </div>
      </div>
    </SectionBg>
  )
}

// ---------------- §6 Resources ----------------
const DOWNLOAD = '/assets/marketing/svg/e18o1u1v1-337434.svg'
function Resources({ section }) {
  const c = section.content
  const rows = []
  c.forEach((x, i) => {
    if (x.role === 'h3') {
      const link = c[i - 1]
      const icon = c[i + 1]?.role === 'svg'
      const body = c[icon ? i + 2 : i + 1]
      rows.push({ href: link.href, title: x.text, icon, body })
    }
  })
  return (
    <div className="mk-slicegrid en-res">
      <div className="en-res__left">
        <BaseHeading
          heading={findIn(c, (x) => x.role === 'h2').text}
          sub={findIn(c, (x) => x.el === 'e18o1u1v4')}
          links={links(c)}
        />
      </div>
      <div className="en-res__right">
        {rows.map((r, i) => (
          <div key={r.title} className="en-res__row">
            <SmartLink href={r.href} className="en-res__link">
              <h3 className="en-res__title">
                {r.title}
                {r.icon && <span className="en-res__chip"><img src={DOWNLOAD} alt="" width="24" height="24" /></span>}
              </h3>
            </SmartLink>
            <p className="co-p16 text-text-dim">{textOf(r.body, i + 11)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Enterprise() {
  usePageChrome({ footer: 'default', navSpacer: false })
  useDocTitle(data.title)
  const s = data.sections
  const by = (slice) => s.find((x) => x.slice === slice)
  const bands = s.filter((x) => x.slice === 'PixelBand')
  const sp = (i) => <Spacer data={s[i]} />
  // Section indices follow the data file order (see enterprise.md §0).
  return (
    <>
    <main>
      {sp(0)}
      <EnterpriseHero section={by('EnterpriseHero')} />
      {sp(2)}
      <CompactLogoSlice data={by('CompactLogo')} />
      {sp(4)}
      <VerticalTabs section={by('BaseHeading')} />
      {sp(6)}
      <RoiMap section={by('RoiMap')} />
      {sp(8)}
      <Integrations section={by('FeatureCardGrid')} />
      {sp(10)}
      <TestimonialSlice data={by('TestimonialSlice')} />
      {sp(12)}
      {/* PixelTransition▼ [Security + Spacer], PixelTransition▲ [Spacer + Resources] (enterprise.md §0) */}
      <PixelTransitionSlice data={bands[0]} position="bottom">
        <SecurityGrid section={by('SecurityAndCompliance')} />
        {sp(14)}
      </PixelTransitionSlice>
      <CustomerStoriesSlice data={by('CustomerStories')} />
      <PixelTransitionSlice data={bands[1]} position="top">
        {sp(18)}
        <Resources section={by('Resources')} />
      </PixelTransitionSlice>
      {sp(20)}
    </main>
    <FinalCta />
    </>
  )
}
