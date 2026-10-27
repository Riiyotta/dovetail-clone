import { useState } from 'react'
import { usePageChrome } from '../../chrome.jsx'
import { Btn, MaskIcon, useLazyJson, useMetaTitle } from '../../components/legal/primitives.jsx'
import Prose, { tocEntries } from '../../components/legal/Prose.jsx'
import { txt } from '../../components/legal/placeholder.js'
import { Breadcrumb, ContentsSheet, MetaTable, Spacer, TagCloud } from '../guides/components.jsx'
import '../../styles/guides/primitives.css'
import '../../styles/guides/content.css'
import '../../styles/guides/guide-article.css'
import '../../styles/legal/article.css'

// specs/tools-article.md (deltas) on top of specs/guide-article.md, reusing the guide-article
// components/styles from src/pages/guides/. Routes: /research-maturity-assessment/ and
// /resources/dovetail-vs-{aurelius,enterpret,marvin,qualtrics}/.
// Kept local (overlap noted in handoff):
//  - body renderer: guides' RichText takes plain strings only; tools data has placeholder paragraphs with
//    inline links, bold lead-ins and placeholder table cells, so Prose renders into the guide `.rt` styles.
//  - share/summarize: guides' ShareAi uses stand-in glyphs; tools data carries the real icon files and
//    URL patterns, so the buttons are built from data inside the guide `.share` styles.

const loaders = import.meta.glob(
  ['../../data/tools/research-maturity-assessment.json', '../../data/tools/resources--dovetail-vs-*.json'],
  { import: 'default' },
)

function fillPattern(pattern, title) {
  const url = typeof window !== 'undefined' ? window.location.href : ''
  return pattern.replace('{url}', encodeURIComponent(url)).replace('{title}', title)
}

function IconGroup({ group, title }) {
  const [copied, setCopied] = useState('')
  return (
    <div className="share__group">
      <h2 className="share__h">{group.heading}</h2>
      <div className="share__btns">
        {group.buttons.map((b) => (b.kind === 'button'
          ? (
            <button
              key={b.aria}
              type="button"
              className="share__btn"
              aria-label={b.aria}
              onClick={() => navigator.clipboard?.writeText(window.location.href).then(() => setCopied('Link copied'), () => {})}
            >
              <MaskIcon src={b.icon} size={14} />
              <span className="sr-only" aria-live="polite">{copied}</span>
            </button>
          )
          : (
            <a key={b.aria} className="share__btn" aria-label={b.aria} href={fillPattern(b.hrefPattern, title)} target="_blank" rel="noreferrer">
              <MaskIcon src={b.icon} size={14} />
            </a>
          )))}
      </div>
    </div>
  )
}

const unbracket = (s) => s.replace(/^\[(.*)\]$/, '$1')

export default function ToolsArticle({ slug }) {
  // Light html bg + light nav + light footer, 88px nav spacer, no final CTA. The CTA footer slice
  // ("Turn customer feedback into product innovation", Contact sales / Try Dovetail free) is the
  // chrome's `plain` footer InlineCta, whose copy/CTAs match data.ctaFooter.
  usePageChrome({ theme: 'light', footer: 'plain', navSpacer: true, bannerTheme: 'dark' })
  const data = useLazyJson(loaders[`../../data/tools/${slug}.json`])
  useMetaTitle(data?.meta)
  if (!data) return <main className="ga" />
  const toc = tocEntries(data)
  return (
    <main className="ga">
      <div className="ctitle">
        <section className="container">
          <Breadcrumb crumbs={data.breadcrumb} />
          <Spacer className="h-[32px]" />
          <h1 className="ctitle__h1">{data.h1}</h1>
        </section>
      </div>

      <div className="ga__body">
        <section className="cgrid ga__grid">
          <aside className="c-span-4 ga__aside">
            <div className="ga__meta">
              <MetaTable rows={[{ label: data.lastUpdated.label, values: [{ text: data.lastUpdated.date }] }]} />
              <div className="share">
                {data.share && <IconGroup group={data.share} title={data.h1} />}
                {data.summarize && <IconGroup group={data.summarize} title={data.h1} />}
              </div>
            </div>
            <Spacer className="h-[48px]" />
            {/* tools-article: at 1440 the aside shows only meta, share and the sidebar CTA (no desktop TOC). */}
            <div className="ga__desktop">
              <Spacer className="h-[40px]" />
              {data.sidebarCta && (
                <div className="lart-cta">
                  <p className="lt-p16 l-ink">{txt(data.sidebarCta.text, `${slug}-sidebar`)}</p>
                  {(data.sidebarCta.cta || []).map((c) => <Btn key={c.text} cta={c} variant="soft" className="lart-cta__btn" />)}
                </div>
              )}
            </div>
          </aside>
          <div className="ga__content">
            <hr className="chr" />
            <Spacer className="h-[40px]" />
            <Prose blocks={data.body} seed={slug} kind="neutral" className="rt" />
            <Spacer className="h-[80px]" />
            {data.relatedTopics && (
              <div>
                <Spacer className="h-[80px]" />
                <TagCloud
                  heading={data.relatedTopics.heading}
                  items={data.relatedTopics.links.map((l) => ({ text: unbracket(l.text), href: l.href }))}
                />
              </div>
            )}
          </div>
        </section>
      </div>

      <ContentsSheet items={toc} />
    </main>
  )
}
