import { Fragment } from 'react'
import { usePageChrome } from '../../chrome.jsx'
import { CtaButtons, Spacer, useTitle } from '../../components/tools/ui.jsx'
import { txt } from '../../components/tools/placeholder.js'
import LogoMarquee from '../../components/tools/LogoMarquee.jsx'
import Faq from '../../components/tools/Faq.jsx'
import '../../styles/tools/template-landing.css'

// specs/template-landing.md — renders data.sections[] in order.

function Hero({ s, seed }) {
  return (
    <div className="tl-hero">
      <div className="tl-hero__fade tl-hero__fade--top" aria-hidden="true" />
      <div className="tl-hero__fade tl-hero__fade--bottom" aria-hidden="true" />
      <div className="tl-hero__content">
        <Spacer d={96} md={56} sm={56} />
        <section className="t-grid">
          <div className="tl-hero__head">
            <p className="t-eyebrow">{s.eyebrow}</p>
            <h1 className="tl-hero__h1">{s.h1}</h1>
            <p className="t-p20 tl-hero__intro">{txt(s.intro, seed)}</p>
            <CtaButtons ctas={s.ctas} className="t-cta-row--center" />
          </div>
          <div className="tl-hero__media">
            <Spacer d={96} md={56} sm={56} />
            <img className="tl-img" src={s.image.src} alt={s.image.alt} />
          </div>
        </section>
        <Spacer d={160} md={96} sm={96} />
      </div>
    </div>
  )
}

function CenteredIntro({ s, seed }) {
  return (
    <section className="tl-sect">
      <div className="tl-ci">
        <p className="t-eyebrow">{s.eyebrow}</p>
        <h2 className="t-h40">{s.h2}</h2>
        <p className="t-p16 t-grey tl-mt16">{txt(s.p, seed)}</p>
      </div>
    </section>
  )
}

function Split({ s, seed }) {
  const left = s.imageSide === 'left'
  const text = (
    <div className={`tl-split__text ${left ? 'tl-split__text--r' : 'tl-split__text--l'}`}>
      <p className="t-eyebrow">{s.eyebrow}</p>
      <h2 className="t-h40">{s.h2}</h2>
      <p className="t-p16 t-grey tl-mt16">{txt(s.p, seed)}</p>
    </div>
  )
  const img = (
    <div className={`tl-split__img ${left ? 'tl-split__img--l' : 'tl-split__img--r'}`}>
      <img className="tl-img" src={s.image.src} alt={s.image.alt} />
    </div>
  )
  return <section className="tl-sect">{left ? <>{img}{text}</> : <>{text}{img}</>}</section>
}

function Checklist({ s }) {
  return (
    <section className="t-grid">
      <div className="tl-cl__head">
        <h2 className="t-h40">{s.h2}</h2>
        <p className="t-p16 t-grey tl-mt16">{s.p}</p>
      </div>
      <div className="tl-cl__body">
        <Spacer d={96} />
        <div className="tl-cl__grid">
          {s.items.map((it) => (
            <div key={it.title} className="tl-cl__item">
              <h3 className="t-h20">{it.title}</h3>
              <p className="t-p16 t-grey">{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Spacers that precede each section type (desktop / ≤1280 / ≤799).
const BEFORE = {
  logoMarquee: [120, 64, 64],
  centeredIntro: [56, 56, 56],
  checklistGrid: [96, 96, 96],
  faq: [96, 48, 48],
}

export default function TemplateLanding({ data }) {
  usePageChrome({ theme: 'dark', footer: 'default', navSpacer: false })
  useTitle(data.meta.title)
  return (
    <main className="t-page">
      {data.sections.map((s, i) => {
        const sp = BEFORE[s.type]
        let el = null
        if (s.type === 'hero') el = <Hero s={s} seed={i} />
        else if (s.type === 'logoMarquee') el = <LogoMarquee data={s} />
        else if (s.type === 'centeredIntro') el = <CenteredIntro s={s} seed={i} />
        else if (s.type === 'split') el = <Split s={s} seed={i} />
        else if (s.type === 'checklistGrid') el = <Checklist s={s} />
        else if (s.type === 'faq') el = <Faq data={s} />
        return (
          <Fragment key={i}>
            {sp && <Spacer d={sp[0]} md={sp[1]} sm={sp[2]} />}
            {el}
          </Fragment>
        )
      })}
      <Spacer d={96} md={48} sm={48} />
    </main>
  )
}
