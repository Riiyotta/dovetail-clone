import Marquee from './Marquee.jsx'

// specs/tools-shared.md §D CompactLogoSlice. data: { heading, rows: [[{src, alt}]...] }.
// Two rows: row 1 ltr, row 2 rtl with left:120px. A single row renders the single-row variant (ltr).
export default function LogoMarquee({ data }) {
  const single = data.rows.length === 1
  return (
    <div className="t-container t-logos">
      <p className="t-m14 t-logos__heading">{data.heading}</p>
      <div className={`t-logos__rows${single ? ' t-logos__rows--single' : ''}`}>
        {data.rows.map((row, i) => (
          <div key={i} className={`t-logos__row${i === 1 ? ' t-logos__row--offset' : ''}`}>
            <Marquee dir={i === 1 ? 'rtl' : 'ltr'}>
              {row.map((logo) => (
                <div key={logo.name} className="t-marquee__item">
                  <div className="t-logo-box"><img src={logo.src} alt={logo.alt} /></div>
                </div>
              ))}
            </Marquee>
          </div>
        ))}
        <div className="t-logos__fade t-logos__fade--l" aria-hidden="true" />
        <div className="t-logos__fade t-logos__fade--r" aria-hidden="true" />
      </div>
    </div>
  )
}
