import { useState } from 'react'
import Icon from './Icon.jsx'
import '../../styles/company/components.css'

// YouTubeEmbed — inline 16:9 YouTube inside rich text (company-shared.md S0.6), click-to-load.
// Props: { youtubeId, poster?, title? }. Shows the poster + S5 play tile; click swaps in
// https://www.youtube.com/embed/{id}?rel=0&autoplay=1&modestbranding=1 (autoplay=1 only because the user clicked).
export default function YouTubeEmbed({ youtubeId, poster, title = 'YouTube video' }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className="co-yt">
      <div className="co-yt__frame">
        {loaded ? (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?rel=0&autoplay=1&modestbranding=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button type="button" className="co-yt__btn" onClick={() => setLoaded(true)} aria-label={`Play ${title}`}>
            {poster && <img className="co-yt__poster" src={poster} alt="" loading="lazy" />}
            <span className="co-video__play"><Icon src="/assets/company/svg/icon-play.svg" /></span>
          </button>
        )}
      </div>
    </div>
  )
}
