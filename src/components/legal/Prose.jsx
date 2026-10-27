import { Fragment } from 'react'
import { placeholderText, placeholderLinkText, txt } from './placeholder.js'
import '../../styles/legal/prose.css'

// Light rich text (`.e8fk9sg2`; specs/legal-doc.md §2b, content-shared §4.1).
// Body blocks come from the data outline: headings verbatim, paragraphs/list items are placeholders
// with link and bold markers. `kind` selects the placeholder voice ('legal' | 'neutral').

const isExternal = (href) => /^https?:/.test(href || '')

function InlineLink({ href, children }) {
  // No destination recorded: keep the link styling, but render no href.
  if (!href) return <a className="lulink">{children}</a>
  const ext = isExternal(href) ? { target: '_blank', rel: 'noreferrer' } : {}
  return <a className="lulink" href={href} {...ext}>{children}</a>
}

// Placeholder run of ~chars characters with optional inline links and a bold lead.
function PlaceholderRun({ block, seed, kind }) {
  // `links` is either [{chars, href}] or, on some list items, just a count with no hrefs recorded.
  const links = Array.isArray(block.links)
    ? block.links
    : Array.from({ length: Number(block.links) || 0 }, () => ({ chars: 16, href: null }))
  const linkChars = links.reduce((n, l) => n + (l.chars || 0), 0)
  const boldLead = block.boldLead || block.hasBold
  const leadText = boldLead ? (kind === 'legal' ? 'Placeholder term:' : 'Placeholder lead:') : ''
  const bodyChars = Math.max((block.chars || 0) - linkChars - (leadText ? leadText.length + 1 : 0), 4)
  const body = placeholderText(bodyChars, seed, kind)
  const lead = leadText ? <><strong>{leadText}</strong>{' '}</> : null
  if (!links.length) return <>{lead}{body}</>
  // Split the body into links.length + 1 word-aligned segments and interleave the links.
  const words = body.split(' ')
  const per = Math.max(1, Math.floor(words.length / (links.length + 1)))
  const out = []
  links.forEach((l, i) => {
    out.push(words.slice(i * per, (i + 1) * per).join(' ') + ' ')
    out.push(<InlineLink key={i} href={l.href}>{placeholderLinkText(l.chars || 12)}</InlineLink>)
  })
  const tail = words.slice(links.length * per).join(' ')
  out.push(tail ? ` ${tail}` : '.')
  return <>{lead}{out.map((o, i) => <Fragment key={i}>{o}</Fragment>)}</>
}

function Cell({ value, seed, kind }) {
  return <>{txt(value, seed, kind)}</>
}

function ListItems({ items, seed, kind }) {
  return items.map((it, i) => (
    <li key={i}>
      {typeof it === 'string' ? it : <PlaceholderRun block={it} seed={`${seed}-${i}`} kind={kind} />}
    </li>
  ))
}

// className: 'lprose' (legal-doc styles) or the guide template's 'rt' for the tools-article pages.
export default function Prose({ blocks = [], seed = '', kind = 'neutral', className = 'lprose' }) {
  return (
    <div className={className}>
      {blocks.map((b, i) => {
        const s = `${seed}-${i}`
        switch (b.type) {
          case 'h2': return <h2 key={i} id={b.id}>{b.text}</h2>
          case 'h3': return <h3 key={i} id={b.id}>{b.text}</h3>
          case 'p': return <p key={i}>{b.placeholder ? <PlaceholderRun block={b} seed={s} kind={kind} /> : b.text}</p>
          case 'ul': return <ul key={i}><ListItems items={b.items || []} seed={s} kind={kind} /></ul>
          case 'ol': return <ol key={i}><ListItems items={b.items || []} seed={s} kind={kind} /></ol>
          case 'img': return <img key={i} src={b.src} alt={b.alt || ''} />
          case 'hr': return <hr key={i} />
          case 'table':
            return (
              <table key={i}>
                <thead>
                  <tr>{(b.headers || []).map((h, c) => <th key={c}><Cell value={h} seed={`${s}h${c}`} kind={kind} /></th>)}</tr>
                </thead>
                <tbody>
                  {(b.rows || []).map((row, r) => (
                    <tr key={r}>{row.map((v, c) => <td key={c}><Cell value={v} seed={`${s}r${r}c${c}`} kind={kind} /></td>)}</tr>
                  ))}
                </tbody>
              </table>
            )
          default: return null
        }
      })}
    </div>
  )
}

// TOC entries: data.toc[] texts (verbatim) paired, in order, with the body h2/h3 ids.
export function tocEntries(data) {
  const heads = (data.body || []).filter((b) => b.type === 'h2' || b.type === 'h3')
  return (data.toc || []).map((text, i) => ({ text, id: heads[i]?.id }))
}
