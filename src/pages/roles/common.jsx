import { useEffect } from 'react'
import { placeholder } from '../../components/marketing/placeholder.js'
import '../../styles/roles/common.css'

// Shared bits for the roles / quiz / solutions templates (specs/marketing-shared.md).

// Neutral placeholder copy for { placeholder: true, chars: N } — shared generator.
export { placeholder }

// Resolve a content item / field into display text.
export function txt(item, seed = 0) {
  if (item == null) return ''
  if (typeof item === 'string') return item
  if (item.placeholder) return placeholder(item.chars, seed)
  return item.text ?? ''
}

// Text with "\n" hard breaks.
export function Lines({ text }) {
  const parts = String(text).split('\n')
  return parts.map((p, i) => (
    <span key={i}>{p}{i < parts.length - 1 && <br />}</span>
  ))
}

// Spacer driven by the measured heights in the data file (1440 desktop / 1280 md / 768,390 sm).
export function Spacer({ height }) {
  const h = height || {}
  const d = h['1440'] ?? 200
  const md = h['1280'] ?? d
  const sm = h['768'] ?? h['390'] ?? md
  return <div className="mk-spacer" style={{ '--sp-d': `${d}px`, '--sp-md': `${md}px`, '--sp-sm': `${sm}px` }} />
}

export function Eyebrow({ children, className = '' }) {
  return <div className={`mk-eyebrow ${className}`}>{children}</div>
}

// Marketing Button (marketing-shared §4). variant: 'primary' | 'secondary'.
export function MkButton({ href, children, variant = 'primary', newTab, onClick, className = '', ...rest }) {
  const cls = `mk-btn mk-btn--${variant} ${className}`
  if (href == null) {
    return <button type="button" className={cls} onClick={onClick} {...rest}>{children}</button>
  }
  const ext = newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  return <a href={href} className={cls} onClick={onClick} {...ext} {...rest}>{children}</a>
}

// Primary vs secondary by label for the recurring CTA pairs.
export function ctaProps(link) {
  const signup = link.href && link.href.startsWith('/auth/signup')
  return { href: link.href, newTab: signup }
}

export function usePageTitle(title) {
  useEffect(() => { if (title) document.title = title }, [title])
}

// currentColor SVG rendered as a mask so it takes the text colour.
export function MaskIcon({ src, size = 24, className = '' }) {
  return (
    <span className={`mk-icon ${className}`} aria-hidden="true"
      style={{ '--icon': `url("${src}")`, width: size, height: size }} />
  )
}
