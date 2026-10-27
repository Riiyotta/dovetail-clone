import { useState } from 'react'
import PixelDissolve from '../shared/PixelDissolve.jsx'
import tw from '../../../tailwind.config.js'

const DISSOLVE_COLOR = tw.theme.extend.colors.bg // #0A0A0A (spec §4)

// Forrester stat card (§4 "30hrs", §6 "66%") with pixel-dissolve + download overlay on hover.
export default function StatCard({ href, number, title, desc, descMaxWidth }) {
  const [hover, setHover] = useState(false)
  return (
    <a
      href={href}
      className="stat-card"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="stat-card-content">
        <div className="stat-card-top">
          <img className="stat-card-mark" src="/assets/svg/forrester-mark.svg" alt="" width="32" height="39" />
          <span className="stat-card-number">{number}</span>
        </div>
        <div className="stat-card-bottom">
          <p className="stat-card-title">{title}</p>
          <p className="stat-card-desc" style={{ maxWidth: descMaxWidth }}>{desc}</p>
        </div>
      </div>
      <div className="stat-card-dissolve" aria-hidden="true">
        <PixelDissolve active={hover} color={DISSOLVE_COLOR} />
      </div>
      <div className="stat-card-overlay" aria-hidden="true">
        {/* svg/icon-download.svg inlined so stroke can be set to 1.33 per spec */}
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path stroke="currentColor" strokeLinecap="square" strokeWidth="1.33" d="M12 12v6M15 16l-3 3-3-3" />
          <path stroke="currentColor" strokeLinecap="square" strokeWidth="1.33" d="M18.104 17c1.46-.853 2.193-2.658 1.783-4.385s-1.86-2.937-3.52-2.938L15.5 10c-.603-2.5-2.63-4.667-5.023-4.96S5.771 6.066 4.658 8.356s-.794 5.079.8 7.014" />
        </svg>
        <p>Download the Forrester Total Economic Impact™ Study</p>
      </div>
    </a>
  )
}
