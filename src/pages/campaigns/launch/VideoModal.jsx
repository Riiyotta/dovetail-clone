import { useEffect } from 'react'
import { createPortal } from 'react-dom'

// YouTube modal for "Watch the keynote" (launch.md CTA). Sizing from the product video modal
// (specs/product.md: portal, html scroll locked, content 1120px wide, md calc(100% - 32px)).
// The launch modal's own skin was not captured.
export default function VideoModal({ videoId, title, onClose }) {
  useEffect(() => {
    const html = document.documentElement
    const prev = html.style.overflow
    html.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => {
      html.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return createPortal(
    <div className="lx-vmodal" role="dialog" aria-modal="true" aria-label={title} onClick={onClose}>
      <div className="lx-vmodal__content" onClick={(e) => e.stopPropagation()}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    </div>,
    document.body,
  )
}
