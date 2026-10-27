import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { placeholder } from './placeholder.js'

// Helpers for reading the flat `content` arrays in src/data/marketing/*.json (marketing-shared.md §1).

export function textOf(item, seed = 0) {
  if (!item) return ''
  if (item.placeholder) return placeholder(item.chars, seed)
  return item.text ?? ''
}

// Renders "\n" in verbatim text as hard <br>s.
export function Lines({ text }) {
  const parts = String(text ?? '').split('\n')
  return parts.map((p, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {p}
    </Fragment>
  ))
}

export function isInternal(href) {
  return typeof href === 'string' && href.startsWith('/') && !href.startsWith('//')
}

// Link that uses the router for internal paths.
export function SmartLink({ href, children, ...rest }) {
  if (isInternal(href)) return <Link to={href} {...rest}>{children}</Link>
  const ext = typeof href === 'string' && /^https?:/.test(href)
  return (
    <a href={href} {...(ext ? { target: '_blank', rel: 'noreferrer' } : {})} {...rest}>{children}</a>
  )
}

// Marketing button (marketing-shared.md §4). variant: 'primary' | 'secondary'.
export function MkButton({ item, variant = 'primary', className = '', ...rest }) {
  if (!item) return null
  return (
    <SmartLink href={item.href} className={`mk-btn mk-btn--${variant} ${className}`} {...rest}>
      {item.text}
    </SmartLink>
  )
}

// A CTA row: first link primary, the rest secondary (the pattern on every marketing page).
export function CtaRow({ links, className = '' }) {
  if (!links?.length) return null
  return (
    <div className={`mk-cta-row ${className}`}>
      {links.map((l, i) => <MkButton key={i} item={l} variant={i === 0 ? 'primary' : 'secondary'} />)}
    </div>
  )
}

// currentColor SVG drawn as a mask so it inherits text colour (uses .svg-icon from styles/shared.css).
export function MaskIcon({ src, className = '', style }) {
  return <span aria-hidden="true" className={`svg-icon ${className}`} style={{ '--icon': `url(${src})`, ...style }} />
}

// Split a flat content array into groups, each starting at an item matching `isStart`.
export function groupBy(content, isStart) {
  const groups = []
  for (const c of content || []) {
    if (isStart(c)) groups.push([c])
    else if (groups.length) groups[groups.length - 1].push(c)
  }
  return groups
}
