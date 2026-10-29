import { useEffect, useMemo, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { usePageChrome } from '../../chrome.jsx'
import FinalCta from '../../components/FinalCta.jsx'
import BlogCard from './BlogCard.jsx'
import { postByPath, posts, tagLine, titleFromSlug } from './data.js'
import { DEFAULT_LEDE_CHARS, placeholderBody, placeholderBodyFromBlocks, placeholderLede } from './placeholderBody.js'
import { phLines } from '../../components/marketing/placeholder.js'
import '../../styles/blog/blog.css'
import '../../styles/blog/blog-post.css'

// Inline icons (24x24 viewBox, currentColor). The spec doesn't record the share / AI icon artwork, so these
// are neutral placeholder glyphs at the measured 14x14 size.
function Icon({ children }) {
  return (
    <svg className="blog-share__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="square" aria-hidden="true">
      {children}
    </svg>
  )
}
const ICONS = {
  link: <Icon><path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1" /><path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1" /></Icon>,
  facebook: <Icon><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" /></Icon>,
  linkedin: <Icon><path d="M4 9h4v11H4zM6 4v1" /><path d="M11 20V9h4v2a4 4 0 0 1 5 3v6h-4v-5a1.5 1.5 0 0 0-3 0v5z" /></Icon>,
  x: <Icon><path d="M4 4l16 16M20 4L4 20" /></Icon>,
  chatgpt: <Icon><circle cx="12" cy="12" r="8" /><path d="M12 8v8M8 12h8" /></Icon>,
  claude: <Icon><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" /></Icon>,
  perplexity: <Icon><path d="M12 3v18M5 7h14v10H5z" /></Icon>,
  grok: <Icon><path d="M5 19 19 5M9 5h10v10" /></Icon>,
}

const noop = (e) => e.preventDefault()

// specs/content-shared.md §4.4. Buttons are non-functional placeholders.
function ShareBlock() {
  return (
    <div className="blog-share">
      <div className="blog-share__group">
        <h2 className="blog-share__heading">Share</h2>
        <div className="blog-share__row">
          <button type="button" className="blog-share__btn" aria-label="Copy link">
            {ICONS.link}
            <span className="blog-sr" aria-live="polite" />
          </button>
          <a className="blog-share__btn" href="#" onClick={noop} aria-label="Share on Facebook">{ICONS.facebook}</a>
          <a className="blog-share__btn" href="#" onClick={noop} aria-label="Share on LinkedIn">{ICONS.linkedin}</a>
          <a className="blog-share__btn" href="#" onClick={noop} aria-label="Share on X">{ICONS.x}</a>
        </div>
      </div>
      <div className="blog-share__group">
        <h2 className="blog-share__heading">Summarize with AI</h2>
        <div className="blog-share__row">
          <a className="blog-share__btn" href="#" target="_blank" rel="noreferrer" onClick={noop} aria-label="Summarize with ChatGPT">{ICONS.chatgpt}</a>
          <a className="blog-share__btn" href="#" target="_blank" rel="noreferrer" onClick={noop} aria-label="Summarize with Claude">{ICONS.claude}</a>
          <a className="blog-share__btn" href="#" target="_blank" rel="noreferrer" onClick={noop} aria-label="Summarize with Perplexity">{ICONS.perplexity}</a>
          <a className="blog-share__btn" href="#" target="_blank" rel="noreferrer" onClick={noop} aria-label="Summarize with Grok">{ICONS.grok}</a>
        </div>
      </div>
    </div>
  )
}

// specs/content-shared.md §4.3 (dark).
function MetaTable({ rows }) {
  return (
    <div className="blog-meta">
      {rows.map((r, i) => (
        <div key={i}>
          <hr className="blog-meta__rule" />
          <div className="blog-meta__row">
            <span className="blog-meta__label">{r.label}</span>
            <span className="blog-meta__value">{r.value}</span>
          </div>
        </div>
      ))}
      <hr className="blog-meta__rule" />
    </div>
  )
}

function Hero({ hero, title }) {
  if (!hero) return null
  if (hero.type === 'video') {
    return (
      <video className="blog-hero blog-hero--video" src={hero.src} poster={hero.poster}
        autoPlay loop muted playsInline />
    )
  }
  return <img className="blog-hero blog-hero--img" src={hero.src} alt={title} loading="eager" />
}

// Body media placeholders: in-body images/videos/embeds aren't recorded (content-assets.md), so they render
// as neutral token-coloured blocks. Body videos reuse the post's own hero video when it has one so the
// in-view play/pause behaviour is exercised.
function MediaPlaceholder({ className = '', aspect }) {
  return <div className={`blog-rt__ph bg-surface-2 border border-border-subtle ${className}`} role="img" aria-label="Placeholder image"
    style={aspect ? { aspectRatio: aspect } : undefined} />
}

function RichText({ nodes, heroVideo }) {
  const ref = useRef(null)

  // content-shared.md §4.1: body videos play while in view and pause when out of view.
  useEffect(() => {
    const vids = ref.current ? [...ref.current.querySelectorAll('video')] : []
    if (!vids.length) return undefined
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.play().catch(() => {})
        else e.target.pause()
      })
    }, { threshold: 0.5 })
    vids.forEach((v) => io.observe(v))
    return () => io.disconnect()
  }, [nodes])

  return (
    <div className="blog-rt" ref={ref}>
      {nodes.map((n, i) => {
        switch (n.type) {
          case 'p': return <p key={i} {...phLines(n.lines)}>{n.text}</p>
          case 'h2': return <h2 key={i} {...phLines(n.lines)}>{n.text}</h2>
          case 'h3': return <h3 key={i}>{n.text}</h3>
          case 'h4': return <h4 key={i}>{n.text}</h4>
          case 'ul': return <ul key={i}>{n.items.map((t, j) => <li key={j}>{t}</li>)}</ul>
          case 'ol': return <ol key={i}>{n.items.map((t, j) => <li key={j}>{t}</li>)}</ol>
          case 'blockquote': return <blockquote key={i}><p>{n.text}</p></blockquote>
          case 'hr': return <hr key={i} />
          case 'figure':
            return (
              <figure key={i} className="blog-rt__figure">
                <MediaPlaceholder />
                <figcaption>{n.caption}</figcaption>
              </figure>
            )
          case 'table':
            return (
              <table key={i}>
                <thead><tr><th>Column one</th><th>Column two</th><th>Column three</th></tr></thead>
                <tbody>
                  {[1, 2, 3].map((r) => (
                    <tr key={r}><td>Placeholder cell</td><td>Placeholder cell</td><td>Placeholder cell</td></tr>
                  ))}
                </tbody>
              </table>
            )
          case 'video':
            return heroVideo
              ? <video key={i} className="blog-rt__video" src={heroVideo.src} poster={heroVideo.poster}
                  loop muted playsInline preload="none" />
              : <MediaPlaceholder key={i} className="blog-rt__media" />
          case 'iframe':
            return <div key={i} className="blog-rt__embed"><MediaPlaceholder className="blog-rt__embed-ph" /></div>
          case 'img':
          default:
            return <MediaPlaceholder key={i} className="blog-rt__media" aspect={n.aspect} />
        }
      })}
    </div>
  )
}

