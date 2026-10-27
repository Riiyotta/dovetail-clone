import { useLayoutEffect, useRef } from 'react'
import AsciiField from './shared/AsciiField.jsx'
import { useChrome } from '../chrome.jsx'
import '../styles/FinalCta.css'

// CLONE_SPEC.md §10 "The best never guess".
// Rows, logo tiles and footer start at opacity 0 in CSS (as on the original) and are revealed in a layout
// effect, so nothing paints before the reveal decides their state.
//
// Original source (HeroBestNeverGuess, GSAP 3.11.3 via useGSAP = layout effect, once on mount):
//   if (skipIntro) gsap.set([...rows, ...tiles, footer], {opacity:1})   <- the homepage slice
//   else: gsap.set(tiles,{scale:.82}); timeline({defaults:{ease:"power2.out"}})
//         .to(rows,{opacity:1,duration:.35,stagger:.06})
//         .to(tiles,{opacity:1,scale:1,duration:.3,stagger:.04},"-=0.25")
//         .to(footer,{opacity:1,duration:.3},"-=0.2")
// The homepage's RunOnEvidenceCtaSlice renders it with skipIntro:true (measured live: all elements go
// 0 -> 1 in a single frame at hydration with inline style "opacity: 1;" and no scale). skipIntro therefore
// defaults to true; pass skipIntro={false} to get the timeline.

// gsap "power2.out" (= cubic ease-out)
const power2Out = (t) => 1 - (1 - t) ** 3

function buildTimeline(rows, tiles, footer) {
  const tweens = []
  let end = 0
  const add = (els, at, dur, stagger, apply) => {
    els.forEach((el, i) => tweens.push({ el, start: at + i * stagger, dur, apply }))
    end = Math.max(end, at + (els.length - 1) * stagger + dur)
  }
  const fade = (el, k) => { el.style.opacity = String(k) }
  const fadeScale = (el, k) => { el.style.opacity = String(k); el.style.transform = `scale(${0.82 + 0.18 * k})` }
  add(rows, 0, 0.35, 0.06, fade)
  add(tiles, end - 0.25, 0.3, 0.04, fadeScale)
  if (footer) add([footer], end - 0.2, 0.3, 0, fade)
  return { tweens, end }
}

function useIntro(scopeRef, skipIntro) {
  useLayoutEffect(() => {
    const scope = scopeRef.current
    if (!scope) return
    const rows = [...scope.querySelectorAll('[data-fcta-row]')]
    const tiles = [...scope.querySelectorAll('[data-fcta-logo]')].sort(
      (a, b) => Number(a.dataset.fctaLogo) - Number(b.dataset.fctaLogo),
    )
    const footer = scope.querySelector('[data-fcta-footer]')
    if (!rows.length) return
    const all = [...rows, ...tiles, footer].filter(Boolean)

    if (skipIntro) {
      all.forEach((el) => { el.style.opacity = '1' })
      return
    }

    tiles.forEach((el) => { el.style.transform = 'scale(0.82)' })
    const { tweens, end } = buildTimeline(rows, tiles, footer)
    let start = 0
    let raf = 0
    const frame = (now) => {
      if (!start) start = now
      const t = (now - start) / 1000
      tweens.forEach(({ el, start: s, dur, apply }) => {
        if (t >= s) apply(el, power2Out(Math.min(1, (t - s) / dur)))
      })
      if (t < end) raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      all.forEach((el) => { el.style.opacity = ''; el.style.transform = '' })
    }
  }, [scopeRef, skipIntro])
}

function Logo({ name, src, order }) {
  return (
    <span className={`fcta-logo fcta-logo-${name}`} data-fcta-logo={order}>
      <img src={src} alt="" />
    </span>
  )
}

export default function FinalCta({ skipIntro = true }) {
  const scopeRef = useRef(null)
  useIntro(scopeRef, skipIntro)
  // content-shared.md §2 "Light final CTA" (contributors pages): #FAFAFA bg, ink words, ASCII rgb "10, 10, 10".
  const light = useChrome().theme === 'light'
  return (
    <section className={light ? 'fcta fcta--light' : 'fcta'} ref={scopeRef}>
      {/* Original: the ASCII field sits inside a pointer-events:none mask wrapper, and the field attaches its
          mousemove/mouseleave listeners to its wrapper's parent, i.e. this mask div. That div never receives
          mouse events, so the CTA background has no cursor push (unlike the hero/quote cards). */}
      <div className="fcta-ascii-mask">
        {light ? <AsciiField rgb="10, 10, 10" /> : <AsciiField />}
      </div>
      <div className="fcta-section">
        <div className="fcta-fade" />
        <div className="fcta-centre">
          <h1 className="fcta-sr">The best never guess</h1>
          <div className="fcta-scale">
            <div className="fcta-words" aria-hidden="true">
              <div className="fcta-wrow" data-fcta-row>
                <p className="fcta-word fcta-word-the">
                  The
                  <Logo name="salesforce" src="/assets/svg/cta-logo-theright-salesforce.svg" order={6} />
                </p>
              </div>
              {/* As on the live page, the "best" logos sit inside the word <p> (positioned against it). */}
              <div className="fcta-wrow" data-fcta-row>
                <p className="fcta-word fcta-word-best">
                  <Logo name="aws" src="/assets/svg/cta-logo-bestfarleft-aws.svg" order={0} />
                  <Logo name="canva" src="/assets/svg/cta-logo-bestleft-canva.svg" order={1} />
                  <span className="fcta-word-text">best</span>
                  <Logo name="airwallex" src="/assets/svg/cta-logo-bestright-airwallex.svg" order={2} />
                </p>
              </div>
              <div className="fcta-wrow" data-fcta-row>
                <p className="fcta-word fcta-word-never">never</p>
                <Logo name="notion" src="/assets/svg/cta-logo-neverright-notion.svg" order={3} />
                <Logo name="zapier" src="/assets/svg/cta-logo-neverfarright-zapier.svg" order={7} />
              </div>
              <div className="fcta-wrow" data-fcta-row>
                <Logo name="wise" src="/assets/svg/cta-logo-guessleft-wise.svg" order={4} />
                <Logo name="breville" src="/assets/svg/cta-logo-guessfarleft-breville.svg" order={5} />
                <p className="fcta-word fcta-word-guess">guess</p>
              </div>
            </div>
          </div>
          <div className="fcta-footer" data-fcta-footer>
            <div className="cta-row fcta-ctas">
              <a href="#" className="btn btn-primary btn-lg">Book a demo</a>
              <a href="#" className={light ? 'btn btn-glass btn-lg fcta-glass--light' : 'btn btn-glass btn-lg'}>Start free trial</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
