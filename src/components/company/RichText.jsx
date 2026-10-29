import { Link } from 'react-router-dom'
import YouTubeEmbed from './YouTubeEmbed.jsx'
import { copy, isPlaceholder, quoteCopy } from './text.js'
import { placeholder, phLines } from '../marketing/placeholder.js'
import '../../styles/company/components.css'

// RichText — Markdown-body renderer for company data (company-shared.md S0.6).
// Props:
//   blocks   array of body blocks as recorded in src/data/company/** :
//              { t:'p', text? | placeholder+chars(+lines), strong?: string[], links?: [{text, href}] }
//              (`lines` = the original's line count at 1440, reserved at desktop widths; see phLines)
//              { t:'h1'|'h2'|'h3'|'h4', text }   { t:'ul'|'ol', items: [string | {placeholder,chars,strong?,links?}] }
//              { t:'img', src, alt }   { t:'blockquote', text? | placeholder+chars }
//              { t:'iframe', youtubeId, poster }  → click-to-load YouTubeEmbed
//   body     true → story/event body override (p + li 20/28; ≤1280 16/24)
//   theme    'dark' (default) | 'light' (guides)
//   seed     number, varies the placeholder text between pages
// Placeholder paragraphs keep the recorded strong text (at the start) and link labels (spread through the text),
// so emphasis and links survive while the body copy stays neutral.
export default function RichText({ blocks = [], body = false, theme = 'dark', seed = 0, className = '' }) {
  const cls = `co-rich${body ? ' co-rich--body' : ''}${theme === 'light' ? ' co-rich--light' : ''} ${className}`.trim()
  return <div className={cls}>{blocks.map((b, i) => renderBlock(b, i, seed + i * 13))}</div>
}

function SmartA({ href, children }) {
  if (/^https?:/.test(href)) return <a href={href} target="_blank" rel="noreferrer">{children}</a>
  return <Link to={href}>{children}</Link>
}

export function Inline({ node, seed = 0 }) {
  if (node == null) return null
  if (typeof node === 'string') return node
  const strong = node.strong || []
  const links = node.links || []
  if (!isPlaceholder(node)) {
    const text = node.text || ''
    if (strong.length === 1 && strong[0] === text) return <strong>{text}</strong>
    return text
  }
  const reserved = strong.join(' ').length + links.reduce((n, l) => n + l.text.length + 1, 0)
  const words = placeholder(Math.max(12, (node.chars || 40) - reserved), seed).split(' ')
  const out = []
  strong.forEach((s, i) => out.push(<strong key={`s${i}`}>{s}</strong>, ' '))
  if (!links.length) {
    out.push(words.join(' '))
    return out
  }
  // Spread the link labels evenly through the placeholder words.
  const gap = Math.max(1, Math.floor(words.length / (links.length + 1)))
  let w = 0
  links.forEach((l, i) => {
    const upto = Math.min(words.length - 1, gap * (i + 1))
    out.push(`${words.slice(w, upto).join(' ')} `)
    out.push(<SmartA key={`l${i}`} href={l.href}>{l.text}</SmartA>, ' ')
    w = upto
  })
  out.push(words.slice(w).join(' '))
  return out
}

function renderBlock(b, key, seed) {
  switch (b.t) {
    case 'p':
      return <p key={key} {...(isPlaceholder(b) ? phLines(b) : {})}><Inline node={b} seed={seed} /></p>
    case 'h1': case 'h2': case 'h3': case 'h4': case 'h5': case 'h6': {
      const H = b.t
      return <H key={key}>{copy(b.text ?? b, seed)}</H>
    }
    case 'ul': case 'ol': {
      const L = b.t
      return <L key={key}>{(b.items || []).map((it, j) => <li key={j} {...(isPlaceholder(it) ? phLines(it, undefined, { clamp: false }) : {})}><Inline node={it} seed={seed + j} /></li>)}</L>
    }
    case 'img':
      return <img key={key} src={b.src} alt={b.alt || ''} loading="lazy" />
    case 'blockquote':
      return <blockquote key={key}>{isPlaceholder(b) ? quoteCopy(b, seed) : b.text}</blockquote>
    case 'iframe':
      return <YouTubeEmbed key={key} youtubeId={b.youtubeId} poster={b.poster} />
    default:
      return null
  }
}
