import { useCallback, useEffect, useRef, useState } from 'react'

// Hover/focus tooltip used by the pricing table labels (`e1hik68n0/1/3`) and plan-card terms (`eefq08u*`).
// pricing.md §3: shown on mouseover/focus; follows the cursor at (clientX+16, clientY±16), flipping above
// when it would overflow the bottom; on keyboard focus it sits at label.bottom+16 / label.left; hidden on
// mouseout, blur, or any document scroll. ≤1280 the stylesheet overrides the position (see pricing.css).
export default function TipTerm({ tip, children, className = '', termClassName = '' }) {
  const [visible, setVisible] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const tipRef = useRef(null)
  const labelRef = useRef(null)

  const place = useCallback((cx, cy) => {
    const h = tipRef.current?.offsetHeight || 0
    const y = cy + 16 + h > window.innerHeight ? cy - 16 - h : cy + 16
    setPos({ x: cx + 16, y })
  }, [])

  useEffect(() => {
    if (!visible) return undefined
    const hide = () => setVisible(false)
    document.addEventListener('scroll', hide, { passive: true, capture: true })
    return () => document.removeEventListener('scroll', hide, { capture: true })
  }, [visible])

  return (
    <span
      ref={labelRef}
      className={`co-tipterm ${className}`}
      tabIndex={0}
      onMouseOver={(e) => { place(e.clientX, e.clientY); setVisible(true) }}
      onMouseMove={(e) => place(e.clientX, e.clientY)}
      onMouseOut={() => setVisible(false)}
      onFocus={() => {
        const r = labelRef.current.getBoundingClientRect()
        setPos({ x: r.left, y: r.bottom + 16 })
        setVisible(true)
      }}
      onBlur={() => setVisible(false)}
    >
      <span className={termClassName}>{children}</span>
      <span
        ref={tipRef}
        role="tooltip"
        className="co-tip co-p14"
        data-visible={visible ? 'true' : undefined}
        style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      >
        {tip}
      </span>
    </span>
  )
}
