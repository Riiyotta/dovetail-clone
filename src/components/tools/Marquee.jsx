import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import '../../styles/tools/tools-shared.css'

// specs/tools-shared.md §D "Marquee" — the item set rendered twice; GSAP moves one set-width per 60s.
// dir: 'ltr' | 'rtl'. Paused under prefers-reduced-motion; pauses while focus is inside the strip.
export default function Marquee({ dir = 'ltr', className = '', children }) {
  const stripRef = useRef(null)
  const setRef = useRef(null)

  useLayoutEffect(() => {
    const strip = stripRef.current
    const set = setRef.current
    if (!strip || !set) return undefined
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let tl = null
    let lastW = 0

    const build = () => {
      const w = set.offsetWidth
      if (!w || w === lastW) return
      lastW = w
      if (tl) tl.kill()
      gsap.set(strip, { x: 0 })
      tl = gsap.timeline({ repeat: -1 })
      if (dir === 'ltr') tl.set(strip, { x: -w })
      tl.to(strip, {
        x: dir === 'rtl' ? `-=${w}` : `+=${w}`,
        duration: 60,
        ease: 'none',
        repeat: -1,
        modifiers: { x: gsap.utils.unitize(gsap.utils.wrap(-w, 0)) },
      })
      if (reduce) tl.pause()
    }

    build()
    const ro = new ResizeObserver(build)
    ro.observe(set)
    const onIn = () => tl && tl.pause()
    const onOut = () => { if (tl && !reduce) tl.play() }
    strip.addEventListener('focusin', onIn)
    strip.addEventListener('focusout', onOut)
    return () => {
      ro.disconnect()
      strip.removeEventListener('focusin', onIn)
      strip.removeEventListener('focusout', onOut)
      if (tl) tl.kill()
      gsap.set(strip, { clearProps: 'transform' })
    }
  }, [dir])

  return (
    <div className={`t-marquee ${className}`.trim()}>
      <div ref={stripRef} className="t-marquee__strip">
        <div ref={setRef} className="t-marquee__set">{children}</div>
        <div className="t-marquee__set" aria-hidden="true" inert="">{children}</div>
      </div>
    </div>
  )
}
