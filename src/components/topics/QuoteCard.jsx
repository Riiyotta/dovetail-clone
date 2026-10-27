import { useState } from 'react'
import AsciiField from '../shared/AsciiField.jsx'
import CursorTooltip from '../shared/CursorTooltip.jsx'

// Blue customer quote card (§4 Itaú, §6 Okta).
// logo: { src, box: [w,h], img: { top, left, width, height } }
export default function QuoteCard({ href, quote, quoteMaxWidth, name, role, avatar, logo }) {
  const [hover, setHover] = useState(false)
  return (
    <a
      href={href}
      className="quote-card"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <AsciiField />
      <div className="quote-card-toplogo" aria-hidden="true">
        <div className="quote-card-logo" style={{ width: logo.box[0], height: logo.box[1] }}>
          <img src={logo.src} alt="" style={logo.img} />
        </div>
      </div>
      <p className="quote-card-text" style={quoteMaxWidth ? { maxWidth: quoteMaxWidth } : undefined}>{quote}</p>
      <div className="quote-card-bottom">
        <div className="quote-card-person">
          {avatar && <img className="quote-card-avatar" src={avatar} alt="" width="40" height="40" />}
          <div>
            <p className="quote-card-name">{name}</p>
            <p className="quote-card-role">{role}</p>
          </div>
        </div>
        <div className="quote-card-logo" style={{ width: logo.box[0], height: logo.box[1] }}>
          <img src={logo.src} alt="" style={logo.img} />
        </div>
      </div>
      <CursorTooltip active={hover} label="Read customer story" />
    </a>
  )
}
