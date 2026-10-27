import { useState } from 'react'
import { useChrome } from '../chrome.jsx'
import '../styles/shared.css'
import '../styles/Banner.css'

// CLONE_SPEC.md §1 — announcement banner (not sticky)
export default function Banner() {
  const [open, setOpen] = useState(true)
  const { theme, banner, bannerTheme, accent, palette } = useChrome()
  if (!open || banner === 'none') return null
  // Variants:
  // - content-shared.md §2: on light pages the banner keeps its dark styling (white text over #FAFAFA, nearly
  //   invisible); only the ✕ follows the page ink (`banner--light`).
  // - tools-shared.md §I: legal pages use the light palette (`banner--legal`); the tools article keeps the full
  //   dark banner, ✕ included (`bannerTheme: 'dark'`).
  // - marketing-shared.md §5: product pages veil the accent colour with white 16% (`banner: 'accent'`).
  const legal = palette === 'legal' || bannerTheme === 'light-palette'
  let cls = 'banner bg-banner-bg'
  if (legal) cls = 'banner banner--legal'
  else if (theme === 'light' && bannerTheme !== 'dark') cls += ' banner--light'
  const style = banner === 'accent' && accent
    ? { background: `linear-gradient(rgba(255,255,255,.16), rgba(255,255,255,.16)), ${accent}` }
    : undefined
  return (
    <div className={cls} style={style}>
      <a className="banner__link" href="#">
        <img className="banner__icon" src="/assets/3d-icon-digital-twin.png" alt="" width="20" height="20" />
        <span className="banner__label banner__label--lead mono-12 text-white">Ask. Never guess.</span>
        <span className="banner__label banner__label--cta mono-12 text-white">Introducing Digital Twins →</span>
        <img className="banner__icon" src="/assets/3d-icon-digital-twin.png" alt="" width="20" height="20" />
      </a>
      <button type="button" className="banner__dismiss text-white" aria-label="Dismiss banner" onClick={() => setOpen(false)}>
        <span className="svg-icon banner__x" style={{ '--icon': 'url(/assets/svg/banner-dismiss-x.svg)' }} />
      </button>
    </div>
  )
}
