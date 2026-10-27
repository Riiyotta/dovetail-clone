import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import '../../styles/shared.css'

// Shared component C — cursor Tooltip (CLONE_SPEC.md).
const OFFSET = 16

export default function CursorTooltip({ active, label = 'Read customer story' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!active) {
      el.style.opacity = '0'
      setVisible(false)
      return
    }
    // Original sets the label's data-visible on activation; the wrapper's opacity waits for the first move.
    setVisible(true)
    let shown = false
    const onMove = (e) => {
      const { offsetWidth: tw, offsetHeight: th } = el
      let x = e.clientX + OFFSET
      let y = e.clientY + OFFSET
      if (x + tw > window.innerWidth) x = e.clientX - OFFSET - tw
      if (y + th > window.innerHeight) y = e.clientY - OFFSET - th
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`
      if (!shown) {
        shown = true
        el.style.opacity = '1'
      }
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [active])

  return createPortal(
    <div ref={ref} className="cursor-tooltip" aria-hidden="true">
      <span className="cursor-tooltip__label mono-12" data-visible={visible ? 'true' : 'false'}>{label}</span>
    </div>,
    document.body,
  )
}
