import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { placeholder } from '../../components/marketing/placeholder.js'
import { MaskIcon } from '../../components/marketing/content.jsx'

// Stand-in close glyph: the modal's own close icon isn't in the asset set (gap), so the homepage
// banner dismiss "x" is reused.
const CLOSE_ICON = '/assets/svg/banner-dismiss-x.svg'
// Gap: per-template agent slugs for https://dovetail.com/agents/create?template=<slug> aren't recorded.
const OPEN_URL = 'https://dovetail.com/home'

// Prompt modal (product.md §6, `e1bgi5s1*`): backdrop fade 200ms, panel slide-in 320ms
// cubic-bezier(.22,1,.36,1), body lock, focus trap, Esc / backdrop close.
export default function PromptModal({ card, variant, onClose }) {
  const panelRef = useRef(null)
  const prompts = card.modal?.prompts || []

  // Body lock: position:fixed; top:-scrollY; width:100% — restored on close.
  useLayoutEffect(() => {
    const y = window.scrollY
    const b = document.body.style
    const prev = { position: b.position, top: b.top, width: b.width }
    b.position = 'fixed'
    b.top = `-${y}px`
    b.width = '100%'
    return () => {
      b.position = prev.position
      b.top = prev.top
      b.width = prev.width
      window.scrollTo(0, y)
    }
  }, [])

  useEffect(() => {
    const panel = panelRef.current
    const opener = document.activeElement
    panel.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); return }
      if (e.key !== 'Tab') return
      const f = panel.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
      if (!f.length) return
      const first = f[0]
      const last = f[f.length - 1]
      if (e.shiftKey && (document.activeElement === first || document.activeElement === panel)) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('keydown', onKey); opener?.focus?.({ preventScroll: true }) }
  }, [onClose])

  return createPortal(
    <div className="pd-modal" role="presentation">
      <div className="pd-modal__backdrop" onClick={onClose} />
      <div ref={panelRef} className={`pd-modal__panel pd-modal__panel--${variant}`} role="dialog" aria-modal="true"
        aria-label={card.title} tabIndex={-1}>
        <button type="button" className="pd-modal__close" aria-label="Close" onClick={onClose}>
          <MaskIcon src={CLOSE_ICON} className="pd-modal__close-icon" />
        </button>
        {variant === 'label' ? (
          <span className="pd-modal__label">{card.label}</span>
        ) : (
          <div className="pd-modal__icon-row">
            {card.icon && <img src={card.icon.src} alt="" style={{ height: card.icon.h, width: 'auto' }} />}
          </div>
        )}
        <p className={`pd-modal__title pd-modal__title--${variant}`}>{card.title}</p>
        <p className="pd-modal__desc">{card.desc}</p>
        <div className="pd-modal__list">
          {prompts.map((p, i) => <PromptBox key={i} label={p.label} text={placeholder(p.textChars, 60 + i)} />)}
        </div>
      </div>
    </div>,
    document.body,
  )
}

function PromptBox({ label, text }) {
  const [copied, setCopied] = useState(false)
  useEffect(() => {
    if (!copied) return undefined
    const t = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(t)
  }, [copied])
  const copy = () => { navigator.clipboard?.writeText(text).then(() => setCopied(true), () => {}) }
  // Gap: copy / check / open icons aren't in the asset set; the buttons render as empty 24px chips.
  return (
    <div className="pd-prompt">
      <p className="pd-prompt__label">{label}</p>
      <div className="pd-prompt__box">
        <p className="pd-prompt__text">{text}</p>
        <div className="pd-prompt__actions">
          <button type="button" className="pd-prompt__copy" aria-label={copied ? 'Copied' : 'Copy prompt'} data-copied={copied ? 'true' : undefined} onClick={copy} />
          <a className="pd-prompt__open" href={OPEN_URL} target="_blank" rel="noreferrer" aria-label="Open in Dovetail" />
        </div>
      </div>
    </div>
  )
}
