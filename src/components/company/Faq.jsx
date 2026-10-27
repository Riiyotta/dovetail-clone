import { Fragment, useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import Icon from './Icon.jsx'
import { copy } from './text.js'
import '../../styles/company/base.css'
import '../../styles/company/components.css'

// Faq — FAQ accordion (company-shared.md S9). Anonymous stories, event Q&A, careers, b2bsaasy.
// Props:
//   heading   string (default 'FAQs')
//   subtitle? string (P16 #A7A7A7 under the heading)
//   compact   true → H32 heading (grouped Q&A) instead of H56
//   items     [{ q, a: string | {placeholder,chars}, more?: { label, href } }]
//   seed      placeholder seed
// Open: gsap.to(answer, {height:'auto', opacity:1, duration:.3}); close: instant set. Items toggle independently.
export default function Faq({ heading = 'FAQs', subtitle, compact = false, items = [], seed = 0 }) {
  return (
    <section className="co-grid co-faq">
      <div className="co-faq__left">
        <h2 className={`co-faq__h2 ${compact ? 'co-h32' : 'co-h56'}`}>{heading}</h2>
        {subtitle && <p className="co-faq__subtitle co-p16">{subtitle}</p>}
      </div>
      <div className="co-faq__right">
        <hr className="co-faq__hr" />
        {items.map((it, i) => (
          <Fragment key={i}>
            <FaqItem item={it} seed={seed + i * 7} />
            <hr className="co-faq__item-hr" />
          </Fragment>
        ))}
      </div>
    </section>
  )
}

function FaqItem({ item, seed }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const id = useId()
  const toggle = () => {
    const el = ref.current
    if (!open) gsap.to(el, { height: 'auto', opacity: 1, duration: 0.3 })
    else { gsap.killTweensOf(el); gsap.set(el, { height: 0, opacity: 0 }) }
    setOpen(!open)
  }
  const more = item.more
  return (
    <div>
      <button type="button" className="co-faq__q" aria-expanded={open} aria-controls={id} onClick={toggle}>
        <span className="co-h20">{item.q}</span>
        <span className="co-faq__tile"><Icon src="/assets/company/svg/icon-chevron-down.svg" /></span>
      </button>
      <div className="co-faq__agrid">
        <div ref={ref} id={id} className="co-faq__a co-p16" role="region" aria-hidden={!open}>
          <p>{copy(item.a, seed)}</p>
          {more && (/^https?:/.test(more.href)
            ? <a className="co-faq__more" href={more.href} target="_blank" rel="noreferrer">{more.label}</a>
            : <Link className="co-faq__more" to={more.href} target="_blank">{more.label}</Link>)}
        </div>
      </div>
    </div>
  )
}
