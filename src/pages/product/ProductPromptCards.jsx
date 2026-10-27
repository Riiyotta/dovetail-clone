import { useState } from 'react'
import { Lines, MaskIcon, groupBy, textOf } from '../../components/marketing/content.jsx'
import PromptModal from './PromptModal.jsx'

// ProductPromptCardsSlice (product.md §6, `e1y8zjgx*`). Icon variant (agents, chat) or label variant (DT).
export default function ProductPromptCards({ data, modals = [] }) {
  const c = data.content
  const h2 = c.find((x) => x.el === 'e1y8zjgx1')
  const sub = c.find((x) => x.el === 'e1y8zjgx2')
  const labelVariant = c.some((x) => x.el === 'e1y8zjgx7')
  const overlaySvg = c.find((x) => x.role === 'svg' && x.src.includes('prompt-cell-hover-overlay'))
  const cards = groupBy(c, (x) => x.role === 'button-card').map((g, i) => {
    const desc = g.find((x) => x.el === 'e1y8zjgx13')
    return {
      icon: g.find((x) => x.role === 'img'),
      label: g.find((x) => x.el === 'e1y8zjgx9')?.text,
      title: g.find((x) => x.el === 'e1y8zjgx12')?.text,
      desc: textOf(desc, 40 + i),
      em: g.find((x) => x.el === 'em')?.text,
      cta: g.find((x) => x.el === 'e1y8zjgx14' || x.el === 'e1y8zjgx6')?.text,
      arrow: g.find((x) => x.role === 'svg' && x.src.includes('e1y8zjgx14')),
      modal: modals[i],
    }
  })
  const [open, setOpen] = useState(-1)

  return (
    <div className="pd-prompts">
      <div className="mk-container">
        <h2 className="pd-prompts__h2"><Lines text={h2?.text} /></h2>
        {sub && <p className="pd-prompts__sub">{textOf(sub, 4)}</p>}
        {labelVariant ? (
          <div className="pd-cells">
            {cards.map((card, i) => (
              <button key={i} type="button" className="pd-cell" onClick={() => setOpen(i)}>
                <div className="pd-cell__inner">
                  <span className="pd-cell__label">{card.label}</span>
                  <div className="pd-cell__block">
                    <p className="pd-cell__title">{card.title}</p>
                    <p className="pd-cell__desc">{card.desc}</p>
                  </div>
                </div>
                <div className="pd-cell__overlay prompt-cell-hover-overlay" aria-hidden="true">
                  {overlaySvg && <img className="pd-cell__overlay-svg" src={overlaySvg.src} alt="" />}
                  <span className="pd-cell__try">{card.cta}</span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="mk-basegrid pd-cards">
            {cards.map((card, i) => (
              <div key={i} className="pd-cards__col">
                <button type="button" className="pd-card" onClick={() => setOpen(i)}>
                  <div className="pd-card__icon-row">
                    {card.icon && <img src={card.icon.src} alt="" style={{ height: card.icon.h, width: 'auto' }} />}
                  </div>
                  <p className="pd-card__title">{card.title}</p>
                  <p className="pd-card__desc"><DescWithEm text={card.desc} em={card.em} /></p>
                  <span className="pd-card__try">
                    {card.cta}
                    {card.arrow && <MaskIcon src={card.arrow.src} className="pd-card__arrow" />}
                  </span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      {open >= 0 && (
        <PromptModal card={cards[open]} variant={labelVariant ? 'label' : 'icon'} onClose={() => setOpen(-1)} />
      )}
    </div>
  )
}

// One chat card has an <em> word recorded separately from its description (data: {"el":"em"}).
// Its position isn't recorded; it's placed before the description's last word (spec gap, flagged).
function DescWithEm({ text, em }) {
  if (!em) return text
  const at = text.lastIndexOf(' ')
  if (at < 0) return <>{text} <em>{em}</em></>
  return <>{text.slice(0, at)} <em>{em}</em>{text.slice(at)}</>
}
