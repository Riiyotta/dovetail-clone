import { useMemo, useRef, useState } from 'react'
import { usePageChrome } from '../../chrome.jsx'
import FinalCta from '../../components/FinalCta.jsx'
import Button from '../../components/company/Button.jsx'
import Icon from '../../components/company/Icon.jsx'
import Spacer from '../../components/company/Spacer.jsx'
import StoryCard from '../../components/company/StoryCard.jsx'
import PixelBand from '../../components/company/PixelBand.jsx'
import Marquee from '../../components/company/Marquee.jsx'
import { GradientBanner } from '../../components/company/Backgrounds.jsx'
import { copy, quoteCopy } from '../../components/company/text.js'
import ProgressTabs from '../../components/marketing/ProgressTabs.jsx'
import useTabGroup from '../../components/marketing/useTabGroup.js'
import TypewriterHero from './TypewriterHero.jsx'
import data from '../../data/company/customers.json'
import '../../styles/company/base.css'
import '../../styles/company/components.css'
import '../../styles/company/customers.css'

// /customers/ — specs/customers-index.md
export default function CustomersIndex() {
  usePageChrome({ navSpacer: false })
  return (
    <>
      <main className="cu-main co-main">
        <TypewriterHero hero={data.hero} />
        <StoryGrid filters={data.filters} cards={data.storyCards} />
        <Spacer size="s200" />
        <LogoWall logos={data.logoWall} />
        <PixelBand position="bottom"><Spacer size="s200" /></PixelBand>
        <StoryCarousel slides={data.storyCarousel.slides} tickMs={data.storyCarousel.autoplay.tickMs} />
        <PixelBand position="top" />
        <Ratings ratings={data.ratings} headline={data.headline} awards={data.awards} />
        <TestimonialWall items={data.testimonials} />
        <Spacer size="s200" />
      </main>
      <FinalCta />
    </>
  )
}

// §2 Industry filter + story grid
function StoryGrid({ filters, cards }) {
  const [active, setActive] = useState('All')
  const shown = useMemo(() => {
    const list = active === 'All' ? cards : cards.filter((c) => (c.industry || '').includes(active))
    return [...list].sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity))
  }, [active, cards])
  return (
    <section className="co-container">
      <div className="cu-filters">
        {filters.map((f) => (
          <button key={f} type="button" className="cu-chip" aria-pressed={active === f} onClick={() => setActive(f)}>{f}</button>
        ))}
      </div>
      <div className="cu-grid">
        {shown.map((c) => <StoryCard key={c.slug} story={c} />)}
      </div>
    </section>
  )
}

// §3 Logo wall
function LogoWall({ logos }) {
  return (
    <section className="co-grid cu-logos">
      {logos.map((l, i) => (
        <div key={i} className="cu-logos__cell">
          <div className="cu-logos__box"><img src={l.src} alt={l.alt || ''} loading="lazy" /></div>
        </div>
      ))}
    </section>
  )
}

// §4 Blue story carousel. Heading: company name followed by [ logo ].
function fold(s) {
  return Array.from(s).map((c) => c.normalize('NFD').replace(/[̀-ͯ]/g, '')[0] || c).join('').toLowerCase()
}

function SlideHeading({ heading, name, logo }) {
  const i = fold(heading).indexOf(fold(name))
  const chars = Array.from(heading)
  const end = i < 0 ? -1 : i + Array.from(name).length
  const logoSpan = (
    <span className="cu-slide__logo">[<img src={logo} alt={name} />]</span>
  )
  if (end < 0) return <h3 className="cu-slide__h3 co-h56">{heading} {logoSpan}</h3>
  return (
    <h3 className="cu-slide__h3 co-h56">
      {chars.slice(0, end).join('')} {logoSpan}{chars.slice(end).join('')}
    </h3>
  )
}

