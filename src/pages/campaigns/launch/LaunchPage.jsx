import { useState } from 'react'
import { usePageChrome } from '../../../chrome.jsx'
import { useBluePage, placeholder, InlineSvg, MaskIcon } from '../shared.jsx'
import { section, pick, textOf, spacers, spacerStyle } from './data.js'
import { heroPixels, glyphShipped, glyphAgents, glyphChannels, glyphEcosystem, glyphCta } from './svgs.js'
import SectionNav from './SectionNav.jsx'
import DigitalTwins from './DigitalTwins.jsx'
import Multiplayer from './Multiplayer.jsx'
import EnterpriseStack from './EnterpriseStack.jsx'
import Bullets from './Bullets.jsx'
import VideoModal from './VideoModal.jsx'
import '../../../styles/campaigns/base.css'
import '../../../styles/campaigns/launch.css'

// /launch/suns-out/ — specs/launch.md. Section order per §0; copy from src/data/marketing/launch__suns-out.json.

const Spacer = ({ i }) => <div className="cmp-spacer" style={spacerStyle(spacers[i])} aria-hidden="true" />

const PLAY_ICON = '/assets/marketing/svg/e4sdv0e19-056090.svg'
const KEYNOTE_PLAY_ICON = '/assets/marketing/svg/e1uk7pdk15-905180.svg'
const HERO_VIDEO_ID = 'f0adQ-1hnNc'
const KEYNOTE_VIDEO_ID = '8EP6vZF1Et4'

