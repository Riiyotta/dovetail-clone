import data from '../../../data/marketing/the-best-never-guess.json'
import { usePageChrome } from '../../../chrome.jsx'
import { useBluePage, placeholder, InlineSvg } from '../shared.jsx'
import { DESKTOP_DECOR, MOBILE_DECOR } from './svgs.js'
import '../../../styles/campaigns/base.css'
import '../../../styles/campaigns/bng.css'

// /the-best-never-guess/ — specs/best-never-guess.md. Copy read verbatim from src/data/marketing/the-best-never-guess.json.

const sections = (slice) => data.sections.filter((s) => s.slice === slice)
const section = (slice) => sections(slice)[0]
const pick = (sec, el) => sec.content.filter((c) => c.el === el)
const spacers = data.sections.filter((s) => s.slice === 'Spacer').map((s) => s.height)
const Spacer = ({ i }) => {
  const h = spacers[i]
  return <div className="cmp-spacer" style={{ '--h': `${h['1440']}px`, '--h-md': `${h['1280']}px`, '--h-sm': `${h['768']}px` }} aria-hidden="true" />
}

// §1 CampaignNav (eciainh*)
function CampaignNav() {
  const [nav, mobileBar] = sections('CampaignNav')
  const [mark] = pick(nav, 'svg')
  const [cta] = pick(nav, 'a')
  const [mcta] = pick(mobileBar, 'a')
  return (
    <>
      <nav className="bng-nav" aria-label="Campaign navigation">
        <a className="bng-nav__logo" href="/" aria-label="Dovetail home"><img src={mark.src} alt="" width={mark.w} height={mark.h} /></a>
        <div className="bng-nav__right">
          <a className="cmp-btn cmp-btn--bng cmp-btn--black" href={cta.href}>{cta.text}</a>
        </div>
      </nav>
      {/* ≤799 fixed bottom CTA bar; its show/hide logic was not captured, so it is always shown at ≤799. */}
      <div className="bng-mbar">
        <div className="bng-mbar__fade" />
        <div className="bng-mbar__inner">
          <a className="cmp-btn cmp-btn--bng cmp-btn--black" href={mcta.href}>{mcta.text}</a>
        </div>
      </div>
    </>
  )
}

