import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import Icon from '../../components/company/Icon.jsx'
import '../../styles/company/base.css'
import '../../styles/company-pages/base.css'

// Page-level parts for src/pages/company/*. Everything else comes from src/components/company/.
// Local on purpose (noted in the handoff):
//  - RowList: careers job rows open in the SAME tab (careers.md §3); the shared RowList always opens http(s) hrefs
//    in a new tab.
//  - Rotator8: the S7 16-slot rotator WITH its CSS keyframes (the shared BestNeverGuess rotator is static and not
//    exported on its own).
//  - useMarqueeMotion: the S11 GSAP loop driving the shared <Marquee> tracks (the shared component ships structure only).

const SVG = '/assets/company/svg'

// ---------- S0.5 text link with arrow ----------
export function ArrowLink({ href, children }) {
  return (
    <a className="co-textlink" href={href}>
      {children}
      <svg className="co-textlink__arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6 12h10" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
        <path d="m12 7 5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
      </svg>
    </a>
  )
}

// ---------- S4 row list (same-tab links) ----------
// rows: [{ small, title, href }]
export function RowList({ rows }) {
  return (
    <div className="cp-rows">
      <hr className="cp-rows__hr" />
      {rows.map((r) => (
        <div key={`${r.href}-${r.small}`}>
          <a className="cp-row" href={r.href}>
            <span className="cp-row__grid">
              <span className="cp-row__small co-m14">
                <Icon src={`${SVG}/icon-row-arrow.svg`} className="cp-row__arrow" />
                {r.small}
              </span>
              <span className="cp-row__title co-h18">{r.title}</span>
            </span>
          </a>
          <hr className="cp-rows__hr" />
        </div>
      ))}
    </div>
  )
}

// ---------- S7 logo rotator (8 logos × 2 = 16 slots, rotator-8 16s ease-in-out infinite) ----------
const ROT8 = ['salesforce', 'aws', 'canva', 'airwallex', 'zapier', 'notion', 'itau', 'wise']
export function Rotator8() {
  const slots = [...ROT8, ...ROT8]
  return (
    <span className="cp-rot8" aria-hidden="true">
      <span className="cp-rot8__win">
        <span className="cp-rot8__col">
          {slots.map((n, i) => (
            <span className="cp-rot8__slot" key={i}><img src={`${SVG}/rotator-logo-${n}.svg`} alt="" /></span>
          ))}
        </span>
      </span>
    </span>
  )
}

// ---------- S11 marquee motion for the shared <Marquee> ----------
// For every .co-marquee__track under rootRef: gsap.to(track,{x:'-='+setWidth, duration:60, ease:'none', repeat:-1,
// modifiers:{x: wrap(-setWidth,0)}}); 'ltr' starts at -setWidth and moves right. Focus inside pauses (timeScale 1→0,
// 1s power2.out) and resumes (0→1, .5s power2.in). Reduced motion: paused.
export function useMarqueeMotion(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return undefined
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cleanups = Array.from(root.querySelectorAll('.co-marquee__track')).map((track) => {
      const set = track.querySelector('.co-marquee__set')
      const ltr = track.dataset.direction === 'ltr'
      const duration = Number(track.dataset.duration) || 60
      let tween = null
      let lastW = 0
      const build = () => {
        const w = set.offsetWidth
        if (!w || w === lastW) return
        lastW = w
        tween?.kill()
        const wrap = gsap.utils.wrap(-w, 0)
        gsap.set(track, { x: ltr ? -w : 0 })
        tween = gsap.to(track, {
          x: ltr ? `+=${w}` : `-=${w}`,
          duration,
          ease: 'none',
          repeat: -1,
          modifiers: { x: (x) => `${wrap(parseFloat(x))}px` },
        })
        if (reduce) tween.pause()
      }
      build()
      const ro = new ResizeObserver(build)
      ro.observe(set)
      const box = track.parentElement
      const pause = () => tween && gsap.to(tween, { timeScale: 0, duration: 1, ease: 'power2.out' })
      const resume = () => tween && !reduce && gsap.to(tween, { timeScale: 1, duration: 0.5, ease: 'power2.in' })
      box.addEventListener('focusin', pause)
      box.addEventListener('focusout', resume)
      return () => {
        ro.disconnect()
        box.removeEventListener('focusin', pause)
        box.removeEventListener('focusout', resume)
        tween?.kill()
      }
    })
    return () => cleanups.forEach((fn) => fn())
  }, [rootRef])
}

// Smooth scroll to an id with the careers offset (top − 120).
export function scrollToId(id, offset = 120) {
  const el = document.getElementById(id)
  if (!el) return
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' })
}

// Data CTA buttons ([{label, href}]) → shared PageCta buttons: first primary, rest secondary.
export const ctaButtons = (buttons) => buttons.map((b, i) => ({ ...b, variant: i === 0 ? 'primary' : 'secondary' }))
