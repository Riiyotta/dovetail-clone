import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import data from '../../data/company/careers.json'
import { usePageChrome } from '../../chrome.jsx'
import Button from '../../components/company/Button.jsx'
import Spacer from '../../components/company/Spacer.jsx'
import Faq from '../../components/company/Faq.jsx'
import Carousel from '../../components/company/Carousel.jsx'
import VideoCard from '../../components/company/VideoCard.jsx'
import { copy, seedOf } from '../../components/company/text.js'
import CareersGlobe from './CareersGlobe.jsx'
import { RowList, Rotator8, scrollToId } from './Parts.jsx'
import '../../styles/company-pages/careers.css'

// /careers/ — specs/careers.md. Standard banner + nav (no header spacer). Ends with the 560px pre-footer CTA
// (rendered here, before the site footer).

const ph = (field, key) => copy(field, seedOf(key))
// Spacer with heights not in the shared scale (>1280 / ≤1280 / ≤799).
const Sp = ({ d, md, sm }) => <div className="co-sp" aria-hidden="true" style={{ '--sp-d': `${d}px`, '--sp-md': `${md}px`, '--sp-sm': `${sm}px` }} />
const M = ({ children }) => <span className="cp-mondwest cr-mw">{children}</span>
const InlineIcon = ({ src, kind }) => <span className={`cr-ico cr-ico--${kind}`} aria-hidden="true"><img src={src} alt="" /></span>

// ---------- 1. Hero ----------
function Hero() {
  const { hero } = data
  const [img1, img2, img3, img4] = hero.images
  const [l1, l2, l3, l4] = hero.lines
  const box = (img, cls) => <span className={`cr-hero__img ${cls}`}><img src={img.src} alt={img.alt} width={img.w} height={img.h} /></span>
  return (
    <div className="co-grid-bg cr-hero">
      <div className="cp-fade cp-fade--top cr-hero__fade-top" aria-hidden="true" />
      <Spacer size="hero" />
      <div className="cr-hero__desktop">
        <p className="co-m14 cp-dim">{hero.eyebrow}</p>
        <Spacer size="s32" />
        <h1 className="co-sr-only">Help build the future of customer intelligence</h1>
        <div className="cr-hero__stack" aria-hidden="true">
          <div className="cr-hero__row">
            {box(img1, 'cr-hero__img--1')}
            <p className="cr-hero__line">{l1}</p>
            {box(img2, 'cr-hero__img--2')}
          </div>
          <p className="cr-hero__line cr-hero__line--2">{l2}</p>
          <p className="cr-hero__line cr-hero__line--3">{l3}</p>
          <div className="cr-hero__row cr-hero__row--4">
            {box(img3, 'cr-hero__img--3')}
            <p className="cr-hero__line">{l4}</p>
            {box(img4, 'cr-hero__img--4')}
          </div>
        </div>
      </div>
      <section className="co-container cr-hero__mobile">
        <div className="cr-hero__mrow">
          <h1 className="cr-hero__mh1">Help build the future of customer intelligence</h1>
          <img className="cr-hero__mimg" src={img2.src} alt="" />
        </div>
      </section>
      <div className="cr-hero__btns">
        <Button onClick={() => scrollToId('open-roles')}>{hero.button}</Button>
      </div>
      <Sp d={200} md={140} sm={140} />
      <div className="cp-fade cp-fade--bottom cr-hero__fade-bottom" aria-hidden="true" />
    </div>
  )
}

// ---------- 2. Sticky globe story ----------
function GlobeSlice() {
  const ref = useRef(null)
  const [p1, p2, p3] = data.globePanels
  const [star] = p2.icons
  const [working, understand] = p3.icons
  return (
    <div className="cr-gs" ref={ref}>
      <div className="cr-globe">
        <div className="cr-globe__fade cr-globe__fade--l" aria-hidden="true" />
        <div className="cr-globe__fade cr-globe__fade--r" aria-hidden="true" />
        <CareersGlobe triggerRef={ref} />
      </div>
      <div className="cr-panels">
        <div className="cr-panel">
          <div>
            <h2 className="co-h56 cr-panel__h2">
              Dovetail is building the Customer <M>Intelligence</M> Platform used by the world’s [<Rotator8 />] best orgs
            </h2>
            <p className="co-p20 cp-muted">{ph(p1.body, 'globe-1')}</p>
          </div>
        </div>
        <div className="cr-panel">
          <div>
            <h2 className="co-h56 cr-panel__h2">
              AI <InlineIcon src={star} kind="star" /> has been at our core <M>loooong</M> before it was mainstream
            </h2>
            <p className="co-p20 cp-muted">{ph(p2.body, 'globe-2')}</p>
          </div>
        </div>
        <div className="cr-panel">
          <div>
            <h2 className="co-h56 cr-panel__h2">
              Together, we’re all working <InlineIcon src={working} kind="working" /> to solve the same <M>problem...</M>
            </h2>
            <p className="co-h56 cr-panel__big">
              Helping companies better <InlineIcon src={understand} kind="understand" /> <M>understand</M> their customers.
            </p>
          </div>
        </div>
      </div>
      <div className="cr-gs__vfade" aria-hidden="true" />
    </div>
  )
}

