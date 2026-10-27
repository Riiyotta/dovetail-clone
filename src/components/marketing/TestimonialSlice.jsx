import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import GridImageBackground from './GridImageBackground.jsx'
import ProgressTabs from './ProgressTabs.jsx'
import useTabGroup from './useTabGroup.js'
import { SmartLink } from './content.jsx'
import { readTestimonials } from './testimonials.js'
import '../../styles/marketing/base.css'
import '../../styles/marketing/testimonial.css'

// TestimonialSlice (marketing-shared.md §7.4, `eqa8jb9*`, card `e1i468kp*`).
// `data` = the {"slice":"TestimonialSlice"} section. Several tabs → useTabGroup(0,100): 10s per quote.
export default function TestimonialSlice({ data }) {
  const content = data?.content || []
  const rootRef = useRef(null)
  const bg = content.find((c) => c.el === 'e1ms7w8v3')
  const card = content.find((c) => c.el === 'e1i468kp0')
  const label = content.find((c) => c.el === 'e1i468kp8')
  const { list, tabs } = readTestimonials(content, {
    photoEl: 'e1i468kp2', quoteEl: 'e1i468kp5', logoEl: null, nameEl: 'e1i468kp6', titleEl: 'e1i468kp7',
  })
  const { index, progress, select } = useTabGroup(list.length, 100, rootRef)
  const t = list[index] || list[0]
  const [hover, setHover] = useState(false)

  return (
    <div className="mk-testi" ref={rootRef}>
      <div className="mk-container">
        <GridImageBackground data={bg}>
          <div className="mk-basegrid mk-testi__grid">
            <div className="mk-testi__col">
              <SmartLink
                href={card?.href || '/customers/'}
                className="mk-tcard"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                <div className="mk-tcard__body">
                  {t.photo && <img className="mk-tcard__photo" src={t.photo} alt="" width={80} height={80} />}
                  <blockquote className="mk-tcard__quote">{t.quote}</blockquote>
                </div>
                <div className="mk-tcard__footer">
                  {t.logo && <img className="mk-tcard__logo" src={t.logo.src} alt={t.logo.alt || ''} />}
                  <div className="mk-tcard__line" />
                  <div className="mk-tcard__who">
                    <p className="mk-tcard__name">{t.name}</p>
                    <p className="mk-tcard__title">{t.title}</p>
                  </div>
                </div>
              </SmartLink>
            </div>
          </div>
        </GridImageBackground>
        {tabs.length > 1 && (
          <div className="mk-testi__tabs">
            <ProgressTabs labels={tabs} index={index} progress={progress} onSelect={select} />
          </div>
        )}
      </div>
      <PillTooltip active={hover} label={label?.text || 'Read customer story'} />
    </div>
  )
}

// Testimonial tooltip skin (§7.4): follows the cursor at +16px, flips at the viewport edges.
function PillTooltip({ active, label }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (!active) { el.style.opacity = '0'; return undefined }
    const onMove = (e) => {
      const { offsetWidth: w, offsetHeight: h } = el
      let x = e.clientX + 16
      let y = e.clientY + 16
      if (x + w > window.innerWidth) x = e.clientX - 16 - w
      if (y + h > window.innerHeight) y = e.clientY - 16 - h
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`
      el.style.opacity = '1'
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [active])
  return createPortal(
    <div ref={ref} className="mk-pill-tooltip" aria-hidden="true">
      <span className="mk-pill-tooltip__pill"><span className="mk-pill-tooltip__sq" />{label}</span>
    </div>,
    document.body,
  )
}
