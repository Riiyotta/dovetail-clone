import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import data from '../../data/company/aws-summit-sydney-2026.json'
import customers from '../../data/company/customers.json'
import { usePageChrome } from '../../chrome.jsx'
import Icon from '../../components/company/Icon.jsx'
import Carousel from '../../components/company/Carousel.jsx'
import RowList from '../../components/company/RowList.jsx'
import StoryCard from '../../components/company/StoryCard.jsx'
import PixelTransitionSlice from '../../components/marketing/PixelTransitionSlice.jsx'
import { copy, seedOf } from '../../components/company/text.js'
import decoTL from '../../../public/assets/company/svg/aws-deco-hero-top-left.svg?raw'
import decoTR from '../../../public/assets/company/svg/aws-deco-hero-top-right.svg?raw'
import decoBL from '../../../public/assets/company/svg/aws-deco-hero-bottom-left.svg?raw'
import decoBR from '../../../public/assets/company/svg/aws-deco-hero-bottom-right.svg?raw'
import decoM1 from '../../../public/assets/company/svg/aws-deco-hero-mobile-1.svg?raw'
import decoM2 from '../../../public/assets/company/svg/aws-deco-hero-mobile-2.svg?raw'
import decoM3 from '../../../public/assets/company/svg/aws-deco-hero-mobile-3.svg?raw'
import decoM4 from '../../../public/assets/company/svg/aws-deco-hero-mobile-4.svg?raw'
import '../../styles/company-pages/aws.css'

// /aws-summit-sydney-2026/ — specs/campaign-aws-summit.md. Standalone: no banner, no site nav/footer; the page renders
// its own nav (inside <main>) and footer, on a #0044FF document.

const SVG = '/assets/company/svg'
const ph = (chars, key) => copy({ placeholder: true, chars }, seedOf(key))
const sec = (cls, i = 0) => data.sections.filter((s) => s.cls === cls)[i]

// Spacer with per-breakpoint heights (>1280 / ≤1280 / ≤799).
const Sp = ({ d, md, sm = md }) => <div className="co-sp" aria-hidden="true" style={{ '--sp-d': `${d}px`, '--sp-md': `${md}px`, '--sp-sm': `${sm}px` }} />
const Raw = ({ markup, className }) => <span className={className} aria-hidden="true" dangerouslySetInnerHTML={{ __html: markup }} />
const Deco = ({ src, className }) => <img className={`aw-deco ${className}`} src={src} alt="" aria-hidden="true" />

// Paints the document blue while mounted.
function useBlueDocument() {
  useLayoutEffect(() => {
    const html = document.documentElement
    html.dataset.page = 'aws-summit'
    return () => { delete html.dataset.page }
  }, [])
}

// ---------- 0. Campaign nav + mobile sticky bar ----------
function NavButtons({ className = '' }) {
  return (
    <>
      <a className={`aw-btn aw-btn--white ${className}`} href="#careers-slice">Join the team</a>
      <a className={`aw-btn aw-btn--black ${className}`} href="#60-day-trial-offer">Get 60 days full access</a>
    </>
  )
}
function CampaignNav() {
  return (
    <>
      <nav className="aw-nav" aria-label="Campaign navigation">
        <a className="aw-nav__logo" href="/" aria-label="Dovetail home"><Icon src={`${SVG}/aws-nav-wordmark.svg`} className="aw-nav__mark" /></a>
        <div className="aw-nav__right"><NavButtons /></div>
      </nav>
      {/* ≤799 fixed CTA bar. Its hide/show trigger was not observed (spec gap), so it stays in the visible state. */}
      <div className="aw-mbar">
        <div className="aw-mbar__fade" aria-hidden="true" />
        <div className="aw-mbar__inner"><NavButtons /></div>
      </div>
    </>
  )
}

// ---------- 1. Hero ("The best never guess", CLONE_SPEC §10 mechanics, this page's tile positions) ----------
const tile = (name, file) => ({ name, src: `/assets/svg/cta-logo-${file}.svg` })
const T = {
  salesforce: tile('salesforce', 'theright-salesforce'),
  aws: tile('aws', 'bestfarleft-aws'),
  canva: tile('canva', 'bestleft-canva'),
  airwallex: tile('airwallex', 'bestright-airwallex'),
  notion: tile('notion', 'neverright-notion'),
  zapier: tile('zapier', 'neverfarright-zapier'),
  wise: tile('wise', 'guessleft-wise'),
  breville: tile('breville', 'guessfarleft-breville'),
}
const Tile = ({ t }) => <span className={`aw-tile aw-tile--${t.name}`} data-tile={t.name}><img src={t.src} alt="" /></span>
// GSAP tile stagger order (CLONE_SPEC §10).
const TILE_ORDER = ['aws', 'canva', 'airwallex', 'notion', 'wise', 'breville', 'salesforce', 'zapier']

