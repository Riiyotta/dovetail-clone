import { Fragment } from 'react'
import { Link, useParams } from 'react-router-dom'
import { usePageChrome } from '../../chrome.jsx'
import FinalCta from '../../components/FinalCta.jsx'
import Button from '../../components/company/Button.jsx'
import Spacer from '../../components/company/Spacer.jsx'
import VideoCard from '../../components/company/VideoCard.jsx'
import RichText from '../../components/company/RichText.jsx'
import PixelBand from '../../components/company/PixelBand.jsx'
import BestNeverGuess from '../../components/company/BestNeverGuess.jsx'
import Faq from '../../components/company/Faq.jsx'
import { copy, quoteCopy, seedOf } from '../../components/company/text.js'
import index from '../../data/company/customers.json'
import '../../styles/company/base.css'
import '../../styles/company/components.css'
import '../../styles/company/customers.css'

// /customers/:slug/ — specs/customers-story.md. Unknown slugs render the template with a slug-derived title.
const FILES = import.meta.glob('../../data/company/customers/*.json', { eager: true, import: 'default' })
const STORIES = Object.fromEntries(Object.entries(FILES).map(([p, d]) => [p.split('/').pop().replace('.json', ''), d]))

// Story chrome colour (company-shared.md S1: nav #0044FF, banner = 16% white veil over it).
const STORY_BLUE = '#0044FF'

function fallbackStory(slug) {
  const name = slug.split('-').filter(Boolean).map((w) => w[0].toUpperCase() + w.slice(1)).join(' ') || 'Customer'
  const base = STORIES.okta
  return {
    slug,
    title: name,
    eyebrow: `CUSTOMER / ${name.toUpperCase()}`,
    companyName: name,
    isAnonymous: false,
    intro: { placeholder: true, chars: 220 },
    hero: { type: 'image', image: null, caption: [] },
    stats: [],
    ctaCard: base.ctaCard,
    stickyCta: base.stickyCta,
    sections: [],
    bestNeverGuess: base.bestNeverGuess,
    related: index.storyCards.slice(0, 3),
  }
}

export default function CustomerStory({ slug: slugProp }) {
  const params = useParams()
  const slug = slugProp || params.slug
  const story = STORIES[slug] || fallbackStory(slug)
  usePageChrome({ navSpacer: false, navBg: STORY_BLUE, banner: 'accent', accent: STORY_BLUE })
  const seed = seedOf(slug)
  return (
    <>
      <main className="cu-main co-main" key={slug}>
        <StoryHero story={story} seed={seed} />
        <PixelBand position="top"><Spacer size="s160-160-96" /></PixelBand>
        <StoryBody story={story} seed={seed} />
        <Spacer size="s120-64" />
        <BestNeverGuess data={story.bestNeverGuess} related={story.related} />
        {story.isAnonymous && story.faq && (
          <>
            <Spacer size="s160" />
            <Faq heading={story.faq.heading || 'FAQs'} items={story.faq.items} seed={seed + 500} />
            <Spacer size="s160" />
          </>
        )}
      </main>
      <FinalCta />
    </>
  )
}

