import { useEffect, useState } from 'react'
import { placeholder, MaskIcon } from '../shared.jsx'
import { section, pick, textOf } from './data.js'

// launch.md §4–11 "Digital twins carousel" (e5zj3j*).
// Behaviour built here: 3 personas, number buttons + prev/next select, auto-advance every 10s
// (a setTimeout reset on every change), photo crossfade (CSS opacity transition on `shown`).
// Left for the animation pass: float pop-in keyframes (each float carries --order 1–7 and the float layer is
// re-keyed per slide so keyframes restart) and cursor parallax (write --cx/--cy on each [data-float]).

const AUTO_ADVANCE_MS = 10000

// Only Jess's floating set (video poster, tool logos, card, question bubbles) was captured in the data file.
// Anahita/Travis: name/role from the data's photo alt + button aria-labels; video files by asset name.
const EXTRA = [
  {},
  { video: '/assets/marketing/launch-2026-twin-ana.mp4' },
  { video: '/assets/marketing/launch-2026-twin-trav.mp4', poster: '/assets/marketing/launch-2026-twin-trav-poster.jpg' },
]

function usePersonas(sec) {
  const photos = pick(sec, 'e5zj3j17')
  const [video] = pick(sec, 'e5zj3j20')
  const jessBio = pick(sec, 'e5zj3j8')[0]
  return photos.map((p, i) => {
    const [name, role] = p.alt.split(', ')
    const base = { name, role, photo: p, bioChars: jessBio.chars, ...EXTRA[i] }
    if (i !== 0) return base
    return {
      ...base,
      name: textOf(sec, 'e5zj3j6'),
      role: textOf(sec, 'e5zj3j7'),
      video: video.src,
      poster: video.poster,
      tools: pick(sec, 'e5zj3j22'),
      card: pick(sec, 'e5zj3j24')[0],
      q1: textOf(sec, 'e5zj3j26'),
      q2: textOf(sec, 'e5zj3j28'),
    }
  })
}

export default function DigitalTwins() {
  const sec = section('LaunchDigitalTwins')
  const personas = usePersonas(sec)
  const numbers = pick(sec, 'e5zj3j10')
  const [pixels] = pick(sec, 'e5zj3j14')
  const useCases = pick(sec, 'e5zj3j31')
  const [arrow] = pick(sec, 'svg')
  const intro = pick(sec, 'e5zj3j2')[0]
  const em = textOf(sec, 'em')
  const [index, setIndex] = useState(0)
  const n = personas.length

  useEffect(() => {
    const t = setTimeout(() => setIndex((i) => (i + 1) % n), AUTO_ADVANCE_MS)
    return () => clearTimeout(t)
  }, [index, n])

  const p = personas[index]
  const introText = placeholder(intro.chars - em.length - 1).slice(0, -1)

  return (
    <section id="launch-digital-twins" className="lx-anchor lx-twins">
      <div className="cmp-container">
        <div className="cmp-grid lx-twins__head">
          <p className="lx-h56 lx-twins__title">{textOf(sec, 'e5zj3j1')}</p>
          <p className="lx-twins__intro">{introText} <em>{em}</em>.</p>
        </div>
        <div className="cmp-grid lx-twins__grid">
          <div className="lx-twins__left">
            <p className="lx-twins__name">{p.name}</p>
            <p className="lx-twins__role">{p.role}</p>
            <p className="lx-twins__bio">{placeholder(p.bioChars)}</p>
            <div className="lx-twins__nums">
              {numbers.map((b, i) => (
                <button
                  key={b.text}
                  type="button"
                  className="lx-twins__num"
                  data-active={i === index}
                  aria-label={b.ariaLabel}
                  aria-pressed={i === index}
                  onClick={() => setIndex(i)}
                >
                  {b.text}
                </button>
              ))}
            </div>
          </div>

          <div className="lx-twins__stage-col">
            <div className="lx-twins__stage" data-parallax-stage>
              <img className="lx-twins__pixels" src={pixels.src} alt="" />
              <div className="lx-twins__photo">
                {personas.map((q, i) => (
                  <img key={q.photo.src} className="lx-twins__photo-img" data-shown={i === index} src={q.photo.src} alt={q.photo.alt} />
                ))}
              </div>
              <div className="lx-twins__floats" key={index}>
                <div className="lx-float lx-float--video" data-float>
                  <div className="lx-float__video" style={{ '--order': 1 }}>
                    <video src={p.video} poster={p.poster} autoPlay muted loop playsInline />
                  </div>
                </div>
                {p.tools?.map((t, i) => (
                  <div key={t.src} className={`lx-float lx-float--tool lx-float--tool${i + 1}`} data-float>
                    <img className="lx-float__tool" style={{ '--order': i + 2 }} src={t.src} alt="" />
                  </div>
                ))}
                {p.card && (
                  <div className="lx-float lx-float--card" data-float>
                    <img className="lx-float__card" style={{ '--order': 5 }} src={p.card.src} alt="" />
                  </div>
                )}
                {p.q1 && (
                  <div className="lx-float lx-float--q1" data-float>
                    <div className="lx-float__q1" style={{ '--order': 6 }}>{p.q1}</div>
                  </div>
                )}
                {p.q2 && (
                  <div className="lx-float lx-float--q2" data-float>
                    <div className="lx-float__q2" style={{ '--order': 7 }}>{p.q2}</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lx-twins__right">
            <p className="lx-twins__label">{textOf(sec, 'e5zj3j30')}</p>
            {useCases.map((u) => <p key={u.text} className="lx-twins__case">{u.text}</p>)}
            <div className="lx-twins__arrows">
              <button type="button" className="lx-twins__arrow lx-twins__arrow--prev" data-dim={index === 0}
                aria-label="Previous" onClick={() => setIndex((i) => (i - 1 + n) % n)}>
                <MaskIcon src={arrow.src} className="lx-twins__arrow-icon" />
              </button>
              <button type="button" className="lx-twins__arrow"
                aria-label="Next" onClick={() => setIndex((i) => (i + 1) % n)}>
                <MaskIcon src={arrow.src} className="lx-twins__arrow-icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
