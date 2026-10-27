import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { placeholderText } from './placeholder.js'
import '../../styles/legal/slices.css'

const OFFSET = 16

// Cursor tooltip, tools-shared §F variant: glass label with an 8x8 blue square, no inner rise.
function CardTooltip({ active, label }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!active) { el.style.opacity = '0'; return }
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
    <div ref={ref} className="ltt" aria-hidden="true">
      <span className="ltt__label lt-m14"><span className="ltt__sq" />{label}</span>
    </div>,
    document.body,
  )
}

// Featured testimonial slice (tools-shared §F).
export default function FeaturedTestimonial({ data, seed = '' }) {
  const [hover, setHover] = useState(false)
  const quote = typeof data.quote === 'string' ? data.quote : placeholderText(data.quote?.chars || 200, `q${seed}`, 'quote')
  return (
    <div className="ltesti">
      <div className="lcont">
        <div className="ltesti__bgwrap">
          <div className="ltesti__bgfull" aria-hidden="true">
            <img className="ltesti__bg" src={data.background?.src} alt="" />
          </div>
          <div className="ltesti__layer">
            <div className="ltesti__grid">
              <div className="ltesti__col">
                <a
                  href={data.href}
                  className="ltesti__card"
                  onMouseOver={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                >
                  <div className="ltesti__quote">
                    {data.avatar?.src && <img className="ltesti__avatar" src={data.avatar.src} alt={data.avatar.alt || ''} width={80} height={80} />}
                    <blockquote className="ltesti__text">“{quote}”</blockquote>
                  </div>
                  <div className="ltesti__meta">
                    {data.logo?.src && <img className="ltesti__logo" src={data.logo.src} alt={data.logo.alt || ''} />}
                    <span className="ltesti__vline" aria-hidden="true" />
                    <div className="ltesti__person">
                      <p className="lt-m14 l-white">{data.name}</p>
                      <p className="lt-m14 l-dim">{data.role}</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CardTooltip active={hover} label={data.tooltip || 'Read customer story'} />
    </div>
  )
}
