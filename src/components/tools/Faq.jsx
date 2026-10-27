import { useId, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { txt } from './placeholder.js'

const CHEVRON = { '--icon': 'url(/assets/tools/svg/icon-chevron-down-24.svg)' }

// specs/tools-shared.md §G. Open: height→natural + opacity→1 over 300ms (power1.out); close: instant.
function FaqItem({ question, answer, seed }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const first = useRef(true)
  const id = useId()
  useLayoutEffect(() => {
    if (first.current) { first.current = false; return }
    const el = ref.current
    if (open) gsap.to(el, { height: 'auto', opacity: 1, duration: 0.3, ease: 'power1.out' })
    else { gsap.killTweensOf(el); gsap.set(el, { height: 0, opacity: 0 }) }
  }, [open])
  return (
    <>
      <div>
        <button type="button" className="t-faq__btn" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
          <span className="t-h20 t-faq__label">{question}</span>
          <span className="t-faq__chev"><span className="t-icon" style={CHEVRON} /></span>
        </button>
        <div id={id} ref={ref} className="t-faq__answer">
          <div className="t-faq__agrid"><p className="t-p16 t-grey">{txt(answer, seed)}</p></div>
        </div>
      </div>
      <hr className="t-faq__hr" />
    </>
  )
}

export default function Faq({ data }) {
  return (
    <section className="t-grid">
      <div className="t-faq__left"><h2 className="t-h56 t-faq__h">{data.heading}</h2></div>
      <div className="t-faq__right">
        <hr className="t-faq__hr t-faq__hr--first" />
        {data.items.map((it, i) => <FaqItem key={it.question} question={it.question} answer={it.answer} seed={i + 2} />)}
      </div>
    </section>
  )
}