// §1 Blue hero
function StoryHero({ story, seed }) {
  const { hero, stats = [], ctaCard } = story
  const caption = hero.caption || []
  return (
    <section className="cs-hero">
      <div className="co-grid">
        <div className="cs-col-full">
          <Spacer size="hero" />
          <p className="cs-eyebrow co-m14">{story.eyebrow}</p>
          <Spacer size="s32-24" />
          <h1 className="cs-h1 co-h64">{story.title}</h1>
          <Spacer size="s64-48" />
        </div>
        <div className="cs-col-main">
          <div className="cs-main">
            <p className="cs-intro co-p20">{copy(story.intro, seed)}</p>
            {hero.image && (
              <div className="cs-media">
                <div className="cs-media__box">
                  {hero.type === 'video' && hero.youtubeId
                    ? <VideoCard variant="hero" youtubeId={hero.youtubeId} image={hero.image} alt={story.title} />
                    : <img src={hero.image} alt="" width={hero.width || undefined} height={hero.height || undefined} />}
                </div>
                {!story.isAnonymous && caption.length > 0 && (
                  <p className="cs-caption co-m14">
                    {caption.map((c, i) => (
                      <Fragment key={i}>{i > 0 && <span className="cs-caption__sep">/</span>}{c}</Fragment>
                    ))}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="cs-col-side">
          <div className="cs-side">
            {stats.length > 0 && (
              <div className="cs-stats">
                <ul className="cs-stats__list">
                  {stats.map((s) => (
                    <li key={s.value + s.label} className="cs-stat">
                      <div className="cs-stat__rule" />
                      <span className="cs-stat__value co-h40">{s.value}</span>
                      <p className="cs-stat__label co-p16">{s.label}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {ctaCard && (
              <div className="cs-cta">
                <div className="cs-cta__text">
                  <p className="cs-cta__h co-h20">{ctaCard.heading}</p>
                  <p className="cs-cta__p co-p16">{ctaCard.body}</p>
                </div>
                <Button href={ctaCard.button.href} variant="primary">{ctaCard.button.label}</Button>
              </div>
            )}
          </div>
        </div>
        <div className="cs-col-main"><Spacer size="s96" /></div>
        <div className="cs-col-side"><Spacer size="s160-0" /></div>
      </div>
    </section>
  )
}

// §3 Body: sections (+ pull quotes) and the sticky CTA rail
function PullQuote({ pq, seed }) {
  return (
    <div className="cs-pq">
      <Link className="cs-pq__link" to={pq.href}>
        <div className="cs-pq__wrap">
          <blockquote className="cs-pq__quote">{quoteCopy(pq.quote, seed)}</blockquote>
        </div>
        <div className="cs-pq__person">
          {pq.avatar && <img className="cs-pq__avatar" src={pq.avatar} alt="" loading="lazy" />}
          {pq.name && <span className="cs-pq__name co-m14">{pq.name}</span>}
          {pq.role && <span className="cs-pq__role co-m14">{pq.role}</span>}
        </div>
      </Link>
    </div>
  )
}

function StoryBody({ story, seed }) {
  const { sections = [], stickyCta } = story
  let afterQuote = false
  return (
    <div className="cs-body">
      {sections.map((sec, i) => {
        const prevHadQuote = afterQuote
        afterQuote = !!(sec.pullQuotes && sec.pullQuotes.length)
        return (
          <Fragment key={i}>
            {i > 0 && (
              <>
                <div className="cs-block"><Spacer size="s100-64" /></div>
                <div className="cs-block">
                  <div className="co-grid"><div className="cs-rule" /></div>
                </div>
              </>
            )}
            <div className={`cs-block cs-block--head${prevHadQuote ? ' cs-block--after-quote' : ''}`}>
              <div className="co-grid">
                <div className="cs-sec-head">
                  <p className="cs-sec-h co-h56">{sec.heading}</p>
                  <Spacer size="s32-8" />
                </div>
              </div>
            </div>
            <div className="cs-block">
              <div className="co-grid">
                <div className="cs-sec-body">
                  <RichText body blocks={sec.body} seed={seed + i * 101} />
                </div>
                {(sec.pullQuotes || []).map((pq, j) => <PullQuote key={j} pq={pq} seed={seed + i * 31 + j} />)}
              </div>
            </div>
          </Fragment>
        )
      })}
      {stickyCta && (
        <div className="cs-rail">
          <div className="cs-rail__inner">
            <img className="cs-rail__img" src={stickyCta.image} alt="" />
            <p className="cs-rail__p co-p16">{stickyCta.body}</p>
            <Button href={stickyCta.button.href} variant="primary">{stickyCta.button.label}</Button>
          </div>
        </div>
      )}
    </div>
  )
}