function StoryCarousel({ slides, tickMs }) {
  const rootRef = useRef(null)
  const { index, progress, select } = useTabGroup(slides.length, tickMs, rootRef)
  const active = slides[index]
  return (
    <section ref={rootRef} className="cu-band">
      <img key={active.slug} className="cu-band__bg" src={active.backgroundVideo.poster} alt="" aria-hidden="true" role="presentation" />
      <div className="cu-band__content">
        <div className="co-container cu-band__container">
          <div className="cu-band__tabs">
            <ProgressTabs
              tone="light"
              labels={slides.map((s) => s.tab)}
              ariaLabels={slides.map((s) => `${s.headingLogoAfter} customer story`)}
              index={index}
              progress={progress}
              onSelect={select}
            />
          </div>
          <Spacer size="s40-32" />
          <div className="cu-slides">
            {slides.map((s, i) => (
              <div key={s.slug} className={`cu-slide${i === index ? ' is-active' : ''}`}>
                <SlideHeading heading={s.heading} name={s.headingLogoAfter} logo={s.inlineLogoSvg} />
                <Spacer size="s24-16" />
                <p className="cu-slide__p co-p20">{copy(s.paragraph, 40 + i)}</p>
                <Spacer size="s32-24" />
                <div className="co-btn-row cu-slide__btns">
                  <Button href={s.button.href} variant="primary">{s.button.label}</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// §5 Ratings + "Trusted and loved by users" + awards marquee
function Stars({ rating }) {
  const full = Math.floor(rating)
  const half = rating - full > 0
  return (
    <span className="cu-rating__stars" aria-hidden="true">
      {Array.from({ length: full }, (_, i) => <Icon key={i} src="/assets/company/svg/rating-star-full-16.svg" />)}
      {half && <img src="/assets/company/svg/rating-star-half-16.svg" alt="" />}
    </span>
  )
}

function HeadlinePart({ part }) {
  if (typeof part === 'string') return <span>{part}</span>
  if (part.image) return <span className="cu-headline__flag"><img src={part.image} alt="" /></span>
  if (part.mondwest) return <span className="cu-headline__mw">{part.mondwest}</span>
  return null
}

function Ratings({ ratings, headline, awards }) {
  return (
    <section className="cu-ratings co-dottile">
      <GradientBanner side="top" />
      <GradientBanner side="bottom" />
      <GradientBanner side="left" />
      <GradientBanner side="right" />
      <div className="cu-ratings__content">
        <Spacer size="s200" />
        <div className="co-container cu-ratings__row">
          {ratings.map((r) => (
            <a key={r.platform} className="cu-rating" href={r.href} target="_blank" rel="noreferrer" aria-label={`${r.platform} rating ${r.rating} out of 5`}>
              <Stars rating={r.rating} />
              <span className="cu-rating__label co-m12">{r.platform}</span>
            </a>
          ))}
        </div>
        <Spacer size="s32" />
        <div className="co-container">
          <p className="cu-headline">
            <span className="cu-headline__line">{headline.line1.map((p, i) => <HeadlinePart key={i} part={p} />)}</span>
            <span className="cu-headline__line">{headline.line2.map((p, i) => <HeadlinePart key={i} part={p} />)}</span>
          </p>
        </div>
        <Spacer size="s200" />
        <Marquee direction="rtl" gap={80} gapMobile={40}>
          {awards.map((a) => (
            <div key={a.title + a.name} className="cu-award">
              <img src={a.image} alt="" height={72} />
              <div className="cu-award__text">
                <span className="cu-award__title co-h24">{a.title}</span>
                <span className="cu-award__name co-m14">{a.name}</span>
              </div>
            </div>
          ))}
        </Marquee>
        <Spacer size="hero" />
      </div>
    </section>
  )
}

// §6 Testimonial wall — reorder [i%3==0, i%3==1, i%3==2] then flow into CSS columns.
function TestimonialWall({ items }) {
  const ordered = useMemo(() => [0, 1, 2].flatMap((m) => items.filter((_, i) => i % 3 === m)), [items])
  return (
    <section className="cu-wall">
      <div className="co-grid cu-wall__grid">
        <div className="co-col-full">
          <div className="cu-wall__masonry">
            {ordered.map((t, i) => (
              <div key={i} className="cu-wall__item">
                <figure className="cu-tcard" style={{ margin: 0 }}>
                  <blockquote className="cu-tcard__quote co-p20">{quoteCopy(t.quote, 100 + i)}</blockquote>
                  <figcaption className="cu-tcard__person">
                    {t.avatar && <img className="cu-tcard__avatar" src={t.avatar} alt="" loading="lazy" />}
                    <span>
                      <span className="cu-tcard__name" style={{ display: 'block' }}>{t.name}</span>
                      <span className="cu-tcard__company" style={{ display: 'block' }}>{t.company}</span>
                    </span>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="cu-wall__fade" aria-hidden="true" />
    </section>
  )
}