function Hero() {
  const ref = useRef(null)
  const [the, best, never, guess] = sec('css-62vsu3').texts
  useLayoutEffect(() => {
    const root = ref.current
    if (!root) return undefined
    const ctx = gsap.context(() => {
      const rows = root.querySelectorAll('.aw-row')
      const tiles = TILE_ORDER.map((n) => root.querySelector(`[data-tile="${n}"]`))
      const decos = root.querySelectorAll('.aw-hdeco')
      gsap.set(tiles, { scale: 0.82 })
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })
      tl.to(rows, { opacity: 1, duration: 0.35, stagger: 0.06 })
        .to(tiles, { opacity: 1, scale: 1, duration: 0.3, stagger: 0.04 }, '-=0.25')
        // Decorations: observed only (source not recovered) — ~0.6s fade each, ~0.1s stagger, TL, TR, then the bottom pair.
        .to(decos, { opacity: 1, duration: 0.6, stagger: 0.1 })
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section className="aw-hero" ref={ref}>
      <div className="aw-hero__fade" aria-hidden="true" />
      <Raw markup={decoTL} className="aw-hdeco aw-hdeco--d aw-hdeco--tl" />
      <Raw markup={decoTR} className="aw-hdeco aw-hdeco--d aw-hdeco--tr" />
      <Raw markup={decoBL} className="aw-hdeco aw-hdeco--d aw-hdeco--bl" />
      <Raw markup={decoBR} className="aw-hdeco aw-hdeco--d aw-hdeco--br" />
      <Raw markup={decoM1} className="aw-hdeco aw-hdeco--m aw-hdeco--m1" />
      <Raw markup={decoM2} className="aw-hdeco aw-hdeco--m aw-hdeco--m2" />
      <Raw markup={decoM3} className="aw-hdeco aw-hdeco--m aw-hdeco--m3" />
      <Raw markup={decoM4} className="aw-hdeco aw-hdeco--m aw-hdeco--m4" />
      <div className="aw-hero__words">
        <div className="aw-hero__lift">
          <h1 className="co-sr-only">{sec('css-62vsu3').headings[0].text}</h1>
          <div className="aw-hero__scale">
            <div className="aw-stack" aria-hidden="true">
              <div className="aw-row">
                <p className="aw-word aw-word--the">{the}<Tile t={T.salesforce} /></p>
              </div>
              <div className="aw-row">
                <p className="aw-word aw-word--best"><Tile t={T.aws} /><Tile t={T.canva} />{best}<Tile t={T.airwallex} /></p>
              </div>
              <div className="aw-row">
                <p className="aw-word aw-word--never">{never}</p>
                <Tile t={T.notion} />
                <Tile t={T.zapier} />
              </div>
              <div className="aw-row">
                <Tile t={T.wise} />
                <Tile t={T.breville} />
                <p className="aw-word aw-word--guess">{guess}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------- rotators ----------
function Rotator({ items, kind }) {
  const slots = [...items, ...items]
  return (
    <span className={`aw-rot aw-rot--${kind}`} aria-hidden="true">
      <span className="aw-rot__col">
        {slots.map((src, i) => <span className="aw-rot__slot" key={i}><img src={src} alt="" /></span>)}
      </span>
    </span>
  )
}

// ---------- 2. Text slice ----------
const TEXT_ROT = ['airwallex', 'lovable', 'qantas', 'shopify', 'wise'].map((n) => `${SVG}/aws-text-rotator-${n}.svg`)
function TextSlice() {
  const s = sec('css-79elbk', 0)
  const text = copy(s.headings[0].text, seedOf('aws-text'))
  // Placement of the [ rotator ] inside the (placeholder) heading isn't recorded; it follows the first clause here.
  const cut = text.indexOf(' ', 60)
  return (
    <div className="aw-text">
      <img className="aw-deco aw-text__deco" src={s.images[0].src} alt="" aria-hidden="true" />
      <section className="aw-container">
        <div className="aw-text__box">
          <h2 className="aw-text__h2">
            {text.slice(0, cut)} [ <Rotator items={TEXT_ROT} kind="text" /> ]{text.slice(cut)}
          </h2>
          <div className="co-btn-row">
            <a className="aw-btn aw-btn--black" href={s.links[0].href}>{s.links[0].label}</a>
          </div>
        </div>
      </section>
    </div>
  )
}

// ---------- 3. Testimonial ----------
function Testimonial() {
  const s = data.sections[2]
  const [mDeco, photo, logo] = s.images
  return (
    <div className="aw-quote">
      <Deco src={mDeco.src} className="aw-quote__mdeco" />
      <section className="aw-container aw-grid">
        <div className="aw-quote__main">
          <blockquote className="aw-quote__text">{s.headings[0].text}</blockquote>
          <p className="co-h24 aw-quote__by">{s.texts[0]}</p>
        </div>
        <div className="aw-quote__side">
          <span className="aw-quote__photo"><img src={photo.src} alt="" /></span>
          <span className="aw-quote__logo"><img src={logo.src} alt="Breville" /></span>
        </div>
      </section>
    </div>
  )
}

// ---------- 4. Customer stories ----------
function Stories() {
  const s = data.sections[3]
  const hrefs = [...new Set(s.links.map((l) => l.href))]
  const stories = hrefs.map((h) => customers.storyCards.find((c) => c.href === h)).filter(Boolean)
  return (
    <>
      <section className="aw-container aw-grid aw-stories">
        {stories.map((st) => <div className="aw-stories__cell" key={st.href}><StoryCard story={st} tone="black" /></div>)}
      </section>
      <div className="aw-stories-m">
        <Carousel bg="var(--aw-blue)">
          <div className="aw-stories-m__track">
            {stories.map((st) => <StoryCard key={st.href} story={st} tone="black" />)}
          </div>
        </Carousel>
      </div>
    </>
  )
}

// ---------- 5. Team switch ----------
const TEAM_ROT = ['notion', 'canva', 'itau', 'zapier'].map((n) => `${SVG}/aws-team-rotator-${n}.svg`)
function TeamSwitch() {
  const s = sec('css-79elbk', 2)
  const [source, ...rest] = s.texts
  const stats = [[rest[0], rest[1]], [rest[2], rest[3]], [rest[4], rest[5]]]
  const [dLeft, dRightTop, dRightBottom, mBottomLeft, mCenterRight] = s.images
  return (
    <div className="aw-team">
      <Deco src={dLeft.src} className="aw-team__deco aw-team__deco--l" />
      <Deco src={dRightTop.src} className="aw-team__deco aw-team__deco--rt" />
      <Deco src={dRightBottom.src} className="aw-team__deco aw-team__deco--rb" />
      <Deco src={mBottomLeft.src} className="aw-team__mdeco aw-team__mdeco--bl" />
      <Deco src={mCenterRight.src} className="aw-team__mdeco aw-team__mdeco--cr" />
      <section className="aw-container aw-grid aw-team__grid">
        <h2 className="aw-team__h2">{s.headings[0].text}</h2>
        <p className="aw-line aw-line--1">Why teams</p>
        <p className="aw-line aw-line--2">like <Rotator items={TEAM_ROT} kind="team" /> are</p>
        <p className="aw-line aw-line--3">innovating with</p>
        <p className="aw-line aw-line--4">↳ Dovetail</p>
        <h2 className="aw-team__h2b">{copy(s.headings[1].text, seedOf('aws-team'))}</h2>
        <p className="co-m14 aw-team__source">{source}</p>
        {stats.map(([value, label], i) => (
          <div className={`aw-stat aw-stat--${i + 1}`} key={value}>
            <p className="aw-stat__value">{value}</p>
            <p className="aw-stat__label">{label}</p>
          </div>
        ))}
      </section>
    </div>
  )
}

// ---------- 6. 60-day trial form (underline HubSpot variant, static) ----------
function TrialForm() {
  const s = sec('css-79elbk', 3)
  const [l1, l2] = s.headings[0].text.split(/(?<=\.)(?=\S)/)
  const [termsLink, privacyLink] = s.links
  const fields = data.form.fields.filter((f) => f.type !== 'submit')
  const submit = data.form.fields.find((f) => f.type === 'submit')
  const legal = ph(252 - termsLink.label.length - privacyLink.label.length - 8, 'aws-legal')
  const half = legal.indexOf(' ', Math.floor(legal.length / 2))
  return (
    <div className="aw-formslice" id="60-day-trial-offer">
      <Deco src={s.images[0].src} className="aw-formslice__deco aw-formslice__deco--bl" />
      <Deco src={s.images[1].src} className="aw-formslice__deco aw-formslice__deco--br" />
      <Deco src={s.images[2].src} className="aw-formslice__mdeco" />
      <section className="aw-container aw-grid aw-formslice__grid">
        <h2 className="co-h64 aw-formslice__h2">{l1}<br />{l2}</h2>
        <div className="aw-formslice__col">
          <h3 className="aw-formslice__h3">{copy(s.headings[1].text, seedOf('aws-form'))}</h3>
          <form className="aw-form" onSubmit={(e) => e.preventDefault()} noValidate>
            {fields.map((f) => (
              <fieldset className="aw-form__fs" key={f.name}>
                <label className="co-sr-only" htmlFor={`aws-${f.name}`}>{f.label}{f.required ? '*' : ''}</label>
                <input className="aw-input" id={`aws-${f.name}`} name={f.name} type={f.type} placeholder={f.placeholder} required={f.required} />
              </fieldset>
            ))}
            <p className="aw-form__legal">
              {legal.slice(0, half)} <a href={termsLink.href}>{termsLink.label}</a>{legal.slice(half, -1)} <a href={privacyLink.href}>{privacyLink.label}</a>.
            </p>
            <input className="aw-btn aw-btn--black aw-form__submit" type="submit" value={submit.value} />
          </form>
        </div>
      </section>
    </div>
  )
}

// ---------- 7. Careers block + 8. footer ----------
function Careers() {
  const s = data.sections[7]
  const [deco, mDeco, ...photos] = s.images
  const photoSrcs = photos.slice(0, 6).map((p) => p.src)
  const [h2] = s.headings
  const [before, after] = h2.text.split('[]').map((t) => t.trim())
  const [body, roleTitle, referral] = s.texts
  const [roleLink, referLink, trust, legal] = s.links
  return (
    <div id="careers-slice" className="aw-careers">
      <Sp d={160} md={64} />
      <div className="aw-careers__sec">
        <Deco src={deco.src} className="aw-careers__deco" />
        <Deco src={mDeco.src} className="aw-careers__mdeco" />
        <section className="aw-container aw-grid aw-careers__grid">
          <div className="aw-careers__left">
            <h2 className="co-h64 aw-careers__h2">{before} <Rotator items={photoSrcs} kind="photo" /> {after}</h2>
            <p className="aw-careers__p">{body}</p>
          </div>
          <div className="aw-careers__roles">
            <h3 className="aw-careers__h3">{s.headings[1].text}</h3>
            <RowList rows={[{ small: 'Sydney', title: roleTitle, href: roleLink.href }]} />
          </div>
          <div className="aw-careers__refer">
            <p className="aw-careers__referp">{copy(referral, seedOf('aws-refer'))}</p>
            <a className="aw-btn aw-btn--white" href={referLink.href} target="_blank" rel="noreferrer">{referLink.label}</a>
          </div>
        </section>
      </div>
      <footer className="aw-footer">
        <div className="aw-container">
          <div className="aw-footer__row co-m14">
            <div className="aw-footer__links">
              <button type="button" className="aw-footer__link">Cookie preferences</button>
              <a className="aw-footer__link" href={trust.href} target="_blank" rel="noreferrer">{trust.label}</a>
              <a className="aw-footer__link" href={legal.href}>{legal.label}</a>
            </div>
            <p className="aw-footer__copy">©2026 Dovetail</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function AwsSummit() {
  usePageChrome({ banner: 'none', nav: 'none', footer: 'none', navSpacer: false })
  useBlueDocument()
  return (
    <>
      <a className="aw-skip" href="#main-content">Skip to content</a>
      <main id="main-content" className="aw">
        <CampaignNav />
        <Hero />
        <TextSlice />
        <Sp d={224} md={96} />
        <Testimonial />
        <Sp d={96} md={40} />
        <Stories />
        <Sp d={246} md={96} />
        <TeamSwitch />
        <Sp d={246} md={64} />
        <TrialForm />
        <Sp d={246} md={96} />
        <Sp d={246} md={246} />
        <PixelTransitionSlice position="top" pixelSize={100} sectionHeight={320}>
          <Careers />
        </PixelTransitionSlice>
      </main>
    </>
  )
}
