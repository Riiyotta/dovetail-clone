import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { usePageChrome } from '../../chrome.jsx'
import FinalCta from '../../components/FinalCta.jsx'
import { findEntry, titleFromSlug, placeholderBody } from './data.js'
import { BackArrow, NextArrow, LinkIcon, FacebookIcon, LinkedInIcon, XIcon } from './icons.jsx'
import '../../styles/changelog/grid.css'
import '../../styles/changelog/rich-text.css'
import '../../styles/changelog/changelog-entry.css'

// specs/changelog-entry.md

function RichText({ blocks }) {
  return (
    <div className="cl-rich">
      {blocks.map((b, i) => {
        if (b.type === 'p') return <p key={i}>{b.text}</p>
        if (b.type === 'h3') return <h3 key={i}>{b.text}</h3>
        if (b.type === 'hr') return <hr key={i} />
        return (
          <ul key={i}>
            {b.items.map((t, j) => <li key={j}>{t}</li>)}
          </ul>
        )
      })}
    </div>
  )
}

function Share({ title }) {
  const [copied, setCopied] = useState(false)
  const url = typeof window !== 'undefined' ? window.location.href : ''
  const enc = encodeURIComponent
  const copy = () => {
    navigator.clipboard?.writeText(url).then(() => setCopied(true), () => {})
  }
  return (
    <div className="cl-share">
      <span className="cl-share__label">Share</span>
      <div className="cl-share__buttons">
        <button type="button" className="cl-share__btn" aria-label="Copy link" onClick={copy}>
          <LinkIcon />
          <span className="cl-visually-hidden" aria-live="polite">{copied ? 'Link copied' : ''}</span>
        </button>
        <a className="cl-share__btn" aria-label="Share on Facebook" target="_blank" rel="noopener noreferrer"
          href={`https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`}>
          <FacebookIcon />
        </a>
        <a className="cl-share__btn" aria-label="Share on LinkedIn" target="_blank" rel="noopener noreferrer"
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`}>
          <LinkedInIcon />
        </a>
        <a className="cl-share__btn" aria-label="Share on X" target="_blank" rel="noopener noreferrer"
          href={`https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`}>
          <XIcon />
        </a>
      </div>
    </div>
  )
}

function PrevNextCell({ item }) {
  if (!item) return <div className="cl-pn__cell" />
  const isNext = item.dir === 'Next'
  return (
    <div className="cl-pn__cell">
      <Link to={item.href} className="cl-pn__link">
        <h6 className="cl-pn__dir">
          {!isNext && <BackArrow size={12} className="cl-pn__arrow" />}
          {isNext ? 'Next' : 'Previous'}
          {isNext && <NextArrow size={12} className="cl-pn__arrow" />}
        </h6>
        <h4 className="cl-pn__title">{item.title}</h4>
        <h6 className="cl-pn__date">{item.date}</h6>
      </Link>
    </div>
  )
}

export default function ChangelogEntry() {
  usePageChrome({})
  const { slug } = useParams()
  const entry = findEntry(slug)
  const title = entry ? entry.title : titleFromSlug(slug)

  useEffect(() => {
    document.title = `${title} | Dovetail changelog`
  }, [title])

  const blocks = placeholderBody(slug, entry?.bodyShape)
  const prev = entry?.prevNext?.find((p) => p.dir === 'Previous')
  const next = entry?.prevNext?.find((p) => p.dir === 'Next')
  const cta = entry?.cta
  const external = cta && /^https?:/.test(cta.href)

  return (
    <>
      <main className="cl-entry">
        <section className="cl-grid">
          <div className="cl-entry__back-cell">
            <Link to="/changelog/" className="cl-back">
              <span className="cl-back__icon"><BackArrow /></span>
              Back
            </Link>
          </div>

          <div className="cl-entry__content">
            {entry && (
              <div className="cl-entry__dateline">
                <span>{entry.date}</span>
                <span className="cl-entry__dot" aria-hidden="true" />
                <span>{entry.time}</span>
              </div>
            )}
            <h1 className="cl-entry__title">{title}</h1>
            {entry?.hero && <img className="cl-entry__hero" src={entry.hero} alt="" />}

            <RichText blocks={blocks} />

            <div className="cl-entry__actions">
              {cta && (
                <a
                  className="cl-entry__cta"
                  href={cta.href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {cta.text}
                </a>
              )}
              <Share title={title} />
            </div>

            <hr className="cl-rule cl-entry__divider" />

            <div className="cl-inner-grid cl-pn">
              <PrevNextCell item={prev} />
              <PrevNextCell item={next} />
            </div>

            <div className="cl-entry__bottom-spacer" />
          </div>
        </section>
      </main>
      <FinalCta />
    </>
  )
}
