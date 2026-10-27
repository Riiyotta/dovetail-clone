import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from 'react-router-dom'
import { useChrome, usePageChrome } from '../../chrome.jsx'
import { RELATED_TOPICS, humanize, useContent } from './data.js'
import { buildBody } from './placeholder.js'
import {
  Breadcrumb, ContentsSheet, MetaTable, RichText, ShareAi, Spacer, TagCloud, TextCarousel, TocList, smoothScrollToId,
} from './components.jsx'
import '../../styles/guides/primitives.css'
import '../../styles/guides/content.css'
import '../../styles/guides/guide-article.css'

// specs/guide-article.md — light theme, plain light footer, 88px header spacer.
// hub = one of the 10 hub slugs or 'guides'; isHub = hub root (pillar page + A-Z list after the footer).
export default function GuideArticle({ hub, isHub = false }) {
  usePageChrome({ theme: 'light', footer: 'plain', navSpacer: true })
  const { pathname } = useLocation()
  const data = useContent(hub)
  const page = useMemo(() => (data ? resolvePage(data, hub, isHub, pathname) : null), [data, hub, isHub, pathname])
  if (!page) return <main className="ga" />
  return <ArticleView page={page} />
}

function resolvePage(data, hub, isHub, pathname) {
  const path = pathname.endsWith('/') ? pathname : `${pathname}/`
  const slug = path.split('/').filter(Boolean)[1]

  if (hub === 'guides') {
    const a = data.articles.find((x) => x.path === path)
    const title = a ? a.title : humanize(slug)
    return {
      key: path,
      isHub: false,
      h1: title,
      crumbs: [{ text: 'Guides', href: '/guides/' }, { text: title }],
      meta: a ? [{ label: 'Last updated', values: [{ text: a.lastUpdated }] }] : [],
      body: buildBody(path, a?.bodyOrder, a?.bodyShape),
      tocCount: a?.tocItems,
      sidebarCta: data.articleSidebarCta,
      picks: a?.editorsPicks || [],
      latest: a?.latestArticles || [],
      topics: RELATED_TOPICS,
    }
  }

  const hubCrumb = { text: data.categoryName, href: data.hubPath }
  if (isHub) {
    const pl = data.pillar
    return {
      key: path,
      isHub: true,
      h1: pl.h1,
      crumbs: [{ text: 'Guides', href: '/guides/' }, { text: data.categoryName }],
      meta: pl.meta,
      body: buildBody(path, pl.bodyOrder, pl.bodyShape),
      tocCount: pl.tocItems,
      sidebarCta: null,
      picks: data.editorsPicks,
      latest: data.latestArticles,
      topics: data.relatedTopics,
      allHeading: data.allArticlesHeading || `All ${data.categoryName} articles`,
      all: data.articles,
    }
  }

  const a = data.articles.find((x) => x.path === path)
  const h1 = a ? a.h1 || a.title : humanize(slug)
  const meta = []
  if (a) {
    meta.push({ label: 'Last updated', values: [{ text: a.lastUpdated }] })
    if (a.author) meta.push({ label: 'Author', values: [{ text: a.author.name, href: a.author.href }] })
    if (a.reviewer) meta.push({ label: 'Reviewed by', values: [{ text: a.reviewer.name, href: a.reviewer.href }] })
  }
  return {
    key: path,
    isHub: false,
    h1,
    crumbs: [{ text: 'Guides', href: '/guides/' }, hubCrumb, { text: h1 }],
    meta,
    body: buildBody(path, a?.bodyOrder, a?.bodyShape),
    tocCount: a?.tocItems,
    sidebarCta: data.sidebarCta,
    picks: resolveList(data, a?.editorsPicksOverride) || data.editorsPicks,
    latest: resolveList(data, a?.latestArticlesOverride) || data.latestArticles,
    topics: RELATED_TOPICS,
  }
}

