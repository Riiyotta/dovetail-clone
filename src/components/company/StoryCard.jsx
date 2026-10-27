import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { quoteCopy, seedOf } from './text.js'
import '../../styles/company/base.css'
import '../../styles/company/components.css'

// StoryCard — CustomerStoryCard (company-shared.md S2). Used on /customers/, story "related", AWS Summit.
// Props:
//   story  { href, title, thumbnail: { src, alt }, logo?: { src, alt } | null, gridTitle?: string | null,
//            testimonial?: { quote: string | {placeholder,chars}, name, role } | null }
//          (the storyCards / related entries in src/data/company/*.json have exactly this shape)
//   tone   'grey' (default; hover pixels #212121 — customers + stories) | 'black' (#0A0A0A — AWS Summit)
// Behaviour: ≥1281 and only when `testimonial` exists, mouseenter runs a 7×7 random pixel dissolve
// (gsap stagger 0.3/49, from random) plus the overlay fading in over 80ms; focus/blur mirrors the overlay.
const N = 7
const STEP = 14.857142857142858

export default function StoryCard({ story, tone = 'grey' }) {
  const { href, title, thumbnail, logo, gridTitle, testimonial } = story
  const pixelsRef = useRef(null)
  const [active, setActive] = useState(false)
  const seed = seedOf(href || title || '')
  const quote = useMemo(() => (testimonial ? quoteCopy(testimonial.quote, seed) : ''), [testimonial, seed])

  const hoverable = () => !!testimonial && window.matchMedia('(min-width: 1281px)').matches
  const squares = () => (pixelsRef.current ? Array.from(pixelsRef.current.children) : [])

  const enter = () => {
    if (!hoverable()) return
    const all = squares()
    gsap.killTweensOf(all)
    gsap.set(all, { display: 'none' })
    gsap.to(all, { display: 'block', duration: 0, stagger: { each: 0.3 / 49, from: 'random' } })
    setActive(true)
  }
  const leave = () => {
    if (!testimonial) return
    const all = squares()
    gsap.killTweensOf(all)
    gsap.to(all, { display: 'none', duration: 0, stagger: { each: 0.3 / 49, from: 'random' } })
    setActive(false)
  }
  useEffect(() => () => gsap.killTweensOf(squares()), [])

  const pixels = []
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      pixels.push(
        <div
          key={`${r}-${c}`}
          style={{ width: `calc(${STEP}% + 1px)`, height: `calc(${STEP}% + 1px)`, left: `${-2 + STEP * c}%`, top: `${-2 + STEP * r}%` }}
        />,
      )
    }
  }

  return (
    <div className={`co-story${tone === 'black' ? ' co-story--black' : ''}${active ? ' is-active' : ''}`}>
      <Link
        to={href}
        className="co-story__thumb"
        onMouseEnter={enter}
        onMouseLeave={leave}
        onFocus={() => testimonial && setActive(true)}
        onBlur={() => setActive(false)}
        aria-label={title}
      >
        <div className="co-story__img">
          {thumbnail?.src && <img src={thumbnail.src} alt={thumbnail.alt || ''} loading="lazy" />}
        </div>
        {logo?.src && !gridTitle && (
          <div className="co-story__logo"><img src={logo.src} alt={logo.alt || ''} loading="lazy" /></div>
        )}
        {gridTitle && <p className="co-story__anon">{gridTitle}</p>}
        <div className="co-story__pixels" ref={pixelsRef} aria-hidden="true">{pixels}</div>
        {testimonial && (
          <div className="co-story__overlay" aria-hidden="true">
            <p className="co-story__quote">{quote}</p>
            <div className="co-story__person">
              {testimonial.name && <span className="co-story__name">{testimonial.name}</span>}
              {testimonial.role && <span className="co-story__role co-m14">{testimonial.role}</span>}
            </div>
          </div>
        )}
      </Link>
      <Link to={href} className="co-story__title">{title} ↘</Link>
    </div>
  )
}