// ---------- 3. Open positions ----------
const rename = (loc) => (loc === 'New York, United States (remote)' ? 'New York, USA (remote)' : loc)

function RadioGroup({ legend, name, options, value, onChange }) {
  return (
    <fieldset className="cr-filter">
      <legend className="co-sr-only">{legend}</legend>
      {options.map((o) => (
        <label key={o} className={`cr-radio co-m14${value === o ? ' is-checked' : ''}`}>
          <span className="cr-radio__box" aria-hidden="true" />
          <span className="cr-radio__text">{o}</span>
          <input className="cr-radio__input" type="radio" name={name} value={o} checked={value === o} onChange={() => onChange(o)} />
        </label>
      ))}
    </fieldset>
  )
}

function OpenPositions() {
  const op = data.openPositions
  const [team, setTeam] = useState(op.filters.team[0])
  const [loc, setLoc] = useState(op.filters.location[0])
  const groups = useMemo(() => op.groups
    .filter((g) => team === op.filters.team[0] || g.team === team)
    .map((g) => ({ ...g, jobs: g.jobs.filter((j) => loc === op.filters.location[0] || rename(j.location) === loc) }))
    .filter((g) => g.jobs.length), [team, loc, op])
  const anyJobs = op.groups.some((g) => g.jobs.length)
  return (
    <>
      <section className="co-grid cr-op" id="open-roles">
        <div className="cr-op__head">
          <h2 className="co-h64">{op.heading}</h2>
          <p className="co-p20 cp-muted cr-op__intro">{ph(op.intro, 'open-positions')}</p>
          <Sp d={64} md={0} sm={0} />
        </div>
        <div className="cr-op__filters">
          <hr className="co-hr" />
          <RadioGroup legend="Filter by team" name="team" options={op.filters.team} value={team} onChange={setTeam} />
          <hr className="co-hr" />
          <RadioGroup legend="Filter by location" name="location" options={op.filters.location.map(rename)} value={loc} onChange={setLoc} />
        </div>
        <div className="cr-op__jobs">
          {!anyJobs && <p className="co-h32 cr-op__none">There are currently no open roles.</p>}
          {groups.map((g) => (
            <div key={g.team}>
              <p className="co-h24 cr-op__team">{g.team}</p>
              <RowList rows={g.jobs.map((j) => ({ small: rename(j.location), title: j.title, href: j.href }))} />
            </div>
          ))}
        </div>
      </section>
      <Spacer size="hero" />
      <section className="co-container cr-talent">
        <p className="co-h24 cr-talent__h">{data.talent.heading}</p>
        <p className="co-p16 cp-muted cr-talent__p">{ph(data.talent.body, 'talent')}</p>
        <a className="co-ulink co-h18 cr-talent__link" href={data.talent.link.href} target="_blank" rel="noreferrer">{data.talent.link.label}</a>
      </section>
    </>
  )
}

