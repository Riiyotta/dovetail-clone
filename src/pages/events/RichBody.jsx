import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { copy } from '../../components/company/text.js'
import '../../styles/company/components.css'
import '../../styles/events/events.css'

// Event description body (event-detail.md §3, company-shared.md S0.6 with the story/event 20/28 override).
// Styled by the shared .co-rich / .co-rich--body rules. Kept as an events renderer rather than the shared
// <RichText> because event data marks up strong lead-ins and links *inside* verbatim text (e.g. "Date: …",
// speaker LinkedIn links, "hr" blocks), which RichText renders as plain text / drops.
// Blocks come from src/data/company/events/{slug}.json → body[]:
//   { t: 'p'|'h1'..'h5'|'hr'|'ul', text?, placeholder?, chars?, strong?: [..], links?: [{text, href}], items?: [...] }
// Verbatim `text` is used as-is (strong lead-ins and link texts are marked up inside it).
// Placeholder blocks get neutral filler of about `chars` characters around the verbatim strong/link texts.

function InlineLink({ href, children }) {
  if (href?.startsWith('/') && !href.startsWith('//')) {
    return <Link to={href}>{children}</Link>
  }
  return <a href={href} target="_blank" rel="noreferrer">{children}</a>
}

const uniq = (arr = []) => [...new Set(arr.filter(Boolean))]

// Verbatim text: wrap occurrences of strong / link strings.
function markup(text, strong = [], links = []) {
  const marks = [
    ...uniq(strong).map((s) => ({ s, strong: true, href: links.find((l) => l.text === s)?.href })),
    ...links.filter((l) => !strong.includes(l.text)).map((l) => ({ s: l.text, href: l.href })),
  ]
  const out = []
  let rest = text
  let key = 0
  while (rest) {
    let best = null
    for (const m of marks) {
      const i = rest.indexOf(m.s)
      if (i >= 0 && (!best || i < best.i)) best = { ...m, i }
    }
    if (!best) { out.push(rest); break }
    if (best.i > 0) out.push(rest.slice(0, best.i))
    out.push(<Piece key={key++} {...best} />)
    rest = rest.slice(best.i + best.s.length)
  }
  return out
}

function Piece({ s, strong, href }) {
  const inner = strong ? <strong>{s}</strong> : s
  return href ? <InlineLink href={href}>{inner}</InlineLink> : inner
}

// Placeholder: strong lead-ins first, then filler, then links (links that are also strong render in place).
function filler(node, seed) {
  const strong = uniq(node.strong)
  const links = (node.links || []).filter((l, i, a) => a.findIndex((x) => x.text === l.text) === i)
  const lead = strong.map((s) => ({ s, strong: true, href: links.find((l) => l.text === s)?.href }))
  const tail = links.filter((l) => !strong.includes(l.text)).map((l) => ({ s: l.text, href: l.href }))
  const used = [...lead, ...tail].reduce((n, m) => n + m.s.length + 1, 0)
  const left = (node.chars || 0) - used
  const text = left >= 6 ? copy({ placeholder: true, chars: left }, seed) : ''
  const parts = []
  lead.forEach((m, i) => parts.push(<Piece key={`l${i}`} {...m} />))
  if (text) parts.push(`${lead.length ? ' ' : ''}${text}`)
  tail.forEach((m, i) => parts.push(<Fragment key={`t${i}`}>{parts.length ? ' ' : ''}<Piece {...m} /></Fragment>))
  return parts
}

export function inline(node, seed = 0) {
  if (!node) return null
  if (node.placeholder) return filler(node, seed)
  if (typeof node.text === 'string') return markup(node.text, node.strong, node.links)
  return null
}

export default function RichBody({ blocks = [], seed = 0 }) {
  return (
    <div className="co-rich co-rich--body ev-body">
      {blocks.map((b, i) => {
        const s = seed + i * 13
        switch (b.t) {
          case 'h1': return <h1 key={i}>{inline(b, s)}</h1>
          case 'h2': return <h2 key={i}>{inline(b, s)}</h2>
          case 'h3': return <h3 key={i}>{inline(b, s)}</h3>
          case 'h4': return <h4 key={i}>{inline(b, s)}</h4>
          case 'h5': return <h5 key={i}>{inline(b, s)}</h5>
          case 'h6': return <h6 key={i}>{inline(b, s)}</h6>
          case 'hr': return <hr key={i} />
          case 'ul': return <ul key={i}>{(b.items || []).map((it, j) => <li key={j}>{inline(it, s + j)}</li>)}</ul>
          case 'ol': return <ol key={i}>{(b.items || []).map((it, j) => <li key={j}>{inline(it, s + j)}</li>)}</ol>
          default: return <p key={i}>{inline(b, s)}</p>
        }
      })}
    </div>
  )
}
