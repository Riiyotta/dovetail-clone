import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import '../../styles/company/components.css'

// VideoModal (company-shared.md S5 modal). Props: { youtubeId, title?, onClose }.
// Mount it only while open. Escape and backdrop click close it; focus moves to the close button.
export default function VideoModal({ youtubeId, title = 'Video', onClose }) {
  const closeRef = useRef(null)
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    const prev = document.activeElement
    closeRef.current?.focus()
    return () => { document.removeEventListener('keydown', onKey); prev?.focus?.() }
  }, [onClose])
  return createPortal(
    <div className="co-modal" role="dialog" aria-modal="true" aria-label={title}>
      <div className="co-modal__backdrop" onClick={onClose} />
      <button ref={closeRef} type="button" className="co-modal__close" aria-label="Close video" onClick={onClose}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>
      <div className="co-modal__frame">
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?rel=0&autoplay=1&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>,
    document.body,
  )
}
