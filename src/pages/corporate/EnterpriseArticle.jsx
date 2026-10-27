import { useMemo } from 'react'
import how from '../../data/marketing/enterprise__how-leading-organizations-use-dovetail.json'
import stack from '../../data/marketing/enterprise__research-tool-stack-integration.json'
import why from '../../data/marketing/enterprise__why-leading-teams-choose-dovetail.json'
import { usePageChrome } from '../../chrome.jsx'
import InlineCta from '../../components/InlineCta.jsx'
import { SmartLink, textOf } from '../../components/marketing/content.jsx'
import {
  Breadcrumb, ContentsSheet, MetaTable, RichText, ShareAi, Spacer, TagCloud, TextCarousel, TocList, smoothScrollToId,
} from '../guides/components.jsx'
import { useDocTitle } from './common.jsx'
import '../../styles/guides/primitives.css'
import '../../styles/guides/content.css'
import '../../styles/guides/guide-article.css'

// specs/enterprise-article.md — the generic guide-article layout in the light theme. The layout pieces are
// the guide template's shared components (src/pages/guides/components.jsx, specs/guide-article.md); this file
// only maps the enterprise data files onto them.

export const ARTICLES = { 'how-leading-organizations-use-dovetail': how, 'research-tool-stack-integration': stack, 'why-leading-teams-choose-dovetail': why }

const H1_BY_URL = Object.fromEntries(
  Object.values(ARTICLES).map((d) => [d.url, d.sections[0].content.find((x) => x.role === 'h1').text]),
)

const slugify = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

function withStrong(strong, text) {
  if (!strong) return text
  return <><strong>{strong}</strong>{text.startsWith('—') ? '' : ' '}{text}</>
}

function buildArticle(d) {
  const hero = d.sections[0].content
  const c = d.sections[1].content
  const h1 = hero.find((x) => x.role === 'h1').text

  // Meta table: "Last updated" / date, "Author" / link (some articles omit the author).
  const meta = []
  c.forEach((x, i) => {
    if (x.el !== 'e19x9lsh2' || (x.text !== 'Last updated' && x.text !== 'Author')) return
    const v = c[i + 1]
    meta.push({ label: x.text, values: [{ text: v.text, href: v.role === 'link' ? v.href : undefined }] })
  })

  const ctaH = c.find((x) => x.role === 'h2' && x.el === 'h2')
  const sidebarCta = {
    heading: ctaH.text,
    body: c.find((x) => x.el === 'e7v85bj2').text,
    button: { text: c.find((x) => x.el === 'e7v85bj3').text, href: c.find((x) => x.el === 'e7v85bj3').href },
  }

  const tocTexts = c.filter((x) => x.el === 'e1noy6on0').map((x) => x.text)
  const lastToc = c.map((x) => x.el).lastIndexOf('e1noy6on0')
  const relIdx = c.findIndex((x) => x.el === 'etar5k93')

  // Rich text: h2/h3 headings, paragraphs, list items grouped into a <ul>, and <strong> lead-ins (recorded
  // after the p/li they open) merged back into that block. "[Asset: …]" embeds have no local file and are skipped.
  const raw = []
  c.slice(lastToc + 1, relIdx).forEach((x, k) => {
    const seed = k + 1
    if (x.role === 'h2') raw.push({ type: 'h2', text: x.text, id: slugify(x.text) })
    else if (x.role === 'h3') raw.push({ type: 'h3', text: x.text, id: slugify(x.text) })
    else if (x.el === 'p') {
      if (!x.placeholder && /^\[Asset: /.test(x.text)) return
      raw.push({ type: 'p', text: textOf(x, seed) })
    } else if (x.el === 'li') {
      const last = raw[raw.length - 1]
      const li = { text: textOf(x, seed) }
      if (last?.type === 'ul') last.items.push(li)
      else raw.push({ type: 'ul', items: [li] })
    } else if (x.el === 'strong') {
      const last = raw[raw.length - 1]
      const target = last?.type === 'ul' ? last.items[last.items.length - 1] : last
      if (target) target.strong = x.text
    }
  })
  const body = raw.map((b) => (b.type === 'ul'
    ? { type: 'ul', items: b.items.map((it) => withStrong(it.strong, it.text)) }
    : { ...b, text: withStrong(b.strong, b.text) }))

  const toc = tocTexts.map((t) => ({ text: t, id: slugify(t) }))

  const topics = []
  const picks = []
  const latest = []
  let list = null
  c.slice(relIdx + 1).forEach((x, i, arr) => {
    if (x.el === 'elhtsr50') { list = x.text.startsWith('Editor') ? picks : latest; return }
    if (!list && x.role === 'link') topics.push({ text: x.text.replace(/^\[|\]$/g, ''), href: x.href })
    if (list && x.el === 'e1ub092j0') {
      list.push({ href: x.href, title: x.text ?? H1_BY_URL[x.href], date: arr[i + 1]?.el === 'e1ub092j1' ? arr[i + 1].text : '' })
    }
  })

  return {
    title: d.title,
    h1,
    crumbs: [{ text: 'Guides', href: '/guides/' }, { text: 'Enterprise', href: '/enterprise/' }, { text: h1 }],
    meta,
    sidebarCta,
    body,
    toc,
    topics,
    picks,
    latest,
  }
}

export default function EnterpriseArticle({ slug }) {
  // Light theme, link-grid-only light footer, 88px header spacer (main at y=206).
  usePageChrome({ theme: 'light', footer: 'plain-light', navSpacer: true })
  const page = useMemo(() => buildArticle(ARTICLES[slug]), [slug])
  useDocTitle(page.title)

  return (
    <main className="ga" key={slug}>
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
            <div className="ga__desktop">
              <Spacer className="h-[40px]" />
              <div className="ga-promo">
                <h2 className="ga-promo__h">{page.sidebarCta.heading}</h2>
                <p className="ga-promo__p">{page.sidebarCta.body}</p>
                <SmartLink href={page.sidebarCta.button.href} className="cbtn cbtn--ink ga-promo__btn">{page.sidebarCta.button.text}</SmartLink>
              </div>
              <Spacer className="h-[40px]" />
              <hr className="chr" />
              <Spacer className="h-[40px]" />
              <h3 className="ga__contents-h">Contents</h3>
              <TocList items={page.toc} onPick={smoothScrollToId} />
            </div>
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
        <Spacer className="ga__sp-carousel" />
        <h2 className="ccar__h">Editor's picks↘</h2>
        <Spacer className="h-[40px]" />
        <TextCarousel items={page.picks} />
        {/* enterprise-article.md §1.3: each block ends with a 64px spacer (only the first block has the 160 lead-in) */}
        <Spacer className="h-[64px]" />
        <h2 className="ccar__h">Latest articles↘</h2>
        <Spacer className="h-[40px]" />
        <TextCarousel items={page.latest} />
        <Spacer className="h-[64px]" />
      </section>

      <ContentsSheet items={page.toc} />

      {/* CtaFooterSlice (light): "Turn customer feedback into product innovation" + Contact sales / Try Dovetail free */}
      <InlineCta theme="light" />
    </main>
  )
}
