import data from '../../data/company/b2bsaasy.json'
import { usePageChrome } from '../../chrome.jsx'
import Spacer from '../../components/company/Spacer.jsx'
import Faq from '../../components/company/Faq.jsx'
import PageCta from '../../components/company/PageCta.jsx'
import { copy, seedOf } from '../../components/company/text.js'
import { ctaButtons } from './Parts.jsx'
import '../../styles/company-pages/podcast.css'

// /b2bsaasy/ — specs/podcast.md. Standard banner + nav, no header spacer; own CTA (S6 b2bsaasy variant), footer only.
export default function Podcast() {
  usePageChrome({ navSpacer: false })
  return (
    <main className="co-main cp-main pc">
      <div className="co-grid-bg pc-hero">
        <div className="cp-fade cp-fade--top pc-hero__fade-top" aria-hidden="true" />
        <div className="cp-fade cp-fade--bottom pc-hero__fade-bottom" aria-hidden="true" />
        <Spacer size="hero" />
        <section className="co-grid pc-grid">
          <div className="pc-intro">
            <p className="co-m14 cp-dim">{data.hero.eyebrow}</p>
            <h1 className="co-h80 pc-intro__h1">{data.hero.h1}</h1>
            <p className="co-p20 pc-intro__p">{copy(data.hero.intro, seedOf(data.path))}</p>
          </div>
          {data.episodes.map((ep) => (
            <a className="pc-card" key={ep.href} href={ep.href} target="_blank" rel="noreferrer">
              <span className="pc-card__media">
                <img src={ep.image.src} alt={ep.image.alt} width={ep.image.w} height={ep.image.h} loading="lazy" />
              </span>
              <p className="co-h20 pc-card__title">{ep.title}</p>
              <p className="co-m14 cp-dim">{ep.date}</p>
            </a>
          ))}
        </section>
        <Spacer size="s200-fixed" />
      </div>
      <Faq items={data.faqs} seed={seedOf('b2bsaasy-faq')} />
      <PageCta heading={data.cta.heading} maxWidth={924} buttons={ctaButtons(data.cta.buttons)} />
    </main>
  )
}
