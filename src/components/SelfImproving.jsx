import { useEffect, useRef, useState } from 'react'
import LoopGlobe from './loop/LoopGlobe.jsx'
import { STEPS } from './loop/steps.js'
import { activeStepFor, trackAngle } from './loop/globe.js'
import '../styles/SelfImproving.css'

// CLONE_SPEC.md §7 "Make your software self improving"
export default function SelfImproving() {
  const trackRef = useRef(null)
  const globeRef = useRef(null)
  const [active, setActive] = useState(0)

  // Scroll-driven ring + step activation: rAF-throttled scroll/resize, only while the track intersects.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let raf = 0
    let listening = false
    const update = () => {
      raf = 0
      const p = trackAngle(track.getBoundingClientRect(), window.innerHeight)
      globeRef.current?.setAngle(p)
      setActive(activeStepFor(p))
    }
    const schedule = () => { if (!raf) raf = requestAnimationFrame(update) }
    const listen = (on) => {
      if (on === listening) return
      listening = on
      const fn = on ? window.addEventListener : window.removeEventListener
      fn('scroll', schedule, { passive: true })
      fn('resize', schedule)
    }
    const io = new IntersectionObserver(([entry]) => {
      listen(entry.isIntersecting)
      schedule()
    })
    io.observe(track)
    return () => { io.disconnect(); listen(false); cancelAnimationFrame(raf) }
  }, [])

  return (
    <section className="loop-section bg-bg">
      <div className="container loop-header">
        <div className="loop-header-inner">
          <h2 className="loop-h2 text-text-strong">
            Make your <span className="loop-serif font-serif">software</span>
            <br />
            self{' '}
            <span className="loop-atom">
              <img src="/assets/home-loop-atom.svg" alt="" />
            </span>{' '}
            improving
          </h2>
          <p className="loop-intro text-text-strong">
            Every signal your customers share feeds a loop that keeps learning. Placeholder copy describes how feedback is turned into ranked work, shipped changes, and updates sent back out.
          </p>
          <div className="cta-row">
            <a href="#" className="btn btn-primary">Book a demo</a>
            <a href="#" className="btn btn-glass">Start free trial</a>
          </div>
        </div>
      </div>

      {/* Desktop: sticky globe track (hidden ≤1023) */}
      <div ref={trackRef} className="loop-track">
        <div className="loop-sticky">
          <LoopGlobe ref={globeRef} />
          <div className="loop-panel" aria-live="polite">
            {STEPS.map((s, i) => (
              <div key={s.num} className="loop-item" data-active={i === active || undefined} aria-hidden={i !== active}>
                <img className="loop-img" src={s.img} alt="" />
                <StepText step={s} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ≤1023: horizontal carousel */}
      <div className="loop-carousel">
        {STEPS.map((s) => (
          <div key={s.num} className="loop-card">
            <img className="loop-img" src={s.img} alt="" />
            <StepText step={s} />
          </div>
        ))}
      </div>
    </section>
  )
}

function StepText({ step }) {
  return (
    <div className="loop-text">
      <h3 className="loop-h3">
        <span className="loop-num font-serif text-blue">{step.num}</span>
        <span className="loop-title text-text-strong">{step.title}</span>
      </h3>
      <p className="loop-body text-text-muted">{step.body}</p>
    </div>
  )
}
