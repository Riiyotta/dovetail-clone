import { usePageChrome } from '../../chrome.jsx'
import FaqSlice from '../../components/marketing/FaqSlice.jsx'
import TestimonialSlice from '../../components/marketing/TestimonialSlice.jsx'
import CompactLogoSlice from '../../components/marketing/CompactLogoSlice.jsx'
import { Eyebrow, MaskIcon, MkButton, Spacer, ctaProps, txt, usePageTitle } from './common.jsx'
import '../../styles/roles/solutions.css'

// specs/solutions.md — one component for the four /solutions/* pages; section order from the data file.

const byRole = (content, role) => content.filter((c) => c.role === role)
const TRIAL_ID = 'trial-cta'

// Hero/section CTAs link to #trial-cta; the click is intercepted and smooth-scrolls there.
function CtaLink({ link, variant }) {
  if (link.href === `#${TRIAL_ID}`) {
    const onClick = (e) => {
      e.preventDefault()
      document.getElementById(TRIAL_ID)?.scrollIntoView({ behavior: 'smooth' })
    }
    return <MkButton variant={variant} href={link.href} onClick={onClick}>{link.text}</MkButton>
  }
  return <MkButton variant={variant} {...ctaProps(link)}>{link.text}</MkButton>
}

function CtaRow({ links, className }) {
  return (
    <div className={className}>
      {links.map((l, i) => <CtaLink key={i} link={l} variant={i === 0 ? 'primary' : 'secondary'} />)}
    </div>
  )
}

function SolutionHero({ section, seed }) {
  const c = section.content
  const texts = byRole(c, 'text')
  const eyebrow = texts.find((t) => t.el.startsWith('e18o1u1v2'))
  const sub = texts.find((t) => t.el === 'e18o1u1v4')
  const note = texts.find((t) => t.el === 'eccoft01')
  return (
    <div className="sh">
      <div className="sh__fade sh__fade--top" aria-hidden="true" />
      <div className="sh__fade sh__fade--bottom" aria-hidden="true" />
      <div className="sh__content">
        <div className="sh__sp-top" />
        <div className="mk-grid">
          <div className="sh__col">
            <Eyebrow>{txt(eyebrow)}</Eyebrow>
            <h1 className="sh__h1">{txt(c.find((i) => i.role === 'h1'))}</h1>
            {sub && <p className="sh__sub">{txt(sub, seed)}</p>}
            <CtaRow links={byRole(c, 'link')} className="sh__btns" />
            {note && <p className="sh__note">{txt(note)}</p>}
          </div>
        </div>
        <div className="sh__sp-bottom" />
      </div>
    </div>
  )
}

function SolutionSection({ section, seed }) {
  const c = section.content
  const img = c.find((i) => i.role === 'img')
  const eyebrow = c.find((i) => i.el.startsWith('eccoft05'))
  const h2 = c.find((i) => i.role === 'h2')
  const p = c.find((i) => i.el === 'eccoft07')
  const links = byRole(c, 'link')
  if (!img) {
    return (
      <section className="ss">
        <div className="ss__center">
          {eyebrow && <Eyebrow>{txt(eyebrow)}</Eyebrow>}
          <h2 className="mk-h40 ss__h2">{txt(h2)}</h2>
          {p && <p className="ss__p">{txt(p, seed)}</p>}
          <CtaRow links={links} className="ss__btns ss__btns--center" />
        </div>
      </section>
    )
  }
  // DOM order from the data: image-first sections put the image in 1/span 7 and text in 9/span 4.
  const imageFirst = c.indexOf(img) < c.indexOf(h2)
  const text = (
    <div key="t" className={`ss__text ${imageFirst ? 'ss__text--right' : 'ss__text--left'}`}>
      {eyebrow && <Eyebrow>{txt(eyebrow)}</Eyebrow>}
      <h2 className="mk-h40 ss__h2">{txt(h2)}</h2>
      {p && <p className="ss__p">{txt(p, seed)}</p>}
      <CtaRow links={links} className="ss__btns" />
    </div>
  )
  const image = (
    <div key="i" className={`ss__media ${imageFirst ? 'ss__media--left' : 'ss__media--right'}`}>
      <img className="ss__img" src={img.src} alt={img.alt || ''} />
    </div>
  )
  return <section className="ss">{imageFirst ? [image, text] : [text, image]}</section>
}

function SolutionFeatures({ section, seed }) {
  const c = section.content
  const items = []
  for (const it of c) {
    if (it.el === 'eccoft016') items.push({ h3: it })
    else if (it.el === 'eccoft017') items[items.length - 1].p = it
  }
  return (
    <div className="mk-grid">
      <div className="sf__intro">
        <h2 className="mk-h40 ss__h2">{txt(c.find((i) => i.role === 'h2'))}</h2>
        <p className="ss__p">{txt(c.find((i) => i.el === 'eccoft012'), seed)}</p>
        <CtaRow links={byRole(c, 'link')} className="ss__btns" />
      </div>
      <div className="sf__full">
        <div className="sf__sp96" />
        <div className="sf__grid">
          {items.map((it, i) => (
            <div key={i} className="sf__item">
              <h3 className="mk-h20">{txt(it.h3)}</h3>
              <p className="mk-p16 mk-p16--dim">{txt(it.p)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SolutionTrial({ section, seed }) {
  const c = section.content
  const check = c.find((i) => i.role === 'svg')
  const bullets = c.filter((i) => i.el === 'e1a8inxt8')
  return (
    <div id={TRIAL_ID}>
      <div className="st">
        <div className="st__fade st__fade--top" aria-hidden="true" />
        <div className="st__fade st__fade--bottom" aria-hidden="true" />
        <div className="st__fade st__fade--left" aria-hidden="true" />
        <div className="st__fade st__fade--right" aria-hidden="true" />
        <div className="mk-grid st__grid">
          <div className="st__col">
            <div className="st__inner">
              <h2 className="st__h2">{txt(c.find((i) => i.role === 'h2'))}</h2>
              <p className="st__p">{txt(c.find((i) => i.el === 'e1a8inxt3'), seed)}</p>
              <CtaRow links={byRole(c, 'link')} className="st__btns" />
              <ul className="st__list">
                {bullets.map((b, i) => (
                  <li key={i} className="st__li">
                    {check && <MaskIcon className="st__check" src={check.src} />}
                    <span className="st__li-text">{txt(b)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SolutionPage({ data }) {
  const footerCta = data.chrome?.footerCta?.find((f) => f.role === 'h2')?.text ?? null
  usePageChrome({ navOverlay: true, navSpacer: false, footer: 'cta-band', footerCta })
  usePageTitle(data.title)
  return (
    <main className="solutions-page">
      {data.sections.map((s, i) => {
        const key = `${s.slice}-${i}`
        switch (s.slice) {
          case 'Spacer': return <Spacer key={key} height={s.height} />
          case 'SolutionHero': return <SolutionHero key={key} section={s} seed={i} />
          case 'CompactLogo': return <CompactLogoSlice key={key} data={s} className="sl-clogo" />
          case 'SolutionSection': return <SolutionSection key={key} section={s} seed={i} />
          case 'SolutionFeatures': return <SolutionFeatures key={key} section={s} seed={i} />
          case 'TestimonialSlice': return <TestimonialSlice key={key} data={s} />
          case 'SolutionTrial': return <SolutionTrial key={key} section={s} seed={i} />
          case 'FAQ': return <FaqSlice key={key} data={s} />
          default: return null
        }
      })}
    </main>
  )
}
