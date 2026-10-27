import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CtaRow, Lines, groupBy, textOf } from '../../components/marketing/content.jsx'

gsap.registerPlugin(ScrollTrigger)

// ProductFeaturesSlice (product.md §5, `e1r1adlk*`, sticky engine `e1h3sdf5*`).
// Both DOM variants render; CSS shows the sticky one at ≥1281 and the stacked one at ≤1280.
export default function ProductFeatures({ data }) {
  const c = data.content
  const desktopImgs = c.filter((x) => x.role === 'img' && !x.hiddenAt1440)
  const features = groupBy(c.filter((x) => !(x.role === 'img')), (x) => x.el === 'e1r1adlk3').map((g, i) => ({
    num: g[0].text,
    h2: g.find((x) => x.el === 'e1r1adlk4')?.text,
    body: textOf(g.find((x) => x.el === 'e1r1adlk5'), 20 + i),
    ctas: g.filter((x) => x.role === 'link'),
    img: desktopImgs[i],
  }))
  const [active, setActive] = useState(0)
  const itemRefs = useRef([])

  // Active index: ScrollTrigger per item, start "center 85%", end "center 15%", onEnter/onEnterBack.
  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1281px)', () => {
      const triggers = itemRefs.current.filter(Boolean).map((el, i) => ScrollTrigger.create({
        trigger: el,
        start: 'center 85%',
        end: 'center 15%',
        onEnter: () => setActive(i),
        onEnterBack: () => setActive(i),
      }))
      ScrollTrigger.refresh()
      const t = setTimeout(() => ScrollTrigger.refresh(), 2000)
      return () => { clearTimeout(t); triggers.forEach((tr) => tr.kill()) }
    })
    return () => mm.revert()
  }, [features.length])

  const last = features.length - 1

  return (
    <section className="pd-feat">
      {/* Desktop sticky variant (.e1h3sdf51) */}
      <div className="pd-feat__sticky">
        <div className="mk-slicegrid pd-feat__grid">
          <div className="pd-feat__content">
            {features.map((f, i) => (
              <div key={i} ref={(el) => { itemRefs.current[i] = el }} className="pd-feat__item" data-active={i === active ? 'true' : undefined}>
                <FeatureText f={f} />
              </div>
            ))}
          </div>
          <div className="pd-feat__media">
            <div className="pd-feat__media-sticky">
              <div className="pd-feat__media-box">
                {features.map((f, i) => (
                  <div key={i} className="pd-feat__media-layer" data-active={i === active ? 'true' : undefined}>
                    {f.img && <img className="pd-feat__img" src={f.img.src} alt={f.img.alt || ''} />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stacked variant (.e1h3sdf59), ≤1280 */}
      <div className="pd-feat__stacked mk-container">
        <div className="pd-feat__stack">
          {features.map((f, i) => (
            <div key={i} className="pd-feat__stack-item">
              <div className="pd-feat__stack-img">{f.img && <img src={f.img.src} alt="Product screenshot" />}</div>
              <FeatureText f={f} ctaClass={i === last ? 'pd-feat__ctas--last' : ''} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureText({ f, ctaClass = '' }) {
  return (
    <div className="pd-feat__text">
      <div className="pd-feat__copy">
        <p className="pd-feat__num">{f.num}</p>
        <h2 className="pd-feat__h2"><Lines text={f.h2} /></h2>
        <p className="pd-feat__body">{f.body}</p>
      </div>
      <CtaRow links={f.ctas} className={`pd-feat__ctas ${ctaClass}`} />
    </div>
  )
}
