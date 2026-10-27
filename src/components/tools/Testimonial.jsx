import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { txt } from './placeholder.js'

const OFFSET = 16

// Cursor tooltip, tools variant (specs/tools-shared.md §F): glass label + 8x8 blue square, no rise animation.
function Tip({ active, label }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (!active) { el.style.opacity = '0'; return undefined }
    const onMove = (e) => {
      const { offsetWidth: tw, offsetHeight: th } = el
      let x = e.clientX + OFFSET
      let y = e.clientY + OFFSET
      if (x + tw > window.innerWidth) x = e.clientX - OFFSET - tw
      if (y + th > window.innerHeight) y = e.clientY - OFFSET - th
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`
      el.style.opacity = '1'
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [active])
  return createPortal(
    <div ref={ref} className="t-tip" aria-hidden="true">
      <span className="t-tip__label t-m14"><span className="t-tip__sq" />{label}</span>
    </div>,
    document.body,
  )
}

// specs/tools-shared.md §F Testimonial featured. data: { href, tooltip, avatar, quote, logo, name, role, background }.
export default function Testimonial({ data }) {
  const [hover, setHover] = useState(false)
  // Quote placeholder length includes the curly quotes.
  const raw = typeof data.quote === 'string' ? data.quote : txt({ ...data.quote, chars: (data.quote.chars || 2) - 2 }, 3)
  const quote = typeof data.quote === 'string' ? raw : `“${raw}”`
  return (
    <div className="t-testi">
      <div className="t-container">
        <div className="t-testi__bg" aria-hidden="true">
          <div className="t-testi__bgwrap">
            <img className="t-testi__bgimg" src={data.background.src} alt="" />
          </div>
        </div>
        <div className="t-testi__content">
          <div className="t-testi__grid">
            <div className="t-testi__col">
              <a
                href={data.href}
                className="t-testi__card"
                onMouseOver={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                <div className="t-testi__quote">
                  <img className="t-testi__avatar" src={data.avatar.src} alt={data.avatar.alt} width="80" height="80" />
                  <blockquote className="t-testi__text">{quote}</blockquote>
                </div>
                <div className="t-testi__meta">
                  <img className="t-testi__logo" src={data.logo.src} alt={data.logo.alt} />
                  <span className="t-testi__vline" aria-hidden="true" />
                  <div className="t-testi__person">
                    <span className="t-m14 t-white">{data.name}</span>
                    <span className="t-m14 t-grey">{data.role}</span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Tip active={hover} label={data.tooltip || 'Read customer story'} />
    </div>
  )
}