// §2 Hero: homepage final CTA structure (CLONE_SPEC §10) on blue, no ASCII field, no CTA footer, corner decorations.
// Logo files are this page's circular variants from the data file (match bng-top.jpg), not /assets/svg/cta-logo-*.
function Hero() {
  const sec = section('BngHero')
  const logos = pick(sec, 'svg').filter((s) => s.src.includes('e4352py'))
  const [salesforce, aws, canva, airwallex, notion, zapier, wise, breville] = logos
  const words = pick(sec, 'e4352py7').map((w) => w.text)
  const Logo = ({ l, cls }) => <span className={`bh-logo ${cls}`} data-intro-logo><img src={l.src} alt="" /></span>
  return (
    <section className="bh">
      {/* Decorations: static visible state; the mount fade (opacity 0→1, .25s, stagger .03, delay .66) is for the animation pass. */}
      <div className="bh-decor" aria-hidden="true">
        {DESKTOP_DECOR.map((m, i) => <InlineSvg key={`d${i}`} markup={m} className={`bh-decor__item bh-decor--d${i + 1}`} data-intro-decor />)}
        {MOBILE_DECOR.map((m, i) => <InlineSvg key={`m${i}`} markup={m} className={`bh-decor__item bh-decor--m${i + 1}`} data-intro-decor />)}
      </div>
      <div className="bh-fade" />
      <div className="bh-centre">
        <h1 className="cmp-sr">{pick(sec, 'visually-hidden')[0].text}</h1>
        <div className="bh-lift">
          <div className="bh-scale">
            <div className="bh-words" aria-hidden="true">
              <div className="bh-row" data-intro-row>
                <p className="bh-word bh-word--the">{words[0]}<Logo l={salesforce} cls="bh-logo--salesforce" /></p>
              </div>
              <div className="bh-row" data-intro-row>
                <p className="bh-word bh-word--best">
                  <Logo l={aws} cls="bh-logo--aws" />
                  <Logo l={canva} cls="bh-logo--canva" />
                  <span className="bh-word__text">{words[1]}</span>
                  <Logo l={airwallex} cls="bh-logo--airwallex" />
                </p>
              </div>
              <div className="bh-row" data-intro-row>
                <p className="bh-word bh-word--never">{words[2]}</p>
                <Logo l={notion} cls="bh-logo--notion" />
                <Logo l={zapier} cls="bh-logo--zapier" />
              </div>
              <div className="bh-row" data-intro-row>
                <Logo l={wise} cls="bh-logo--wise" />
                <Logo l={breville} cls="bh-logo--breville" />
                <p className="bh-word bh-word--guess">{words[3]}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Inline logo rotator; the CSS keyframes (6s ease-in-out) are left for the animation pass.
function Rotator({ logos, className, rowClass }) {
  return (
    <span className={className} aria-hidden="true">
      <span className={`${className}__col`} data-rotator>
        {logos.map((l, i) => <span key={i} className={rowClass}><img src={l.src} alt="" /></span>)}
      </span>
    </span>
  )
}

// §3 TextSlice (e29458r*)
function TextSlice() {
  const sec = section('BngTextSlice')
  const [decor] = pick(sec, 'img')
  const [h2] = pick(sec, 'e29458r7')
  const logos = pick(sec, 'svg')
  const [cta] = pick(sec, 'a')
  // Placeholder heading (~221 chars) with the bracketed rotator inline after the first clause.
  const text = placeholder(h2.text.chars)
  const cut = text.indexOf(' ', 48)
  return (
    <section className="bng-text">
      <div className="bng-text__decor"><img src={decor.src} alt="" /></div>
      <div className="cmp-container">
        <div className="bng-text__box">
          <h2 className="bng-text__h2">
            {text.slice(0, cut)} [ <Rotator logos={logos} className="bng-rot5" rowClass="bng-rot5__row" />
            <span className="cmp-sr">{logos.slice(0, 5).map((l) => l.ariaLabel).join(', ')}</span> ]{text.slice(cut)}
          </h2>
          <div className="bng-text__ctas">
            <a className="cmp-btn cmp-btn--bng cmp-btn--black" href={cta.href}>{cta.text}</a>
          </div>
        </div>
      </div>
    </section>
  )
}

// §4 Testimonial (et58vsw*)
function Testimonial() {
  const sec = section('BngTestimonial')
  const [mDecor] = pick(sec, 'img')
  const [photo, logo] = pick(sec, 'et58vsw6')
  return (
    <section className="bng-quote">
      <div className="bng-quote__mdecor"><img src={mDecor.src} alt="" /></div>
      <div className="cmp-container">
        <div className="cmp-grid">
          <div className="bng-quote__main">
            <blockquote className="bng-quote__text">{pick(sec, 'et58vsw2')[0].text}</blockquote>
            <p className="bng-quote__by">{pick(sec, 'et58vsw3')[0].text}</p>
          </div>
          <div className="bng-quote__side">
            <div className="bng-quote__pair">
              <div className="bng-quote__photo"><img src={photo.src} alt="" /></div>
              <div className="bng-quote__logo"><img src={logo.src} alt="" /></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// §5 Customer story cards (roles.md §7 card, black hover on this theme)
function storyCards(sec) {
  const cards = []
  sec.content.forEach((c) => {
    if (c.el === 'e1xybz549') cards.push({ href: c.href })
    const card = cards[cards.length - 1]
    if (c.role === 'img' && c.el === 'img') card[c.src.includes('white-logo') ? 'logo' : 'thumb'] = c
    if (c.el === 'e1xybz542') card.quoteChars = c.chars
    if (c.el === 'e1xybz5411') card.name = c.text
    if (c.el === 'e1xybz5412') card.title = c.text
    if (c.el === 'e1xybz5410' && c.text) card.heading = { text: c.text, href: c.href }
  })
  return cards
}

const CELLS = Array.from({ length: 49 }, (_, i) => i)
function StoryCard({ card }) {
  return (
    <div className="bng-card">
      <a className="bng-card__thumb" href={card.href}>
        <div className="bng-card__media">
          <div className="bng-card__img"><img src={card.thumb.src} alt="" /></div>
          <div className="bng-card__logo"><img src={card.logo.src} alt={card.logo.alt} /></div>
          {/* Pixel hover: cells show on hover (static state); the random 0.3s stagger is for the animation pass. */}
          <div className="bng-card__pixels" aria-hidden="true">
            {CELLS.map((i) => (
              <span key={i} className="bng-card__cell" style={{ '--r': Math.floor(i / 7), '--c': i % 7 }} />
            ))}
          </div>
          <div className="bng-card__overlay">
            <p className="bng-card__quote">“{placeholder(card.quoteChars)}”</p>
            <div>
              <p className="bng-card__name">{card.name}</p>
              <p className="bng-card__role">{card.title}</p>
            </div>
          </div>
        </div>
      </a>
      {card.heading && (
        <div className="bng-card__foot">
          <a className="bng-card__title" href={card.heading.href}>{card.heading.text}</a>
        </div>
      )}
    </div>
  )
}

function Stories() {
  const [grid, carousel] = sections('BngCustomerStories')
  return (
    <>
      <div className="bng-stories">
        <div className="cmp-container">
          <div className="cmp-grid bng-stories__grid">
            {storyCards(grid).map((c) => <StoryCard key={c.href} card={c} />)}
          </div>
        </div>
      </div>
      <div className="bng-stories-m">
        <div className="bng-stories-m__track">
          {storyCards(carousel).map((c) => <StoryCard key={c.href} card={c} />)}
        </div>
      </div>
    </>
  )
}

// §6 TeamSwitchSlice (e1268f4r*)
function TeamSwitch() {
  const sec = section('BngTeamSwitch')
  const imgs = pick(sec, 'img')
  const lines = pick(sec, 'e1268f4r10').map((l) => l.text)
  const logos = pick(sec, 'svg')
  const [h2b] = pick(sec, 'e1268f4r11')
  const stats = pick(sec, 'e1268f4r12')
  const labels = pick(sec, 'e1268f4r13')
  const [likeA, likeB] = lines[1].split('[]').map((s) => s.trim())
  return (
    <section className="bng-team">
      {imgs.map((d, i) => (
        <div key={d.src} className={`bng-team__decor bng-team__decor--${i + 1}`}><img src={d.src} alt="" /></div>
      ))}
      <div className="cmp-container">
        <div className="cmp-grid bng-team__grid">
          <div className="bng-team__h2wrap"><h2>{pick(sec, 'h2')[0].text}</h2></div>
          <div className="bng-team__line bng-team__line--1">{lines[0]}</div>
          <div className="bng-team__line bng-team__line--2">
            {likeA}
            <Rotator logos={logos} className="bng-rot4" rowClass="bng-rot4__row" />
            <span className="cmp-sr">{logos.slice(0, 4).map((l) => l.ariaLabel).join(', ')}</span>
            {likeB}
          </div>
          <div className="bng-team__line bng-team__line--3">{lines[2]}</div>
          <div className="bng-team__line bng-team__line--4">{lines[3]}</div>
          <h2 className="bng-team__h2b">{placeholder(h2b.text.chars)}</h2>
          <p className="bng-team__source">{pick(sec, 'p')[0].text}</p>
          {stats.map((s, i) => (
            <div key={s.text} className={`bng-team__stat bng-team__stat--${i + 1}`}>
              <p className="bng-team__num">{s.text}</p>
              <p className="bng-team__label">{labels[i].text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// §7 Form slice (e1yij67q*) — HubSpot embed rebuilt as a static, non-submitting form.
const FIELDS = [
  { name: 'firstname', label: 'First name*', type: 'text', autoComplete: 'given-name' },
  { name: 'lastname', label: 'Last name*', type: 'text', autoComplete: 'family-name' },
  { name: 'email', label: 'Company email*', type: 'email', autoComplete: 'email' },
  { name: 'company', label: 'Company name*', type: 'text', autoComplete: 'organization' },
  { name: 'jobtitle', label: 'Job title*', type: 'text', autoComplete: 'organization-title' },
]
function Field({ f }) {
  return (
    <div className="bng-form__field">
      <label htmlFor={`bng-${f.name}`}>{f.label}</label>
      <input id={`bng-${f.name}`} name={f.name} type={f.type} placeholder={f.label} autoComplete={f.autoComplete} required />
    </div>
  )
}
function FormSlice() {
  const sec = section('BngForm')
  const decor = pick(sec, 'img')
  const [h2] = pick(sec, 'e1yij67q4')
  const [h3] = pick(sec, 'e1yij67q5')
  const [l1, l2] = h2.text.split('\n')
  return (
    <section id="60-day-trial-offer" className="bng-formslice">
      <div className="bng-formslice__decor bng-formslice__decor--l"><img src={decor[0].src} alt="" /></div>
      <div className="bng-formslice__decor bng-formslice__decor--r"><img src={decor[1].src} alt="" /></div>
      <div className="cmp-container">
        <div className="cmp-grid bng-formslice__grid">
          <h2 className="bng-formslice__h2">{l1}<br />{l2}</h2>
          <div className="bng-formslice__right">
            <h3 className="bng-formslice__h3">{placeholder(h3.text.chars)}</h3>
            <div className="bng-form">
              <form onSubmit={(e) => e.preventDefault()} noValidate>
                <fieldset>
                  <Field f={FIELDS[0]} />
                  <Field f={FIELDS[1]} />
                </fieldset>
                {FIELDS.slice(2).map((f) => <Field key={f.name} f={f} />)}
                <div className="bng-form__actions">
                  {/* Submit label was not captured (HubSpot input value); neutral label used. */}
                  <input type="submit" className="bng-form__submit" value="Submit" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// §8 Footer (e1nbsdsv*)
function BngFooter() {
  const sec = section('BngFooter')
  const [cookie] = pick(sec, 'e1nbsdsv0').filter((c) => c.role === 'button')
  const links = pick(sec, 'e1nbsdsv0').filter((c) => c.role === 'link')
  return (
    <footer className="bng-footer">
      <div className="cmp-container">
        <div className="bng-footer__row">
          <div className="bng-footer__links">
            <button type="button" className="bng-footer__link bng-footer__link--btn">{cookie.text}</button>
            {links.map((l) => <a key={l.text} className="bng-footer__link" href={l.href}>{l.text}</a>)}
          </div>
          <div className="bng-footer__copy">{pick(sec, 'e1nbsdsv1')[0].text}</div>
        </div>
      </div>
    </footer>
  )
}

export default function BestNeverGuessPage() {
  // best-never-guess.md §0: no alert bar, no site nav, no site footer (own campaign nav + footer).
  usePageChrome({ banner: 'none', nav: 'none', navSpacer: false, footer: 'none' })
  useBluePage()
  return (
    <main className="bng">
      <CampaignNav />
      <Hero />
      <TextSlice />
      <Spacer i={0} />
      <Testimonial />
      <Spacer i={1} />
      <Stories />
      <Spacer i={2} />
      <TeamSwitch />
      <Spacer i={3} />
      <FormSlice />
      <BngFooter />
    </main>
  )
}