function defaultMetaRows(post) {
  if (!post) return []
  return [{ label: 'Tags', value: tagLine(post.tags) }, { label: 'Published', value: post.date }]
}

// specs/blog-post.md
export default function BlogPost() {
  usePageChrome({ theme: 'dark', footer: 'default', navSpacer: false })
  const { slug } = useParams()
  const path = `/blog/${slug}/`
  const post = postByPath(path)

  const title = post ? post.title : titleFromSlug(slug)
  const metaRows = post?.metaRows || defaultMetaRows(post)
  const hero = post?.hero || null
  // ledeChars is null on 7 posts; the spec says only 1 post has no lede. Treated as "no lede" when null.
  const ledeChars = post ? post.ledeChars : DEFAULT_LEDE_CHARS
  const nodes = useMemo(() => (post?.bodyBlocks
    ? placeholderBodyFromBlocks(slug, post.bodyBlocks)
    : placeholderBody(slug, post?.bodyShape, post?.bodyOrder)), [slug, post])
  const fallbackCards = posts.filter((p) => p.path !== path).slice(0, 3).map((p) => p.path)
  const sidebar = (post?.sidebarCards?.length ? post.sidebarCards : fallbackCards).map(postByPath).filter(Boolean)
  const related = (post ? post.relatedArticles || [] : fallbackCards).map(postByPath).filter(Boolean)

  return (
    <>
      <main className="blog-post">
        <div className="blog-post__spacer-top" />
        <section className="blog-grid">
          <div className="blog-post__title-cell">
            <nav className="blog-crumb" aria-label="Breadcrumb">
              <Link className="blog-crumb__link" to="/blog/">Blog</Link>
            </nav>
            <div className="blog-post__spacer-32" />
            <h1 className="blog-post__h1">{title}</h1>
            <div className="blog-post__spacer-title" />
          </div>
          <div className="blog-post__meta-cell">
            {metaRows.length > 0 && <MetaTable rows={metaRows} />}
            <ShareBlock />
          </div>
          {hero && (
            <div className="blog-post__hero-cell">
              <Hero hero={hero} title={title} />
            </div>
          )}
        </section>
        <div className="blog-post__spacer-200" />
        <section className="blog-grid">
          {ledeChars ? (
            <div className="blog-post__lede-cell">
              <p className="blog-post__lede">{placeholderLede(slug, ledeChars)}</p>
              <div className="blog-post__spacer-lede" />
            </div>
          ) : null}
          <div className="blog-post__content-cell">
            <div className="blog-post__inner-grid">
              <div className="blog-post__text-cell">
                <RichText nodes={nodes} heroVideo={hero?.type === 'video' ? hero : null} />
              </div>
            </div>
          </div>
          <aside className="blog-post__sidebar">
            <aside className="blog-post__sidebar-inner">
              {sidebar.map((p) => (
                <div key={p.path} className="blog-post__sticky-wrap">
                  <div className="blog-post__sticky-card">
                    <BlogCard post={p} variant="side" />
                  </div>
                </div>
              ))}
            </aside>
          </aside>
          {related.length > 0 && (
            <div className="blog-post__related-cell">
              <div className="blog-post__spacer-related" />
              <p className="blog-post__related-h">Related Articles</p>
              <div className="blog-post__spacer-64" />
              <div className="blog-post__related-grid">
                {related.map((p) => (
                  <div key={p.path} className="blog-post__related-item">
                    <BlogCard post={p} variant="side" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
        <div className="blog-post__spacer-end" />
      </main>
      <FinalCta />
    </>
  )
}
