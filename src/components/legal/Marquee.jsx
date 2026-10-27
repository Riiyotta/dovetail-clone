import '../../styles/legal/slices.css'

// Marquee track (tools-shared §D/§E). Static structure only: the item set is rendered twice
// (second copy aria-hidden + inert). The GSAP loop (60s per set, ltr/rtl, pause on focusin,
// paused under reduced motion) is left for the animation pass — hook: [data-marquee-strip].
export function Marquee({ items, renderItem, dir = 'ltr', className = '' }) {
  return (
    <div className={`lmq-track ${className}`} data-marquee-dir={dir}>
      <div className="lmq-strip" data-marquee-strip={dir}>
        {items.map((it, i) => <div className="lmq-item" key={`a${i}`}>{renderItem(it, i)}</div>)}
        <div className="lmq-copy" aria-hidden="true" inert="">
          {items.map((it, i) => <div className="lmq-item" key={`b${i}`}>{renderItem(it, i)}</div>)}
        </div>
      </div>
    </div>
  )
}

// CompactLogoSlice (§D). Comparison pages use the single-row variant (rows.length === 1).
export function LogoMarquee({ data }) {
  const rows = data.rows || []
  const single = rows.length === 1
  return (
    <div className={`lcont llogos${single ? ' llogos--single' : ''}`}>
      <p className="lt-m14 llogos__heading">{data.heading}</p>
      <div className="llogos__rows">
        {rows.map((row, r) => (
          <div className={`llogos__row${r === 1 ? ' llogos__row--offset' : ''}`} key={r}>
            <Marquee
              items={row}
              dir={r === 1 ? 'rtl' : 'ltr'}
              renderItem={(logo) => (
                <div className="llogos__box"><img src={logo.src} alt={logo.alt || logo.name} /></div>
              )}
            />
          </div>
        ))}
        <div className="llogos__fade llogos__fade--l" aria-hidden="true" />
        <div className="llogos__fade llogos__fade--r" aria-hidden="true" />
      </div>
    </div>
  )
}

// TestimonialMarquee (§E): awards, rtl, 72px tall.
export function AwardsMarquee({ data }) {
  return (
    <div className="lcont">
      <Marquee
        className="lawards"
        items={data.items || []}
        dir={data.direction || 'rtl'}
        renderItem={(it) => (
          <div className="lawards__item">
            <img className="lawards__badge" src={it.badge.src} alt={it.badge.alt || ''} height={72} loading="lazy" />
            <div className="lawards__text">
              <p className="lt-h24 l-white">{it.title}</p>
              <p className="lt-m14 l-dim">{it.source}</p>
            </div>
          </div>
        )}
      />
    </div>
  )
}
