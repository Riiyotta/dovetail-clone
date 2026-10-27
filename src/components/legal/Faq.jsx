import { useId, useState } from 'react'
import { txt } from './placeholder.js'
import '../../styles/legal/slices.css'

// FaqSlice (tools-shared §G). Each item has independent open state.
// Static states only: open = answer visible at natural height, chevron rotated 180deg (instant).
// The 300ms height/opacity expand on open is left for the animation pass — hook: [data-faq-answer].
function FaqItem({ item, seed }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  return (
    <div className="lfaq__item">
      <button type="button" className="lfaq__toggle" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
        <span className="lt-h20 lfaq__q">{item.question}</span>
        <span className="lfaq__chev" aria-hidden="true">
          <span
            className="licon lfaq__chev-icon"
            style={{ '--icon': 'url("/assets/tools/svg/icon-chevron-down-24.svg")', transform: open ? 'rotate(180deg)' : undefined }}
          />
        </span>
      </button>
      <div className="lfaq__answer-grid">
        <div id={id} className={`lt-p16 lfaq__answer${open ? ' is-open' : ''}`} data-faq-answer={open ? 'open' : 'closed'}>
          <p className="lt-p16 l-dim">{txt(item.answer, seed, 'neutral')}</p>
        </div>
      </div>
      <hr className="lfaq__hr" />
    </div>
  )
}

export default function Faq({ data, seed = '' }) {
  return (
    <section className="lgrid lfaq">
      <div className="lfaq__left">
        <h2 className="lt-h56 lfaq__h">{data.heading}</h2>
      </div>
      <div className="lfaq__right">
        <hr className="lfaq__hr lfaq__hr--top" />
        {(data.items || []).map((it, i) => <FaqItem key={i} item={it} seed={`${seed}faq${i}`} />)}
      </div>
    </section>
  )
}
