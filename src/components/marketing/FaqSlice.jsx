import { useId, useRef, useState } from 'react'
import gsap from 'gsap'
import { MaskIcon, textOf } from './content.jsx'
import '../../styles/marketing/base.css'
import '../../styles/marketing/faq.css'

const CHEVRON = '/assets/marketing/svg/ea410al3-082750.svg'

// FaqSlice (marketing-shared.md §7.1). `data` = the {"slice":"FAQ"} section object.
// Optional pricing extras (pricing.md §4): subtitle `ef2kgtv1` + "Contact support" button `e1rc0f0x0`.
export default function FaqSlice({ data }) {
  const content = data?.content || []
  const heading = content.find((c) => c.el === 'ef2kgtv0')
  const subtitle = content.find((c) => c.el === 'ef2kgtv1')
  const support = content.find((c) => c.el === 'e1rc0f0x0')
  const items = []
  content.forEach((c, i) => {
    if (c.el === 'ea410al0') items.push({ q: c.text, a: null, idx: i })
    // Some questions are recorded as a "button-card" whose text follows as a separate `ea410al1` item.
    else if (c.el === 'ea410al1' && items.length && !items[items.length - 1].q) items[items.length - 1].q = c.text
    else if (c.el === 'ef2kgtv2' && items.length) items[items.length - 1].a = c
  })

  return (
    <div className="mk-slicegrid mk-faq">
      <div className="mk-faq__left">
        <h2 className="mk-faq__h2">{heading?.text ?? 'FAQs'}</h2>
        {subtitle && (
          <p className="mk-faq__subtitle">
            {subtitle.text}{' '}
            {support && (
              <button type="button" className="mk-faq__support" onClick={() => window.Intercom?.('show')}>
                {support.text}
              </button>
            )}
          </p>
        )}
      </div>
      <div className="mk-faq__right">
        <hr className="mk-faq__hr" />
        {items.map((it, i) => <FaqItem key={i} q={it.q} a={textOf(it.a, it.idx)} />)}
      </div>
    </div>
  )
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)
  const id = useId()

  const toggle = () => {
    const el = wrapRef.current
    const next = !open
    setOpen(next)
    gsap.killTweensOf(el)
    if (next) gsap.to(el, { height: 'auto', opacity: 1, duration: 0.3 })
    else gsap.set(el, { height: 0, opacity: 0 })
  }

  return (
    <div className="mk-faq__item">
      <button type="button" className="mk-faq__q" aria-expanded={open} aria-controls={id} onClick={toggle}>
        <span className="mk-faq__qtext">{q}</span>
        <span className="mk-faq__chip">
          <MaskIcon src={CHEVRON} className="mk-faq__chev" style={open ? { transform: 'rotate(180deg)' } : undefined} />
        </span>
      </button>
      <div id={id} ref={wrapRef} className="mk-faq__a" role="region">
        <div className="mk-innergrid mk-faq__agrid">
          <div className="mk-faq__acol"><p className="mk-faq__p">{a}</p></div>
        </div>
      </div>
      <div className="mk-faq__divider" />
    </div>
  )
}
