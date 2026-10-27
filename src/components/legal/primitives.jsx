import { useEffect, useState } from 'react'
import '../../styles/legal/base.css'

// Spacer — the only vertical rhythm mechanism (tools-shared §A). `size` maps to a .lsp-* class.
export function Spacer({ size }) {
  return <div className={`lsp lsp-${size}`} aria-hidden="true" />
}

// currentColor SVG file rendered as a CSS mask so it takes the text colour.
export function MaskIcon({ src, size = 24, className = '' }) {
  return (
    <span
      className={`licon ${className}`}
      style={{ '--icon': `url("${src}")`, width: size, height: size }}
      aria-hidden="true"
    />
  )
}

// Button-link per tools-shared §B. variant: white | glass | ink | soft
export function Btn({ cta, variant, className = '' }) {
  const ext = cta.newTab ? { target: '_blank', rel: 'noreferrer' } : {}
  return (
    <a href={cta.href} className={`lbtn lbtn--${variant} ${className}`} {...ext}>
      {cta.text}
    </a>
  )
}

// CTA row: first CTA primary, the rest secondary.
export function CtaRow({ ctas = [], theme = 'dark', center = false, className = '' }) {
  if (!ctas.length) return null
  const [primary, secondary] = theme === 'light' ? ['ink', 'soft'] : ['white', 'glass']
  return (
    <div className={`lcta-row${center ? ' lcta-row--center' : ''} ${className}`}>
      {ctas.map((c, i) => <Btn key={c.text + i} cta={c} variant={i === 0 ? primary : secondary} />)}
    </div>
  )
}

// Lazy JSON loader for import.meta.glob entries; keeps the page bundle small.
export function useLazyJson(loader) {
  const [state, setState] = useState({ loader: null, data: null })
  useEffect(() => {
    let alive = true
    loader().then((d) => { if (alive) setState({ loader, data: d }) })
    return () => { alive = false }
  }, [loader])
  return state.loader === loader ? state.data : null
}

// Sets document.title from the data file's meta.
export function useMetaTitle(meta) {
  useEffect(() => {
    if (meta?.title) document.title = meta.title
  }, [meta?.title])
}