// ---------- 4. People accordion ----------
function Person({ m, open, onToggle, bodyRef }) {
  const paras = m.paragraphs.map((p, i) => ph(p, `${m.name}-${i}`))
  const last = paras.length - 1
  return (
    <div className={`cr-person${open ? ' is-open' : ''}`}>
      <div className="cr-person__photo"><img src={m.photo} alt={m.name} /></div>
      <div className="cr-person__content">
        <button type="button" className="cr-person__btn" aria-expanded={open} onClick={onToggle}>
          <span className="cr-person__name">{m.name}</span>
          <span className="cr-person__row">
            <span className="cp-mondwest cr-person__role">{m.role}</span>
            <img className="cr-person__arrow" src="/assets/company/svg/careers-pixel-arrow.svg" alt="" />
          </span>
        </button>
        <div className="cr-person__body" ref={bodyRef} style={{ height: 0, opacity: 0 }}>
          {paras.map((t, i) => (
            <p key={i} className="co-p20 cp-muted">{i === 0 ? '“' : ''}{t}{i === last ? '”' : ''}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

function People() {
  const { people } = data
  const [open, setOpen] = useState(0)
  const bodies = useRef([])
  useLayoutEffect(() => {
    // Item 0 is open on load (set without animation).
    if (bodies.current[0]) gsap.set(bodies.current[0], { height: 'auto', opacity: 1 })
  }, [])
  const toggle = (i) => {
    const prev = open
    const next = open === i ? -1 : i
    if (prev >= 0) gsap.to(bodies.current[prev], { height: 0, opacity: 0, duration: 0.3, ease: 'power2.in', overwrite: true })
    if (next >= 0) gsap.to(bodies.current[next], { height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.out', overwrite: true })
    setOpen(next)
  }
  return (
    <section className="co-container cr-people">
      <h2 className="co-h80 cr-people__h2">
        Meet some of the humans<br className="cr-people__br" />
        <span className="cr-people__img" aria-hidden="true"><img src="/assets/company/media/meet-careers.png" alt="" /></span>
        {' '}behind the product
      </h2>
      <div className="cr-people__list">
        {people.members.map((m, i) => (
          <Person key={m.name} m={m} open={open === i} onToggle={() => toggle(i)} bodyRef={(el) => { bodies.current[i] = el }} />
        ))}
      </div>
    </section>
  )
}

// ---------- 5. Benefits ----------
function Benefits() {
  return (
    <section className="co-grid cr-ben">
      <div className="cr-ben__head">
        <h2 className="co-h64 cr-ben__h2">{data.benefitsHeading}</h2>
        {/* careers.json has no benefits intro field; spec gives a 165-char placeholder. */}
        <p className="co-p20 cp-muted cr-ben__p">{copy({ placeholder: true, chars: 165 }, seedOf('benefits'))}</p>
      </div>
      {data.benefits.map((b) => (
        <div className="cr-ben__item" key={b.index}>
          <p className="co-m14 cr-ben__idx">{b.index}</p>
          <div className="cr-ben__text">
            <p className="co-h18">{b.title}</p>
            <p className="co-p16 cp-muted">{ph(b.body, b.title)}</p>
          </div>
        </div>
      ))}
    </section>
  )
}

// ---------- 6. Video gallery ----------
const GALLERY_PLACEMENT = [
  { gridColumn: 'span 4', gridRow: '2 / span 16' },
  { gridColumn: '8 / span 4', gridRow: '1 / span 6' },
  { gridColumn: '7 / span 6', gridRow: '10 / span 8' },
]
function Gallery() {
  return (
    <div className="cr-gal">
      {data.gallery.map((g, i) => (
        <div key={g.youtubeId} className={`cr-gal__item cr-gal__item--${i + 1}`} style={GALLERY_PLACEMENT[i]}>
          <VideoCard youtubeId={g.youtubeId} image={g.image.src} title={g.caption} />
        </div>
      ))}
    </div>
  )
}

// ---------- 7. Values ----------
function ValueCard({ v }) {
  return (
    <div className="cr-val">
      <div className="cr-val__img"><img src={v.image.src} alt={v.image.alt} /></div>
      <h3 className="co-h18 cr-val__h3">{v.title}</h3>
      <p className="co-p16 cp-muted cr-val__p">{ph(v.body, v.title)}</p>
    </div>
  )
}
function Values() {
  const { values } = data
  return (
    <>
      <section className="co-container">
        <h2 className="co-h64 cr-values__h2">{values.heading}</h2>
        <p className="co-p20 cp-muted cr-values__p">{ph(values.intro, 'values')}</p>
        <Spacer size="s96" />
      </section>
      <div className="cr-values__carousel">
        <Carousel scrollerClassName="cr-values__scroller">
          <div className="cr-values__track">
            {values.posters.map((v) => <ValueCard key={v.title} v={v} />)}
          </div>
        </Carousel>
      </div>
      <section className="co-container cr-values__stack">
        {values.posters.map((v) => <ValueCard key={v.title} v={v} />)}
      </section>
    </>
  )
}

// ---------- 8. How we hire ----------
function Hiring() {
  return (
    <section className="co-container">
      <h2 className="co-h64 cr-hire__h2">{data.hiring.heading}</h2>
      <Sp d={96} md={48} sm={48} />
      <div className="cr-hire__grid">
        {data.hiring.steps.map((s) => (
          <div className="cr-hire__step" key={s.title}>
            <img className="cr-hire__icon" src={s.icon} alt="" />
            <div className="cr-hire__text">
              <p className="co-p20 cr-hire__title">{s.title}</p>
              <p className="co-p16 cp-muted">{ph(s.body, s.title)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ---------- 10. Pre-footer CTA ----------
function PreFooter() {
  const pf = data.prefooter
  return (
    <div className="cr-pre" style={{ backgroundImage: `url(${pf.background})` }}>
      <section className="co-grid">
        <div className="cr-pre__col">
          <h2 className="co-h64 cr-pre__h2">{pf.heading}</h2>
          <div className="co-btn-row cr-pre__btns">
            <Button onClick={() => scrollToId('open-roles')}>{pf.button.label}</Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function Careers() {
  usePageChrome({ navSpacer: false })
  return (
    <>
      <main className="co-main cp-main cr">
        <Hero />
        <GlobeSlice />
        <Spacer size="s200" />
        <OpenPositions />
        <Spacer size="s200" />
        <People />
        <Spacer size="s200" />
        <Benefits />
        <Spacer size="s200" />
        <Gallery />
        <Spacer size="s200" />
        <Values />
        <Spacer size="s200" />
        <Hiring />
        <Spacer size="s200" />
        <Faq items={data.faqs} seed={seedOf('careers-faq')} />
      </main>
      <PreFooter />
    </>
  )
}
