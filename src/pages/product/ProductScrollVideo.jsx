import { useEffect, useRef, useState } from 'react'
import { MaskIcon } from '../../components/marketing/content.jsx'

const clamp = (v) => Math.min(1, Math.max(0, v))
const START_WIDTH = 827

// ProductScrollVideoSlice (product.md §4, `e182vtoz*`). videoId / videoScale come from the page config.
export default function ProductScrollVideo({ data, videoId, videoScale = 1 }) {
  const video = data.content.find((x) => x.role === 'video')
  const playIcon = data.content.find((x) => x.role === 'svg')
  const rootRef = useRef(null)
  const cardRef = useRef(null)
  const tileRef = useRef(null)
  const videoRef = useRef(null)
  const geo = useRef({ top: 0, s: 0 })
  const [playing, setPlaying] = useState(false)
  const playingRef = useRef(false)
  playingRef.current = playing

  // Scroll scale (≥1281 only, rAF-throttled scroll/resize, off for reduced motion).
  useEffect(() => {
    const card = cardRef.current
    const mqDesk = window.matchMedia('(min-width: 1281px)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) rootRef.current.dataset.disabled = 'true'
    let raf = 0
    const measure = () => {
      const prev = card.style.transform
      card.style.transform = 'none'
      geo.current.top = card.getBoundingClientRect().top + window.scrollY
      card.style.transform = prev
    }
    const update = () => {
      raf = 0
      const n = 0.55 * window.innerHeight
      const s = clamp((window.innerHeight - (geo.current.top - window.scrollY)) / n)
      geo.current.s = s
      if (playingRef.current && s < 0.95) setPlaying(false)
      const tile = tileRef.current
      if (!mqDesk.matches || reduced) {
        card.style.transform = ''
        if (tile) tile.style.transform = ''
        return
      }
      const a = clamp(START_WIDTH / card.offsetWidth)
      const scale = a + s * (1 - a)
      card.style.transform = `scale(${scale})`
      if (tile) tile.style.transform = `translate(-50%, -50%) scale(${1 / scale})`
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    const onResize = () => { measure(); onScroll() }
    measure()
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    window.addEventListener('load', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('load', onResize)
    }
  }, [])

  // Poster video plays only while within rootMargin 100px of the viewport.
  useEffect(() => {
    const v = videoRef.current
    if (!v) return undefined
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play?.().catch(() => {})
      else v.pause?.()
    }, { rootMargin: '100px' })
    io.observe(v)
    return () => io.disconnect()
  }, [playing])

  const onClick = () => {
    const desk = window.matchMedia('(min-width: 1281px)').matches
    if (desk && geo.current.s < 1) {
      // Scroll so that s = 1, then swap in the iframe.
      const target = geo.current.top - window.innerHeight + 0.55 * window.innerHeight
      window.scrollTo({ top: target, behavior: 'smooth' })
      const start = performance.now()
      const wait = () => {
        if (geo.current.s >= 0.999 || performance.now() - start > 1500) setPlaying(true)
        else requestAnimationFrame(wait)
      }
      requestAnimationFrame(wait)
    } else setPlaying(true)
  }

  // Remote posters (DT's YouTube thumbnail) aren't local assets, so only local posters are used.
  const poster = video?.poster && video.poster.startsWith('/') ? video.poster : undefined

  return (
    <div className="pd-svideo" ref={rootRef}>
      <section className="pd-svideo__section">
        <div ref={cardRef} className="pd-svideo__card">
          {playing && videoId ? (
            <iframe
              className="pd-svideo__iframe"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title="Video"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button type="button" className="pd-svideo__btn" aria-label="Play video" onClick={onClick}>
              {video && (
                <video ref={videoRef} className="pd-svideo__video" src={video.src} poster={poster} muted loop playsInline
                  preload="none" style={{ transform: videoScale !== 1 ? `scale(${videoScale})` : undefined }} />
              )}
              <span ref={tileRef} className="pd-svideo__tile">{playIcon && <MaskIcon src={playIcon.src} className="pd-svideo__tile-icon" />}</span>
            </button>
          )}
        </div>
      </section>
    </div>
  )
}
