import { useEffect, useRef, useState } from 'react'
import { MaskIcon, groupBy, textOf } from '../../components/marketing/content.jsx'

const STEP = 500
const CHEVRON = '/assets/marketing/svg/eea47v98-455548.svg'

// ProductForSlice (product.md §7, `eea47v9*`): 500px of scroll per use case inside a sticky 100vh panel.
export default function ProductFor({ data }) {
  const c = data.content
  const h2 = c.find((x) => x.el === 'eea47v94')
  const groups = groupBy(c, (x) => x.el === 'eea47v98')
  // Gap: only the first (active at capture) description is recorded; the others reuse its length.
  const firstDesc = groups.map((g) => g.find((x) => x.el === 'eea47v913')).find(Boolean)
  const items = groups.map((g, i) => ({
    label: g[0].text,
    icon: g.find((x) => x.el === 'eea47v910'),
    desc: textOf(g.find((x) => x.el === 'eea47v913') || (firstDesc && { placeholder: true, chars: firstDesc.chars }), 80 + i),
  }))
  const n = items.length
  const rootRef = useRef(null)
  const [active, setActive] = useState(0)

  // Scroll logic (≥768 wide): progress = clamp(-top, 0, 500N); active = min(N-1, floor(progress/500)).
  useEffect(() => {
    const root = rootRef.current
    let started = false
    const onScroll = () => {
      if (!started || window.innerWidth < 768) return
      const progress = Math.min(STEP * n, Math.max(0, -root.getBoundingClientRect().top))
      setActive(Math.min(n - 1, Math.floor(progress / STEP)))
    }
    const raf = requestAnimationFrame(() => { started = true })
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', onScroll) }
  }, [n])

  return (
    <div className="pd-for" ref={rootRef} style={{ '--for-n': n }}>
      <div className="pd-for__sticky">
        <section className="pd-for__inner">
          <div className="pd-for__head"><h2 className="pd-for__h2">{h2?.text}</h2></div>
          <div className="pd-for__list">
            {items.map((it, i) => (
              <div key={i} className="pd-for__row" onClick={() => setActive(i)}>
                {i === active ? (
                  <div className="pd-for__active" key={`a${i}`}>
                    <button type="button" className="pd-for__btn" aria-expanded="true">
                      <span className="pd-for__labelwrap">
                        {it.icon && <img className="pd-for__icon" src={it.icon.src} alt="" />}
                        <span className="pd-for__label">{it.label}</span>
                      </span>
                      <MaskIcon src={CHEVRON} className="pd-for__chev pd-for__chev--open" />
                    </button>
                    <p className="pd-for__desc">{it.desc}</p>
                  </div>
                ) : (
                  <button type="button" className="pd-for__btn" aria-expanded="false">
                    <span className="pd-for__labelwrap">
                      {it.icon && <img className="pd-for__icon pd-for__icon--dim" src={it.icon.src} alt="" />}
                      <span className="pd-for__label-serif">{it.label}</span>
                    </span>
                    <MaskIcon src={CHEVRON} className="pd-for__chev pd-for__chev--dim" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
