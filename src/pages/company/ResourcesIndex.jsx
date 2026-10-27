import { Link } from 'react-router-dom'
import data from '../../data/company/resources.json'
import { usePageChrome } from '../../chrome.jsx'
import Button from '../../components/company/Button.jsx'
import Icon from '../../components/company/Icon.jsx'
import Spacer from '../../components/company/Spacer.jsx'
import { copy, seedOf } from '../../components/company/text.js'
import PageCta from '../../components/company/PageCta.jsx'
import VideoCard from '../../components/company/VideoCard.jsx'
import { ArrowLink, ctaButtons } from './Parts.jsx'
import '../../styles/company-pages/resources.css'

// /resources/ — specs/resources-index.md. Standard banner + nav with the 88px header spacer; own CTA (S6); footer only.

function LinkList({ list }) {
  return (
    <section className="co-grid ri-list">
      <div className="ri-list__left">
        <h2 className="co-h64">{list.heading}</h2>
        <p className="co-p20 ri-list__intro">{copy(list.intro, seedOf(list.heading))}</p>
      </div>
      <div className="ri-list__right">
        {list.items.map((it) => (
          <div className="ri-item" key={it.href}>
            <Link className="ri-item__link" to={it.href}>
              <h3 className="co-h20 ri-item__h3">{it.title} ↗</h3>
            </Link>
            <p className="co-p16 ri-item__desc">{copy(it.description, seedOf(it.href))}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function TeiCard({ card }) {
  return (
    <section className="co-container">
      <div className="ri-tei">
        <div className="ri-tei__copy">
          <div className="ri-tei__inner">
            <h2 className="co-h48 ri-tei__h2">{card.heading}</h2>
            <p className="co-p16 ri-tei__p">{card.body}</p>
            <div className="co-btn-row ri-tei__btns">
              {card.buttons.map((b) => <Button key={b.label} href={b.href}>{b.label}</Button>)}
            </div>
          </div>
        </div>
        <div className="ri-tei__media">
          <img src={card.image.src} alt={card.image.alt} width={card.image.w} height={card.image.h} loading="lazy" />
        </div>
      </div>
    </section>
  )
}

function RoiCard({ card }) {
  return (
    <section className="co-container">
      <div className="ri-roi">
        <div className="ri-roi__icon"><Icon src="/assets/company/svg/icon-roi-bars.svg" /></div>
        <div className="ri-roi__text">
          <p className="ri-roi__eyebrow">{card.eyebrow}</p>
          <h2 className="co-h40 ri-roi__h2">{card.heading}</h2>
          <p className="co-p20 ri-roi__p">{card.body}</p>
          <ArrowLink href={card.link.href}>{card.link.label}</ArrowLink>
        </div>
      </div>
    </section>
  )
}

function HeadingRow({ heading, link }) {
  return (
    <section className="co-container">
      <div className="ri-headrow">
        <h2 className="co-h40">{heading}</h2>
        <ArrowLink href={link.href}>{link.label}</ArrowLink>
      </div>
    </section>
  )
}

function Blog({ posts }) {
  return (
    <section className="co-grid">
      {posts.map((p) => (
        <div className="ri-blog" key={p.href}>
          <div className="ri-blog__media">
            <Link className="ri-blog__imglink" to={p.href}>
              <img src={p.image.src} alt={p.image.alt} width={p.image.w} height={p.image.h} loading="lazy" />
            </Link>
          </div>
          <Link className="ri-blog__text" to={p.href}>
            <span className="ri-blog__titlewrap"><span className="co-h20 ri-blog__title">{p.title}</span></span>
            <span className="co-m14 cp-dim">{p.tags}</span>
          </Link>
        </div>
      ))}
    </section>
  )
}

export default function ResourcesIndex() {
  usePageChrome({})
  const [topics, compare, stories] = data.lists
  const [blogHead, demosHead] = data.sectionHeadings
  return (
    <main className="co-main cp-main ri">
      <section className="co-container ri-hero">
        <p className="co-m14 cp-dim ri-hero__eyebrow">{data.hero.eyebrow}</p>
        <h1 className="co-h80">{data.hero.h1}</h1>
        <p className="co-p20 ri-hero__p">{data.hero.intro}</p>
        <div className="co-btn-row ri-hero__btns">
          {data.hero.buttons.map((b, i) => (
            <Button key={b.label} href={b.href} variant={i === 0 ? 'primary' : 'secondary'}>{b.label}</Button>
          ))}
        </div>
      </section>
      <Spacer size="s200" />
      <LinkList list={topics} />
      <Spacer size="s200" />
      <TeiCard card={data.teiCard} />
      <Spacer size="s200" />
      <RoiCard card={data.roiCard} />
      <Spacer size="s200" />
      <LinkList list={compare} />
      <Spacer size="s200" />
      <LinkList list={stories} />
      <Spacer size="s200" />
      <HeadingRow heading={blogHead.heading} link={blogHead.link} />
      <Spacer size="s48-32" />
      <Blog posts={data.blog} />
      <Spacer size="s200" />
      <HeadingRow heading={demosHead.heading} link={demosHead.link} />
      <Spacer size="s48-32" />
      <section className="co-container">
        <div className="ri-demos">
          {data.demos.map((d) => (
            <VideoCard key={d.youtubeId} image={d.image.src} youtubeId={d.youtubeId} title={d.title} date={d.date} />
          ))}
        </div>
      </section>
      <PageCta heading={data.cta.heading} buttons={ctaButtons(data.cta.buttons)} />
    </main>
  )
}
