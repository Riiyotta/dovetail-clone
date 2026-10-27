import { useEffect, useId, useRef, useState } from 'react'

// Topics row shared by §4 and §6: left column (intro + vertical tablist with 6s progress),
// right column (image stack + panel stack), and the ≤1280 snap carousel.
// topics: [{ label, image, desc, link: { label, href } }]
export default function TopicTabs({ intro, topics }) {
  const [active, setActive] = useState(0)
  const [hovering, setHovering] = useState(false)
  const [focusWithin, setFocusWithin] = useState(false)
  const [inView, setInView] = useState(false)
  const rowRef = useRef(null)
  const tabRefs = useRef([])
  const uid = useId()

  useEffect(() => {
    const el = rowRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const paused = hovering || focusWithin || !inView
  const count = topics.length

  const select = (i, focus = false) => {
    const next = (i + count) % count
    setActive(next)
    if (focus) tabRefs.current[next]?.focus()
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); select(active + 1, true) }
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); select(active - 1, true) }
    else if (e.key === 'Home') { e.preventDefault(); select(0, true) }
    else if (e.key === 'End') { e.preventDefault(); select(count - 1, true) }
  }

  return (
    <div className="topics-row" ref={rowRef}>
      <div className="topics-left">
        <div className="topics-intro">
          <p>{intro}</p>
          <div className="cta-row">
            <a href="#" className="btn btn-primary">Book a demo</a>
            <a href="#" className="btn btn-glass">Start free trial</a>
          </div>
        </div>
        <div
          className="topics-tablist"
          role="tablist"
          aria-orientation="vertical"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onFocus={() => setFocusWithin(true)}
          onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setFocusWithin(false) }}
          onKeyDown={onKeyDown}
        >
          {topics.map((t, i) => {
            const selected = i === active
            return (
              <button
                key={t.label}
                ref={(el) => (tabRefs.current[i] = el)}
                id={`${uid}-tab-${i}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`${uid}-panel-${i}`}
                tabIndex={selected ? 0 : -1}
                className="topics-tab"
                onClick={() => select(i)}
              >
                <span>{t.label}</span>
                {selected && (
                  <span className="topics-progress" aria-hidden="true">
                    <span
                      key={active}
                      className="topics-progress-fill"
                      data-paused={paused ? 'true' : 'false'}
                      onAnimationEnd={() => select(active + 1)}
                    />
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      <div className="topics-right">
        <div className="topics-images">
          {topics.map((t, i) => (
            <img key={t.image} src={t.image} alt="" data-active={i === active ? 'true' : 'false'} />
          ))}
        </div>
        <div className="topics-panels">
          {topics.map((t, i) => (
            <div
              key={t.label}
              id={`${uid}-panel-${i}`}
              role="tabpanel"
              aria-labelledby={`${uid}-tab-${i}`}
              className="topics-panel"
              data-active={i === active ? 'true' : 'false'}
            >
              <p className="topics-desc">{t.desc}</p>
              <a href={t.link.href} className="topics-link">{t.link.label}</a>
            </div>
          ))}
        </div>
      </div>

      <div className="topics-carousel">
        {topics.map((t) => (
          <div key={t.label} className="topics-carousel-item">
            <div className="topics-carousel-img"><img src={t.image} alt="" /></div>
            <div className="topics-carousel-text">
              <h3>{t.label}</h3>
              <p className="topics-desc">{t.desc}</p>
              <a href={t.link.href} className="topics-link">{t.link.label}</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
