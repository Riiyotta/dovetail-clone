import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import '../../styles/company/components.css'

gsap.registerPlugin(Draggable, InertiaPlugin)

// Carousel — horizontal scroller with progress handle (company-shared.md S8).
// Props:
//   children        the scrolling content (lay it out yourself, e.g. a grid track inside)
//   bg              colour the 122px right fade blends into (default #0A0A0A via CSS)
//   theme           'dark' | 'light' (light track/handle colours)
//   progress        false hides the progress bar (S7 mobile related cards have none in the spec)
//   className, scrollerClassName
// Behaviour: scroll → fill width p*100% and handle x = p*trackWidth − 12 (gsap.set, no easing; formula as recorded).
// ≥1281 the scroller is drag-to-scroll (Draggable type:'scroll', inertia). The handle drags along the track.
export default function Carousel({ children, bg, theme = 'dark', progress = true, className = '', scrollerClassName = '' }) {
  const scrollerRef = useRef(null)
  const trackRef = useRef(null)
  const fillRef = useRef(null)
  const handleRef = useRef(null)

  useEffect(() => {
    const scroller = scrollerRef.current
    const track = trackRef.current
    if (!scroller) return undefined
    const sync = () => {
      if (!track) return
      const max = scroller.scrollWidth - scroller.clientWidth
      const p = max > 0 ? scroller.scrollLeft / max : 0
      gsap.set(fillRef.current, { width: `${p * 100}%` })
      gsap.set(handleRef.current, { x: p * track.clientWidth - 12 })
    }
    sync()
    scroller.addEventListener('scroll', sync, { passive: true })
    window.addEventListener('resize', sync)

    const draggables = []
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1281px)', () => {
      const [d] = Draggable.create(scroller, { type: 'scroll', inertia: true })
      return () => d.kill()
    })
    if (track && handleRef.current) {
      const [h] = Draggable.create(handleRef.current, {
        type: 'x',
        bounds: track,
        inertia: true,
        onDrag() { const max = scroller.scrollWidth - scroller.clientWidth; scroller.scrollLeft = (this.x / Math.max(1, track.clientWidth - 12)) * max },
        onThrowUpdate() { const max = scroller.scrollWidth - scroller.clientWidth; scroller.scrollLeft = (this.x / Math.max(1, track.clientWidth - 12)) * max },
      })
      draggables.push(h)
    }
    return () => {
      scroller.removeEventListener('scroll', sync)
      window.removeEventListener('resize', sync)
      draggables.forEach((d) => d.kill())
      mm.revert()
    }
  }, [])

  return (
    <div className={`co-carousel${theme === 'light' ? ' co-carousel--light' : ''} ${className}`.trim()} style={bg ? { '--co-carousel-bg': bg } : undefined}>
      <div style={{ position: 'relative' }}>
        <div className="co-carousel__fade" aria-hidden="true" />
        <div ref={scrollerRef} className={`co-carousel__scroller ${scrollerClassName}`.trim()}>{children}</div>
      </div>
      {progress && (
        <div className="co-carousel__progress">
          <div ref={trackRef} className="co-carousel__track">
            <div ref={fillRef} className="co-carousel__fill" />
            <div ref={handleRef} className="co-carousel__handle" />
          </div>
        </div>
      )}
    </div>
  )
}