// §2 Hero
function Hero() {
  const sec = section('LaunchHero')
  const [mark] = pick(sec, 'e4sdv0e4')
  const [sun] = pick(sec, 'img')
  const [words0, words1] = pick(sec, 'e4sdv0e7')
  const intro = pick(sec, 'e4sdv0e11')[0]
  const links = pick(sec, 'a')
  const [video] = pick(sec, 'e4sdv0e16')
  const [playing, setPlaying] = useState(false)

  const onPlay = () => {
    // launch.md §2: at ≥768 smooth-scroll to innerHeight, then play the YouTube video in place.
    if (window.matchMedia('(min-width: 768px)').matches) window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
    setPlaying(true)
  }

  return (
    <div className="lx-hero">
      <section className="lx-hero__content">
        <div className="lx-hero__top">
          <div className="lx-hero__eyebrow">
            <MaskIcon src={mark.src} className="lx-hero__mark" />
            <p className="lx-hero__eyebrow-text">{textOf(sec, 'e4sdv0e5')}</p>
          </div>
          <h1 className="cmp-sr">{textOf(sec, 'visually-hidden')}</h1>
          <div className="lx-hero__title" aria-hidden="true">
            <InlineSvg markup={heroPixels} className="lx-hero__pixels" />
            <p className="lx-hero__word">{words0.text}</p>
            {/* Magnetic sun: motion (pointer-driven translate) left for the animation pass. */}
            <div className="lx-hero__sun" data-magnetic>
              <img src={sun.src} alt="" />
            </div>
            <p className="lx-hero__word">{words1.text}</p>
          </div>
        </div>
        <div className="cmp-grid">
          <div className="lx-hero__intro">
            <p className="lx-hero__intro-text">{placeholder(intro.chars)}</p>
            <div className="lx-cta-row">
              <a className="cmp-btn cmp-btn--primary" href={links[0].href}>{links[0].text}</a>
              <a className="cmp-btn cmp-btn--secondary" href={links[1].href}>{links[1].text}</a>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky video layer. Scroll scale (400/contentWidth → 1) is left for the animation pass: drive
          --lx-video-scale on .lx-hero__card; the play tile counter-scales from the same variable. */}
      <div className="lx-hero__sticky">
        <div className="cmp-container lx-hero__video-wrap">
          <div className="lx-hero__card" data-scroll-scale>
            {playing ? (
              <iframe
                className="lx-hero__video"
                src={`https://www.youtube.com/embed/${HERO_VIDEO_ID}?autoplay=1`}
                title="Dovetail Launch ’26 video"
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
              />
            ) : (
              <>
                <video className="lx-hero__video" src={video.src} poster={video.poster} autoPlay muted loop playsInline />
                <button type="button" className="lx-hero__play-btn" aria-label="Play video" onClick={onPlay} />
                <span className="lx-hero__play" aria-hidden="true">
                  <MaskIcon src={PLAY_ICON} className="lx-hero__play-icon" />
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// §3 Shipped
function Shipped() {
  const sec = section('LaunchShipped')
  const [sticker] = pick(sec, 'img')
  const start = sec.content.findIndex((c) => c.el === 'e1ot4t9i5') + 1
  const chips = sec.content.slice(start)
  return (
    <div id="launch-shipped" className="lx-anchor lx-shipped">
      <InlineSvg markup={glyphShipped} className="lx-glyph lx-glyph--shipped" />
      <div className="cmp-container">
        <div className="lx-shipped__title-wrap">
          <div className="lx-shipped__sticker"><img src={sticker.src} alt="" /></div>
          <p className="lx-shipped__title">{textOf(sec, 'e1ot4t9i3')}</p>
        </div>
        <p className="lx-shipped__sub">{textOf(sec, 'e1ot4t9i5')}</p>
        <div className="lx-chips">
          {chips.map((c, i) => {
            if (c.role === 'img') return <img key={i} className="lx-chip__icon" src={c.src} alt="" />
            if (c.role === 'link') return <a key={i} className="lx-chip lx-chip--link" href={c.href}>{c.text}</a>
            return <span key={i} className="lx-chip">{c.text}</span>
          })}
        </div>
      </div>
    </div>
  )
}

// Big section title row: 3D icon + giant word (agents / channels / enterprise share the grammar).
function TitleRow({ className, icon, iconClass, children }) {
  return (
    <div className={className}>
      <img className={iconClass} src={icon.src} alt="" />
      {children}
    </div>
  )
}

// §3 (table #3) Agents intro
function Agents() {
  const sec = section('LaunchAgents')
  const [bot] = pick(sec, 'e1osxjcu4')
  const [diagram] = pick(sec, 'e1osxjcu16')
  return (
    <section id="launch-agents" className="lx-anchor">
      <div className="cmp-container">
        <div className="lx-titleblock">
          <InlineSvg markup={glyphAgents} className="lx-glyph lx-glyph--agents" />
          <TitleRow className="lx-agents__title" icon={bot} iconClass="lx-agents__icon">
            <p className="lx-giant lx-giant--nowrap">{textOf(sec, 'e1osxjcu5')}</p>
          </TitleRow>
          <div className="cmp-grid lx-subtitle-grid">
            <p className="lx-h56 lx-subtitle lx-subtitle--agents">{textOf(sec, 'e1osxjcu7')}</p>
          </div>
        </div>
        <div id="launch-agents-autonomous" className="cmp-grid lx-feature lx-feature--agents">
          <div className="lx-feature__text lx-col-agents-text">
            <p className="lx-h56">{textOf(sec, 'e1osxjcu10')}</p>
            <p className="lx-p20 lx-mt24">{placeholder(pick(sec, 'e1osxjcu11')[0].chars)}</p>
            <Bullets sec={sec} arrowEl="e1osxjcu14" labelEl="e1osxjcu15" />
          </div>
          <div className="lx-col-agents-img">
            <img className="lx-img lx-img--agents" src={diagram.src} alt={diagram.alt} />
          </div>
        </div>
      </div>
    </section>
  )
}

// Channels intro
function Channels() {
  const sec = section('LaunchChannels')
  const [icon] = pick(sec, 'eeuo5qc4')
  const [img] = pick(sec, 'eeuo5qc16')
  return (
    <section id="launch-channels" className="lx-anchor">
      <div className="cmp-container">
        <div className="lx-titleblock">
          <InlineSvg markup={glyphChannels} className="lx-glyph lx-glyph--channels" />
          <div className="lx-titleblock__offset">
            <TitleRow className="lx-channels__title" icon={icon} iconClass="lx-channels__icon">
              <p className="lx-giant">
                {textOf(sec, 'eeuo5qc5')}
                <sup className="lx-channels__sup">{textOf(sec, 'eeuo5qc6')}</sup>
              </p>
            </TitleRow>
          </div>
          <div className="cmp-grid lx-subtitle-grid">
            <p className="lx-h56 lx-subtitle lx-subtitle--col6">{textOf(sec, 'eeuo5qc8')}</p>
          </div>
        </div>
        <div id="launch-channels-idea-to-pr" className="cmp-grid lx-feature lx-feature--channels">
          <div className="lx-feature__text lx-col-text-5">
            <p className="lx-h56">{textOf(sec, 'eeuo5qc10')}</p>
            <p className="lx-p20 lx-mt24">{placeholder(pick(sec, 'eeuo5qc11')[0].chars)}</p>
            <Bullets sec={sec} arrowEl="eeuo5qc14" labelEl="eeuo5qc15" />
          </div>
          <div className="lx-col-img-right">
            <img className="lx-img lx-img--616" src={img.src} alt={img.alt} />
          </div>
        </div>
      </div>
    </section>
  )
}

// Channels features (#launch-trends)
function ChannelsFeatures() {
  const sec = section('LaunchChannelsFeatures')
  const [img] = pick(sec, 'e2brdi72')
  const heading = textOf(sec, 'e2brdi73')
  const em = textOf(sec, 'em')
  // "Spot trends problems arise" + <em>before</em>: the em sits after "Spot trends".
  const [head0, head1] = [heading.slice(0, heading.indexOf(' problems')), heading.slice(heading.indexOf(' problems'))]
  const cardImgs = pick(sec, 'e2brdi710')
  const cardTitles = pick(sec, 'e2brdi711')
  const cardBodies = pick(sec, 'e2brdi712')
  const [beta] = pick(sec, 'e2brdi714')
  return (
    <section id="launch-trends" className="lx-anchor">
      <div className="cmp-container">
        <div className="cmp-grid lx-row-center">
          <div className="lx-col-img-left">
            <img className="lx-img lx-img--616" src={img.src} alt={img.alt} />
          </div>
          <div className="lx-col-text-right">
            <p className="lx-h56 lx-trends__heading">{head0} <em>{em}</em>{head1}</p>
            <p className="lx-p20 lx-mt24">{placeholder(pick(sec, 'e2brdi74')[0].chars)}</p>
            <Bullets sec={sec} arrowEl="e2brdi77" labelEl="e2brdi78" />
          </div>
        </div>
        <div className="cmp-grid lx-cards3">
          {cardTitles.map((t, i) => {
            const body = cardBodies[i]
            return (
              <div key={t.text} className="lx-card3" id={i === 2 ? 'launch-integrations' : undefined}>
                <img className="lx-img" src={cardImgs[i].src} alt={cardImgs[i].alt} />
                <p className="lx-card3__title">{t.text}</p>
                <p className="lx-card3__body">{body.placeholder ? placeholder(body.chars) : body.text}</p>
              </div>
            )
          })}
        </div>
        <p className="lx-h56 lx-beta">
          {textOf(sec, 'e2brdi713')}
          <a className="lx-beta__link" href={beta.href}>{beta.text}</a>
        </p>
      </div>
    </section>
  )
}

// Ecosystem
function Ecosystem() {
  const sec = section('LaunchEcosystem')
  const [chain] = pick(sec, 'e5j80f53')
  const subtitles = pick(sec, 'e5j80f59') // [md-only copy, desktop copy] — same text
  const bodies = pick(sec, 'e5j80f513') // [md-only 127, integrations 238, desktop 127, enrich 160]
  const imgs = pick(sec, 'e5j80f58')
  const heads = pick(sec, 'e5j80f512')
  return (
    <section id="launch-ecosystem" className="lx-anchor">
      <div className="cmp-container">
        <div className="lx-titleblock lx-titleblock--ecosystem">
          <InlineSvg markup={glyphEcosystem} className="lx-glyph lx-glyph--ecosystem" />
          <img className="lx-ecosystem__chain" src={chain.src} alt="" />
          <p className="lx-giant lx-ecosystem__title">{textOf(sec, 'e5j80f54')}</p>
        </div>
        <div className="lx-ecosystem__md-intro">
          <p className="lx-h56 lx-subtitle-text">{subtitles[0].text}</p>
          <p className="lx-p20 lx-mt24">{placeholder(bodies[0].chars)}</p>
        </div>
        <div className="cmp-grid lx-ecosystem__grid">
          <div className="lx-ecosystem__left">
            <div id="launch-ecosystem-integrations" className="lx-anchor lx-ecosystem__a">
              <img className="lx-img lx-img--508" src={imgs[0].src} alt={imgs[0].alt} />
              <p className="lx-h56 lx-mt32">{heads[0].text}</p>
              <p className="lx-p20 lx-mt24">{placeholder(bodies[1].chars)}</p>
            </div>
          </div>
          <div className="lx-ecosystem__right">
            <div className="lx-ecosystem__desk-intro">
              <p className="lx-h56 lx-subtitle-text">{subtitles[1].text}</p>
              <p className="lx-p20 lx-mt24">{placeholder(bodies[2].chars)}</p>
            </div>
            <div id="launch-ecosystem-enrich" className="lx-anchor lx-ecosystem__b">
              <img className="lx-img lx-img--508" src={imgs[1].src} alt={imgs[1].alt} />
              <p className="lx-h56 lx-mt32">{heads[1].text}</p>
              <p className="lx-p20 lx-mt24">{placeholder(bodies[3].chars)}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Enterprise
function Enterprise() {
  const sec = section('LaunchEnterprise')
  const [lock] = pick(sec, 'e1l1dk624')
  const [img] = pick(sec, 'e1l1dk6215')
  return (
    <section id="launch-enterprise" className="lx-anchor">
      <div className="cmp-container">
        <div className="lx-titleblock">
          <InlineSvg markup={glyphChannels} className="lx-glyph lx-glyph--enterprise" />
          <div className="lx-titleblock__offset">
            <TitleRow className="lx-enterprise__title" icon={lock} iconClass="lx-enterprise__icon">
              <p className="lx-giant">{textOf(sec, 'e1l1dk625')}</p>
            </TitleRow>
          </div>
          <div className="cmp-grid lx-subtitle-grid">
            <p className="lx-h56 lx-subtitle lx-subtitle--col6">{textOf(sec, 'e1l1dk627')}</p>
          </div>
        </div>
        <EnterpriseStack sec={sec} />
        <div id="launch-enterprise-context" className="cmp-grid lx-feature lx-feature--context">
          <div className="lx-feature__text lx-col-text-5">
            <p className="lx-h56 lx-context__heading">{textOf(sec, 'e1l1dk629')}</p>
            <p className="lx-p20 lx-mt24">{placeholder(pick(sec, 'e1l1dk6210')[0].chars)}</p>
            <Bullets sec={sec} arrowEl="e1l1dk6213" labelEl="e1l1dk6214" />
          </div>
          <div className="lx-col-img-right">
            <img className="lx-img lx-img--622" src={img.src} alt={img.alt} />
          </div>
        </div>
      </div>
    </section>
  )
}

// One way to work
function OneWay() {
  const sec = section('LaunchOneWay')
  const [img] = pick(sec, 'ecsil9t2')
  return (
    <section id="launch-one-way" className="lx-anchor">
      <div className="cmp-container">
        <p className="lx-h56 lx-oneway__title">{textOf(sec, 'ecsil9t1')}</p>
        <img className="lx-oneway__img" src={img.src} alt={img.alt} />
        <div className="cmp-grid lx-oneway__grid">
          <Bullets sec={sec} arrowEl="ecsil9t6" labelEl="ecsil9t7" className="lx-oneway__bullets" />
          <p className="lx-p20 lx-oneway__copy">{placeholder(pick(sec, 'ecsil9t8')[0].chars)}</p>
        </div>
      </div>
    </section>
  )
}

// Protected by default
function Protected() {
  const sec = section('LaunchProtected')
  const [img] = pick(sec, 'e120p5ma2')
  return (
    <section id="launch-protected" className="lx-anchor">
      <div className="cmp-container">
        <div className="cmp-grid lx-row-center">
          <div className="lx-col-img-left">
            <img className="lx-img lx-img--616 lx-protected__img" src={img.src} alt={img.alt} />
          </div>
          <div className="lx-col-text-right">
            <p className="lx-h56 lx-protected__heading">{textOf(sec, 'e120p5ma3')}</p>
            <p className="lx-p20 lx-protected__copy">{placeholder(pick(sec, 'e120p5ma4')[0].chars)}</p>
            <Bullets sec={sec} arrowEl="e120p5ma7" labelEl="e120p5ma8" />
          </div>
        </div>
      </div>
    </section>
  )
}

// CTA "The best [logo] never guess"
function Cta() {
  const sec = section('LaunchCta')
  const [h2] = pick(sec, 'e1uk7pdk1')
  const logos = pick(sec, 'svg').filter((s) => s.ariaLabel)
  const [keynote] = pick(sec, 'e1uk7pdk12')
  const links = pick(sec, 'a')
  const [open, setOpen] = useState(false)
  return (
    <section className="lx-cta">
      <div className="cmp-container">
        <h2 className="lx-cta__title">
          <span className="cmp-sr">{h2.text}</span>
          <span className="lx-cta__part" aria-hidden="true">{h2.parts[0].text}</span>
          <span className="lx-cta__slot" aria-hidden="true">
            <InlineSvg markup={glyphCta} className="lx-glyph lx-glyph--cta" />
            <span className="lx-cta__window">
              {/* Rotating column (16s keyframes in launch.md CTA CSS) left for the animation pass. */}
              <span className="lx-cta__reel" data-rotator>
                {logos.map((l, i) => (
                  <span className="lx-cta__logo" key={i}>
                    <img src={l.src} alt={i < logos.length / 2 ? l.ariaLabel : ''} />
                  </span>
                ))}
              </span>
            </span>
          </span>
          <span className="lx-cta__part" aria-hidden="true">{h2.parts[1].text}</span>
        </h2>
        <div className="cmp-grid lx-cta__grid">
          <button type="button" className="lx-keynote" aria-label={keynote.ariaLabel} onClick={() => setOpen(true)}>
            <span className="lx-keynote__label">
              <span className="lx-keynote__play"><MaskIcon src={KEYNOTE_PLAY_ICON} className="lx-keynote__play-icon" /></span>
              <span className="lx-keynote__text">{keynote.ariaLabel}</span>
            </span>
          </button>
          <div className="lx-cta__copy">
            <p className="lx-cta__p">{placeholder(pick(sec, 'e1uk7pdk8')[0].chars)}</p>
            <div className="lx-cta-row">
              <a className="cmp-btn cmp-btn--primary" href={links[0].href}>{links[0].text}</a>
              <a className="cmp-btn cmp-btn--secondary" href={links[1].href}>{links[1].text}</a>
            </div>
          </div>
        </div>
      </div>
      {open && <VideoModal videoId={KEYNOTE_VIDEO_ID} title={keynote.ariaLabel} onClose={() => setOpen(false)} />}
    </section>
  )
}

// §12 Footer
const SOCIAL_LABELS = ['LinkedIn', 'X', 'Instagram', 'YouTube'] // launch.md §12 order
function Footer() {
  const sec = section('LaunchFooter')
  const [cookie] = pick(sec, 'e1560hmp4').filter((c) => c.role === 'button')
  const [legal] = pick(sec, 'e1560hmp4').filter((c) => c.role === 'link')
  const icons = pick(sec, 'svg')
  return (
    <footer className="lx-footer">
      <div className="cmp-container">
        <div className="lx-footer__row">
          <div className="lx-footer__copy">{textOf(sec, 'e1560hmp2')}</div>
          <div className="lx-footer__links">
            <button type="button" className="lx-footer__link">{cookie.text}</button>
            <a className="lx-footer__link" href={legal.href}>{legal.text}</a>
          </div>
          <div className="lx-footer__social">
            <span>{textOf(sec, 'e1560hmp6')}</span>
            <div className="lx-footer__icons">
              {icons.map((ic, i) => (
                // Social hrefs were not captured in the data file.
                <a key={ic.src} className="lx-footer__icon" href="#" aria-label={SOCIAL_LABELS[i]}>
                  <img src={ic.src} alt="" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function LaunchPage() {
  // launch.md intro + screenshot: the standard site nav is present (transparent), no alert bar, no site footer.
  // The hero's -88px margin slides under the nav, so the 88px spacer is off.
  usePageChrome({ banner: 'none', nav: 'default', navSpacer: false, footer: 'none' })
  useBluePage()
  return (
    <main className="lx">
      <SectionNav />
      <Hero />
      <Spacer i={0} />
      <Shipped />
      <Spacer i={1} />
      <Agents />
      <Spacer i={2} />
      <DigitalTwins />
      <Spacer i={3} />
      <Multiplayer />
      <Spacer i={4} />
      <Channels />
      <Spacer i={5} />
      <ChannelsFeatures />
      <Spacer i={6} />
      <Ecosystem />
      <Spacer i={7} />
      <Enterprise />
      <Spacer i={8} />
      <OneWay />
      <Spacer i={9} />
      <Protected />
      <Spacer i={10} />
      <Cta />
      <Spacer i={11} />
      <Footer />
    </main>
  )
}
