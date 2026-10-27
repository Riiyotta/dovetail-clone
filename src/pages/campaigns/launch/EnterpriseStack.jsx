import { useEffect, useRef, useState } from 'react'
import { placeholder } from '../shared.jsx'
import { pick } from './data.js'

// launch.md "Enterprise layer stack" (erteesl*).
//   ≥1281: p = clamp(-rect.top / (rect.height - innerHeight)), active = min(3, floor(p * 4));
//          layers with index < active get data-peeled=true (CSS lifts/fades them). Clicking a title selects it.
//   ≤1280: every title is active and every body shown; no scroll mapping.
// The body fade-in keyframes (animation-1e051ht) are left for the animation pass.

const LAYER_TOPS = ['0%', '16.4%', '32.7%', '49.1%']

function useDesktop() {
  const q = '(min-width: 1281px)'
  const [desk, setDesk] = useState(() => window.matchMedia(q).matches)
  useEffect(() => {
    const m = window.matchMedia(q)
    const on = () => setDesk(m.matches)
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [])
  return desk
}

export default function EnterpriseStack({ sec }) {
  const layers = pick(sec, 'erteesl4')
  const titles = pick(sec, 'erteesl7')
  const [queryBody] = pick(sec, 'erteesl8')
  // Only the Query body was captured; Apps / Data / Platform get placeholder copy of the same length.
  const bodies = titles.map((_, i) => (i === 0 ? queryBody.text : placeholder(queryBody.text.length)))
  const desktop = useDesktop()
  const [active, setActive] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    if (!desktop) return
    let raf = 0
    const update = () => {
      raf = 0
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const span = r.height - window.innerHeight
      const p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0
      setActive(Math.min(3, Math.floor(p * 4)))
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [desktop])

  return (
    <div className="lx-stack" ref={ref}>
      <div className="lx-stack__sticky">
        <div className="cmp-grid lx-stack__grid">
          <div className="lx-stack__layers-col">
            <div className="lx-stack__layers">
              {layers.map((l, i) => (
                <img
                  key={l.src}
                  className="lx-stack__layer"
                  style={{ top: LAYER_TOPS[i], zIndex: 4 - i }}
                  data-peeled={desktop && i < active}
                  src={l.src}
                  alt=""
                />
              ))}
            </div>
          </div>
          <div className="lx-stack__titles">
            {titles.map((t, i) => {
              const on = !desktop || i === active
              return (
                <div key={t.text} className="lx-stack__item" onClick={() => setActive(i)}>
                  <p className="lx-stack__title" data-active={on}>{t.text}</p>
                  {on && <p className="lx-stack__body" key={`${i}-${active}`}>{bodies[i]}</p>}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
