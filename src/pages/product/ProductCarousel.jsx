import { useEffect, useRef, useState } from 'react'
import { CtaRow, Lines, MaskIcon, textOf } from '../../components/marketing/content.jsx'

// ProductCarouselSlice (product.md §9, `e1c9zraz*`). headingPreset 'h56' = DT's `.eoxsi440` heading.
export default function ProductCarousel({ data, headingPreset }) {
  const c = data.content
  const h2 = c.find((x) => x.el === 'e1c9zraz3')
  const sub = c.find((x) => x.el === 'e1c9zraz6')
  const ctas = c.filter((x) => x.role === 'link')
  const arrow = c.find((x) => x.role === 'svg')
  const cards = []
  c.forEach((x, i) => {
    if (x.el === 'e1c9zraz12') cards.push({ img: x })
    else if (!cards.length) return
    else if (x.el === 'e1c9zraz15') cards[cards.length - 1].title = x.text
    else if (x.el === 'e1c9zraz16') cards[cards.length - 1].chip = x.text
    else if (x.el === 'e1c9zraz17') cards[cards.length - 1].body = textOf(x, 100 + i)
  })
  const trackRef = useRef(null)
  const [edge, setEdge] = useState({ start: true, end: false })

  useEffect(() => {
    const t = trackRef.current
    const update = () => setEdge({ start: t.scrollLeft === 0, end: t.scrollLeft + t.clientWidth >= t.scrollWidth - 1 })
    update()
    t.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => { t.removeEventListener('scroll', update); window.removeEventListener('resize', update) }
  }, [])

  const by = (dx) => trackRef.current.scrollBy({ left: dx, behavior: 'smooth' })
  const headingClass = headingPreset === 'h56' ? 'pd-car__h56' : 'pd-car__inter'

  return (
    <div className="pd-car">
      <div className="mk-container">
        <div className="pd-car__head">
          <div className="pd-car__left">
            <h2 className="pd-car__h2">
              {h2?.parts?.length
                ? h2.parts.map((p, i) => (
                  <span key={i}>
                    {i > 0 && ' '}
                    <span className={p.font === 'PP Mondwest' ? 'pd-car__serif' : headingClass}><Lines text={p.text} /></span>
                  </span>
                ))
                : <span className={headingClass}><Lines text={h2?.text} /></span>}
            </h2>
            {sub && <p className="pd-car__sub">{textOf(sub, 5)}</p>}
            <CtaRow links={ctas} />
          </div>
          <div className="pd-car__arrows">
            <button type="button" className="pd-car__arrow pd-car__arrow--prev" aria-label="Previous" disabled={edge.start} onClick={() => by(-434)}>
              {arrow && <MaskIcon src={arrow.src} className="pd-car__arrow-icon" />}
            </button>
            <button type="button" className="pd-car__arrow" aria-label="Next" disabled={edge.end} onClick={() => by(434)}>
              {arrow && <MaskIcon src={arrow.src} className="pd-car__arrow-icon" />}
            </button>
          </div>
        </div>
      </div>
      <div className="pd-car__track" ref={trackRef}>
        {cards.map((card, i) => (
          <div key={i} className="pd-car__card">
            <img className="pd-car__img" src={card.img.src} alt={card.img.alt || ''} />
            <div className="pd-car__text">
              <p className="pd-car__title">
                {card.title}
                {card.chip && <span className="pd-car__chip">{card.chip}</span>}
              </p>
              <p className="pd-car__body">{card.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