// Override lists are hrefs; titles/dates come from the hub carousels, else articles[] (date = lastUpdated).
function resolveList(data, hrefs) {
  if (!hrefs) return null
  const known = new Map()
  for (const x of [...data.editorsPicks, ...data.latestArticles]) known.set(x.href, x)
  return hrefs.map((href) => {
    if (known.has(href)) return known.get(href)
    const a = data.articles.find((x) => x.path === href)
    return { href, title: a ? a.title : humanize(href.split('/').filter(Boolean).pop()), date: a ? a.lastUpdated : '' }
  })
}

function ArticleView({ page }) {
  // TOC = rich-text h2/h3 in document order, capped at the recorded entry count (`tocItems`).
  const toc = useMemo(() => {
    const hs = page.body.filter((b) => b.type === 'h2' || b.type === 'h3')
    return typeof page.tocCount === 'number' ? hs.slice(0, page.tocCount) : hs
  }, [page])

  return (
    <>
      <main className="ga" key={page.key}>
        <div className="ctitle">
          <section className="container">
            <Breadcrumb crumbs={page.crumbs} />
            <Spacer className="h-[32px]" />
            <h1 className="ctitle__h1">{page.h1}</h1>
          </section>
        </div>

        <div className="ga__body">
          <section className="cgrid ga__grid">
            <aside className="c-span-4 ga__aside">
              <div className="ga__meta">
                <MetaTable rows={page.meta} />
                <ShareAi />
              </div>
              <Spacer className="h-[48px]" />
              {page.isHub ? (
                <Spacer className="h-[40px] ga__desktop" />
              ) : (
                <div className="ga__desktop">
                  <Spacer className="h-[40px]" />
                  {page.sidebarCta && (
                    <div className="ga-promo">
                      <h2 className="ga-promo__h">{page.sidebarCta.heading}</h2>
                      <p className="ga-promo__p">{page.sidebarCta.body}</p>
                      <Link to={page.sidebarCta.button.href} className="cbtn cbtn--ink ga-promo__btn">{page.sidebarCta.button.text}</Link>
                    </div>
                  )}
                  <Spacer className="h-[40px]" />
                  <hr className="chr" />
                  <Spacer className="h-[40px]" />
                  <h3 className="ga__contents-h">Contents</h3>
                  <TocList items={toc} onPick={smoothScrollToId} />
                </div>
              )}
            </aside>
            <div className="ga__content">
              <hr className="chr" />
              <Spacer className="h-[40px]" />
              <RichText blocks={page.body} />
              <Spacer className="h-[80px]" />
              <div>
                <Spacer className="h-[80px]" />
                <TagCloud heading="Related topics" items={page.topics} />
              </div>
            </div>
          </section>
        </div>

        <section className="cplain">
          {page.picks.length > 0 && (
            <>
              <Spacer className="ga__sp-carousel" />
              <h2 className="ccar__h">Editor's picks↘</h2>
              <Spacer className="h-[40px]" />
              <TextCarousel items={page.picks} />
            </>
          )}
          {page.latest.length > 0 && (
            <>
              <Spacer className="ga__sp-carousel" />
              <h2 className="ccar__h">Latest articles↘</h2>
              <Spacer className="h-[40px]" />
              <TextCarousel items={page.latest} />
            </>
          )}
          <Spacer className="h-[64px]" />
        </section>

        <ContentsSheet items={toc} />
      </main>
      {page.isHub && <AfterFooter heading={page.allHeading} articles={page.all} />}
    </>
  )
}

// Hub variant: <nav aria-labelledby="category-article-index"> rendered after the footer (inline styles in
// the original). Portalled into the slot Footer renders for the `plain` variant.
function AfterFooter({ heading, articles }) {
  const chrome = useChrome()
  const [slot, setSlot] = useState(null)
  useEffect(() => { setSlot(document.getElementById('after-footer-slot')) }, [chrome])
  if (!slot) return null
  return createPortal(
    <nav aria-labelledby="category-article-index" className="ga-index">
      <h2 id="category-article-index" className="ga-index__h">{heading}</h2>
      <ul className="ga-index__list">
        {articles.map((a) => (
          <li key={a.path}><Link to={a.path}>{a.title}</Link></li>
        ))}
      </ul>
    </nav>,
    slot,
  )
}
