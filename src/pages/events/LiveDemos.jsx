import { Link } from 'react-router-dom'
import { usePageChrome } from '../../chrome.jsx'
import FinalCta from '../../components/FinalCta.jsx'
import Spacer from '../../components/company/Spacer.jsx'
import Icon from '../../components/company/Icon.jsx'
import data from '../../data/company/live-demos.json'
import VideoCard from '../../components/company/VideoCard.jsx'
import '../../styles/company/base.css'
import '../../styles/events/events.css'

// The spec doesn't name the text-link arrow asset; icon-row-arrow.svg is the group's only 24px arrow.
const ARROW = '/assets/company/svg/icon-row-arrow.svg'

// live-demos template (specs/live-demos.md).
export default function LiveDemos() {
  usePageChrome({ navSpacer: false })
  const { hero, demos, footer } = data
  return (
    <>
      <main className="co-main">
        {/* §1 Hero */}
        <div className="ld-hero">
          <img className="ld-hero__bg" src={hero.bgImage.src} alt="" width={hero.bgImage.w} height={hero.bgImage.h} />
          <div className="ld-hero__fade-top" aria-hidden="true" />
          <div className="ld-hero__fade-bottom" aria-hidden="true" />
          <div className="ld-hero__content">
            <Spacer size="hero" />
            <section className="co-container">
              <p className="co-m14 ev-text-secondary">{hero.eyebrow}</p>
              <h1 className="co-h80 ld-hero__h1">{hero.h1}</h1>
              <p className="co-p20 ld-hero__intro">{hero.intro}</p>
            </section>
          </div>
        </div>
        <Spacer size="s96-32" />

        {/* §2 Demo grid + §3 footer prompt */}
        <section className="co-grid ld-grid">
          {demos.map((d) => (
            <div key={d.youtubeId} className="ld-card">
              <VideoCard variant="thumb" youtubeId={d.youtubeId} image={d.image.src} alt={d.image.alt} title={d.title} date={d.date} />
            </div>
          ))}
          <div className="ld-foot">
            <h2 className="co-h24 ld-foot__h2">{footer.heading}</h2>
            <Link className="co-textlink co-textlink--demos ld-foot__link" to={footer.link.href}>
              {footer.link.label}
              <Icon src={ARROW} className="co-textlink__arrow" />
            </Link>
          </div>
        </section>
        <Spacer size="s200-fixed" />
      </main>
      <FinalCta />
    </>
  )
}
