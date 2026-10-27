import { MaskIcon, SmartLink, groupBy, textOf } from '../../components/marketing/content.jsx'

// Findings block (product.md §10, `e1fjikez*` + FeatureCardGrid `e1rt7vde*` / `eiz8yhc*`).
// Layout from the card count: 3 → vertical, vertical, horizontal; 2 → both vertical; 1 → horizontal.
export default function Findings({ data }) {
  const c = data.content
  const h2 = c.find((x) => x.el === 'e1fjikez1')
  const sub = c.find((x) => x.el === 'e1fjikez6')
  const cardItems = c.slice(c.indexOf(sub) + 1)
  const cards = groupBy(cardItems, (x) => x.role === 'img' && x.el === 'img').map((g, i) => ({
    img: g[0],
    title: g.find((x) => x.el === 'e1fjikez7')?.text,
    icon: g.find((x) => x.el === 'e1fjikez8'),
    body: textOf(g.find((x) => x.el === 'eiz8yhc2'), 120 + i),
    link: g.find((x) => x.el === 'eiz8yhc4'),
    arrow: g.find((x) => x.role === 'svg'),
  }))
  const horizontal = (i) => cards.length === 1 || (cards.length === 3 && i === 2)

  return (
    <div className="pd-find">
      <div className="mk-container">
        <h2 className="pd-find__h2">
          {(h2?.parts || []).map((p, i) => {
            if (p.img) return <span key={i} className="pd-find__icon-wrap"><img className="pd-find__icon" src={p.img} alt="" /></span>
            const prev = h2.parts[i - 1]
            return (
              <span key={i}>
                {i > 0 && !prev?.img && ' '}
                <span className={p.font === 'PP Mondwest' ? 'pd-find__serif' : 'pd-find__inter'}>{p.text}</span>
              </span>
            )
          })}
        </h2>
        {sub && <p className="pd-find__sub">{sub.text}</p>}
        <div className="mk-innergrid">
          {cards.map((card, i) => (
            <div key={i} className={horizontal(i) ? 'pd-find__col--h' : 'pd-find__col--v'}>
              <div className={`pd-fcard ${horizontal(i) ? 'pd-fcard--h' : 'pd-fcard--v'}`}>
                <div className="pd-fcard__media">
                  <img className="pd-fcard__img" src={card.img.src} alt={card.img.alt || ''} />
                </div>
                <div className="pd-fcard__text">
                  <h3 className="pd-fcard__h3">
                    {card.icon && <img className="pd-fcard__icon" src={card.icon.src} alt="" />}
                    {card.title}
                  </h3>
                  <p className="pd-fcard__p">{card.body}</p>
                  {card.link && (
                    <SmartLink href={card.link.href} className="mk-learn">
                      {card.link.text}
                      <span>{card.arrow && <MaskIcon src={card.arrow.src} className="pd-fcard__arrow" />}</span>
                    </SmartLink>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
