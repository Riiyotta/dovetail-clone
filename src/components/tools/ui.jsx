import { useEffect } from 'react'
import '../../styles/tools/tools-shared.css'

// Shared primitives for the tools group (specs/tools-shared.md §A–§C).

// Spacer: desktop / ≤1280 / ≤799 heights in px.
export function Spacer({ d, md = d, sm = md }) {
  const cls = d === 200 ? 't-sp t-sp--end200' : 't-sp'
  return <div className={cls} aria-hidden="true" style={{ '--sp-d': `${d}px`, '--sp-md': `${md}px`, '--sp-sm': `${sm}px` }} />
}

// Button link. variant: 'white' (White primary) | 'glass' (Secondary/glass).
export function Btn({ href, newTab, variant = 'white', className = '', children }) {
  return (
    <a
      href={href}
      className={`t-btn t-btn--${variant} ${className}`.trim()}
      {...(newTab ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      {children}
    </a>
  )
}

// First CTA white, second glass (dark pages, §H / hero rows).
export function CtaButtons({ ctas, className = '' }) {
  return (
    <div className={`t-cta-row ${className}`.trim()}>
      {ctas.map((c, i) => (
        <Btn key={c.text} href={c.href} newTab={c.newTab} variant={i === 0 ? 'white' : 'glass'}>{c.text}</Btn>
      ))}
    </div>
  )
}

export function useTitle(title) {
  useEffect(() => { if (title) document.title = title }, [title])
}
