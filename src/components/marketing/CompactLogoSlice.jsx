import Marquee from './Marquee.jsx'
import '../../styles/marketing/base.css'
import '../../styles/marketing/compact-logo.css'

// CompactLogoSlice (marketing-shared.md §7.5, `e1a4s9wi*`). `data` = the {"slice":"CompactLogo"} section.
// Row 1 = first 6 logos (left-to-right), row 2 = the next 7 (right-to-left, offset left:120px).
export default function CompactLogoSlice({ data, className = '' }) {
  const content = data?.content || []
  const heading = content.find((c) => c.el === 'e1a4s9wi0')
  const logos = content.filter((c) => c.role === 'img')
  const rows = [
    { items: logos.slice(0, 6), direction: 'ltr' },
    { items: logos.slice(6, 13), direction: 'rtl' },
  ].filter((r) => r.items.length)

  return (
    <div className={`mk-container mk-clogo ${className}`}>
      {heading && <p className="mk-clogo__heading">{heading.text}</p>}
      <div className="mk-clogo__rows">
        {rows.map((r, i) => (
          <div key={i} className={`mk-clogo__row${i === 1 ? ' mk-clogo__row--offset' : ''}`}>
            <Marquee data={{ direction: r.direction, removeShadow: true }}>
              {r.items.map((l, j) => (
                <div key={j} className="mk-clogo__item">
                  <img className="mk-clogo__img" src={l.src} alt={l.alt || ''} width={142} height={64} />
                </div>
              ))}
            </Marquee>
          </div>
        ))}
        <div className="mk-clogo__fade mk-clogo__fade--left" aria-hidden="true" />
        <div className="mk-clogo__fade mk-clogo__fade--right" aria-hidden="true" />
      </div>
    </div>
  )
}
