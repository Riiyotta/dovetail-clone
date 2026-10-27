import { useEffect, useRef, useState } from 'react'
import { placeholder, MaskIcon } from '../shared.jsx'
import { section, pick, textOf } from './data.js'
import Bullets from './Bullets.jsx'

// launch.md "Multiplayer" (ea0q8q8*). Agent cards open a left slide-in modal with the product prompt-modal
// mechanics (specs/product.md §6): backdrop fade 200ms, panel translateX(calc(-100% - 24px)) → 0 over 320ms
// cubic-bezier(.22,1,.36,1), body scroll lock, Esc / backdrop click closes, focus kept inside the panel.

const CLOSE_ICON = '/assets/svg/banner-dismiss-x.svg'
const OPEN_IN_DOVETAIL = 'https://dovetail.com/home'
// Not captured: the modal's description and prompt copy (lengths unknown). Placeholder lengths below are assumed.
const MODAL_DESC_CHARS = 160
const MODAL_PROMPT_CHARS = 240

function splitCard(text) {
  const body = text.replace(/\s*→\s*$/, '')
  const i = body.indexOf(' ')
  return { name: body.slice(0, i), role: body.slice(i + 1) }
}

function AgentModal({ agent, onClose }) {
  const panelRef = useRef(null)
  const open = Boolean(agent)
  const [copied, setCopied] = useState(false)
  const [shown, setShown] = useState(agent) // keep content while the panel slides out
  if (agent && agent !== shown) setShown(agent)
  const prompt = placeholder(MODAL_PROMPT_CHARS)

  useEffect(() => {
    if (!open) return
    const y = window.scrollY
    const body = document.body
    const prev = { position: body.style.position, top: body.style.top, width: body.style.width }
    Object.assign(body.style, { position: 'fixed', top: `-${y}px`, width: '100%' })
    panelRef.current?.querySelector('button')?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') {
        const f = [...panelRef.current.querySelectorAll('button, a[href]')]
        if (!f.length) return
        const first = f[0]; const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      Object.assign(body.style, prev)
      window.scrollTo(0, y)
    }
  }, [open, onClose])

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(t)
  }, [copied])

  const copy = () => {
    navigator.clipboard?.writeText(prompt).then(() => setCopied(true), () => {})
  }

  return (
    <div className="lx-modal" data-open={open} aria-hidden={!open}>
      <div className="lx-modal__backdrop" onClick={onClose} />
      <div className="lx-modal__panel" ref={panelRef} role="dialog" aria-modal="true" aria-label={shown?.name}>
        <button type="button" className="lx-modal__close" aria-label="Close" onClick={onClose} tabIndex={open ? 0 : -1}>
          <MaskIcon src={CLOSE_ICON} className="lx-modal__close-icon" />
        </button>
        {shown && (
          <>
            <img className="lx-modal__avatar" src={shown.avatar} alt="" />
            <p className="lx-modal__title">{shown.name}</p>
            <p className="lx-modal__role">{shown.role}</p>
            <p className="lx-modal__desc">{placeholder(MODAL_DESC_CHARS)}</p>
            <div className="lx-modal__prompt">
              <p className="lx-modal__prompt-text">{prompt}</p>
              <div className="lx-modal__actions">
                {/* Copy / open icons were not captured; simple stand-in glyphs. */}
                <button type="button" className="lx-modal__icon-btn" aria-label={copied ? 'Copied' : 'Copy prompt'} onClick={copy} tabIndex={open ? 0 : -1}>
                  <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    {copied ? <path d="M3 8.5l3 3 7-7" /> : <><rect x="5" y="5" width="8" height="8" rx="1.5" /><path d="M3 10V4.5A1.5 1.5 0 0 1 4.5 3H10" /></>}
                  </svg>
                </button>
                <a className="lx-modal__icon-btn" href={OPEN_IN_DOVETAIL} target="_blank" rel="noreferrer" aria-label="Open in Dovetail" tabIndex={open ? 0 : -1}>
                  <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M6 3h7v7M13 3L4 12" />
                  </svg>
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default function Multiplayer() {
  const sec = section('LaunchMultiplayer')
  const [img] = pick(sec, 'ea0q8q88')
  const cards = pick(sec, 'ea0q8q811')
  const avatars = pick(sec, 'ea0q8q812')
  const [agent, setAgent] = useState(null)
  const close = useRef(() => setAgent(null)).current

  return (
    <section id="launch-multiplayer" className="lx-anchor">
      <div className="cmp-container">
        <div className="cmp-grid lx-row-center">
          <div className="lx-col-text-5">
            <p className="lx-h56">{textOf(sec, 'ea0q8q82')}</p>
            <p className="lx-p20 lx-mt24">{placeholder(pick(sec, 'ea0q8q83')[0].chars)}</p>
            <Bullets sec={sec} arrowEl="ea0q8q86" labelEl="ea0q8q87" />
          </div>
          <div className="lx-col-img-right">
            <img className="lx-img lx-img--616" src={img.src} alt={img.alt} />
          </div>
        </div>
        <p className="lx-agents-label">{textOf(sec, 'ea0q8q89')}</p>
        <div className="cmp-grid lx-agent-cards">
          {cards.map((c, i) => {
            if (c.role === 'link') {
              return (
                <a key={c.text} className="lx-agent-card lx-agent-card--custom" href={c.href}>
                  <img className="lx-agent-card__avatar" src={avatars[i].src} alt="" />
                  <div className="lx-agent-card__text">
                    <p className="lx-agent-card__role">
                      {c.text.replace(/\s*→\s*$/, '')} <span className="lx-agent-card__arrow">→</span>
                    </p>
                  </div>
                </a>
              )
            }
            const { name, role } = splitCard(c.text)
            return (
              <button
                key={c.text}
                type="button"
                className="lx-agent-card"
                onClick={() => setAgent({ name, role, avatar: avatars[i].src })}
              >
                <img className="lx-agent-card__avatar" src={avatars[i].src} alt="" />
                <div className="lx-agent-card__text">
                  <p className="lx-agent-card__name">{name}</p>
                  <p className="lx-agent-card__role">{role} <span className="lx-agent-card__arrow">→</span></p>
                </div>
              </button>
            )
          })}
        </div>
      </div>
      <AgentModal agent={agent} onClose={close} />
    </section>
  )
}
