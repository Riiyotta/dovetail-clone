import { useCallback, useState } from 'react'
import Icon from './Icon.jsx'
import VideoModal from './VideoModal.jsx'
import '../../styles/company/base.css'
import '../../styles/company/components.css'

// VideoCard (company-shared.md S5 card). Click opens <VideoModal> with the YouTube embed.
// Props:
//   youtubeId  string (required for the modal; without it the card is a static poster)
//   image, alt poster image
//   variant    'thumb' (live demos / careers / resources: 1px rgb(49,49,49) border, radius 4) | 'hero' (story/event hero: radius 8, no border)
//   title?     H20 below the card;  date? M14 #A7A7A7 below the title
export default function VideoCard({ youtubeId, image, alt = '', variant = 'thumb', title, date }) {
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])
  return (
    <div className={`co-video co-video--${variant}`}>
      <button type="button" className="co-video__btn" onClick={() => youtubeId && setOpen(true)} aria-label={title ? `Play video: ${title}` : 'Play video'}>
        <img className="co-video__img" src={image} alt={alt} loading="lazy" />
        <span className="co-video__play"><Icon src="/assets/company/svg/icon-play.svg" /></span>
      </button>
      {title && <h3 className="co-video__title co-h20">{title}</h3>}
      {date && <p className="co-video__date co-m14" style={{ marginBottom: 0 }}>{date}</p>}
      {open && <VideoModal youtubeId={youtubeId} title={title || alt || 'Video'} onClose={close} />}
    </div>
  )
}
