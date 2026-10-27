import { useCallback, useEffect, useRef, useState } from 'react'
import '../styles/TwinsModal.css'

// CLONE_SPEC.md §12 Digital Twins modal (timed promo).
const STORAGE_KEY = 'digital-twins-popup-seen'
const DELAY_MS = 10000
const TRIGGER_EVENTS = ['scroll', 'pointerdown', 'keydown', 'touchstart']
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

function hasSeen() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

function markSeen() {
  try {
    window.localStorage.setItem(STORAGE_KEY, 'true')
  } catch {
    /* storage unavailable: modal may show again next visit */
  }
}

export default function TwinsModal() {
  const [open, setOpen] = useState(false)
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const prevFocus = useRef(null)

  // Trigger: 10s after mount, open on the first scroll | pointerdown | keydown | touchstart.
  useEffect(() => {
    if (window.location.pathname.startsWith('/product/digital-twins')) return
    if (hasSeen()) return

    let armed = false
    const onInteract = () => {
      if (!armed) return
      armed = false
      remove()
      markSeen()
      setOpen(true)
    }
    const remove = () => TRIGGER_EVENTS.forEach((e) => window.removeEventListener(e, onInteract, true))
    const timer = window.setTimeout(() => {
      if (hasSeen()) return
      armed = true
      TRIGGER_EVENTS.forEach((e) => window.addEventListener(e, onInteract, { capture: true, passive: true }))
    }, DELAY_MS)

    return () => {
      window.clearTimeout(timer)
      remove()
    }
  }, [])

  const close = useCallback(() => setOpen(false), [])

  // While open: Esc closes, focus trapped, focus restored on close. The live page does NOT lock page scroll
  // (measured: wheel scrolls the document behind the open dialog), so no overflow lock here.
  useEffect(() => {
    if (!open) return
    prevFocus.current = document.activeElement
    // Deferred so the mousedown default action of the opening click doesn't steal focus back.
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 0)

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
        return
      }
      if (e.key !== 'Tab' || !dialogRef.current) return
      const nodes = Array.from(dialogRef.current.querySelectorAll(FOCUSABLE))
      if (!nodes.length) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (e.shiftKey && (document.activeElement === first || !dialogRef.current.contains(document.activeElement))) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)

    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', onKey)
      if (prevFocus.current && typeof prevFocus.current.focus === 'function') prevFocus.current.focus()
    }
  }, [open, close])

  if (!open) return null

  return (
    <div className="twins-modal">
      <div className="twins-backdrop" onClick={close} />
      <div
        ref={dialogRef}
        className="twins-dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Introducing Digital Twins"
        tabIndex={-1}
      >
        <button ref={closeRef} type="button" className="twins-close" aria-label="Close" onClick={close}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke="currentColor" strokeLinecap="square" strokeWidth="2" d="M17 7 7 17M7 7l10 10" />
          </svg>
        </button>
        <div className="twins-copy">
          <h2 className="twins-h2">
            Introducing
            <br />
            Digital Twins
          </h2>
          <p className="twins-p">Personas describe your customers. Digital Twins let you talk to them.</p>
          <a href="#" className="btn twins-cta">See how they work</a>
        </div>
        <img className="twins-img" src="/assets/digital-twins-popup.png" alt="" width="800" height="688" decoding="async" />
      </div>
    </div>
  )
}
