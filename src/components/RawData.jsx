import { useEffect, useRef, useState } from 'react'
import '../styles/topics.css'
import '../styles/RawData.css'

// §5 "Turn raw data into rich context". Descriptions are length-matched placeholder copy (spec gives char counts only).

const RINGS = [
  { cx: 639.29, cy: 322.27, rx: 602.52, ry: 250, rot: -15, dir: 1 },
  { cx: 654.95, cy: 318, rx: 476, ry: 191, rot: 15, dir: -1 },
  { cx: 638.53, cy: 325.66, rx: 414.1, ry: 164.15, rot: -25.01, dir: 1 },
]

const STEPS = [
  { label: 'Indexation', title: 'Indexation', left: 207, top: 105, desc: 'Every file is catalogued the moment it arrives, so its contents can be searched, filtered and referenced later on.' },
  { label: 'Classification', title: 'Classification', left: 127, top: 231, desc: 'Incoming material is sorted into consistent categories, making it simple to group and compare similar items.' },
  { label: 'Synthesis', title: 'Synthesis', left: 205, top: 436, desc: 'Related observations are combined into clear themes that summarize what many separate sources are saying together.' },
  { label: 'Embedding', title: 'Embedding', left: 10, top: 380, desc: 'Content is converted into a numeric form that lets the system find passages with similar meaning, not just words.' },
  { label: 'Enrichment', title: 'Enrichment', left: 193, top: 580, desc: 'Records gain helpful details such as account, segment and source, so every insight carries its full context.' },
  { label: 'Redaction', title: 'Redaction', left: 898, top: 16, desc: 'Sensitive personal details are detected and removed automatically before anything is stored or shared with others.' },
  { label: 'Transcription', title: 'Transcription', left: 942, top: 143, desc: 'Audio and video recordings are turned into accurate, timestamped text that you can read, search and quote directly.' },
  { label: 'Translation', title: 'Translation', left: 1144, top: 233, desc: 'Feedback written or spoken in other languages is rendered in your own so global voices are part of every analysis.' },
  { label: 'Diarization', title: 'Diarization', left: 1045, top: 368, desc: 'Conversations are split by speaker so each remark is attributed to the right person throughout the whole session.' },
  { label: 'OCR', title: 'Optical Character Recognition', left: 983, top: 505, desc: 'Text inside images, scans and screenshots is extracted and made readable, so nothing visual is left out of the record.' },
]

// Seeded node placement — verbatim from spec §5 motion.
function n4(rings, weights, count, [lapMin, lapMax], seed) {
  let r = seed
  const rnd = () => {
    let e = Math.imul((r = (r + 0x6d2b79f5) | 0) ^ (r >>> 15), 1 | r)
    return (((e = (e + Math.imul(e ^ (e >>> 7), 61 | e)) ^ e) ^ (e >>> 14)) >>> 0) / 4294967296
  }
  return Array.from({ length: count }, () => {
    let a = rnd(), i = 0
    while (i < weights.length - 1 && a > weights[i]) { a -= weights[i]; i++ }
    return { ring: rings[i], angle: 2 * rnd() * Math.PI - Math.PI, lap: lapMin + rnd() * (lapMax - lapMin) }
  })
}

function nodeTransform(ring, theta) {
  const rot = (ring.rot * Math.PI) / 180
  const x = ring.cx + ring.rx * Math.cos(theta) * Math.cos(rot) - ring.ry * Math.sin(theta) * Math.sin(rot)
  const y = ring.cy + ring.rx * Math.cos(theta) * Math.sin(rot) + ring.ry * Math.sin(theta) * Math.cos(rot)
  const deg = (Math.atan2(ring.ry * Math.cos(theta), -ring.rx * Math.sin(theta)) * 180) / Math.PI + ring.rot
  return `translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${deg.toFixed(1)})`
}

const INITIAL_NODES = n4([0, 1, 2], [0.4, 0.32, 0.28], 96, [24, 60], 21)

function PlusIcon() {
  return (
    <svg className="raw-pill-plus" aria-hidden="true" fill="none" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 1v8M1 5h8" stroke="currentColor" strokeLinecap="round" strokeWidth="1.25" />
    </svg>
  )
}

function Diagram() {
  const wrapRef = useRef(null)
  const glowRef = useRef(null)
  const nodeRefs = useRef([])
  const [scale, setScale] = useState(null)
  const [activeStep, setActiveStep] = useState(null)

  // Scale the 1280x630 stage to the wrapper width.
  useEffect(() => {
    const el = wrapRef.current
    const ro = new ResizeObserver(() => setScale(el.clientWidth / 1280))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Orbit loop: rAF only while intersecting; disabled with reduced motion.
  useEffect(() => {
    const el = wrapRef.current
    const nodes = INITIAL_NODES.map((n) => ({ ...n }))
    let raf = 0, last = 0, m = 0

    const render = () => {
      nodes.forEach((n, i) => nodeRefs.current[i]?.setAttribute('transform', nodeTransform(RINGS[n.ring], n.angle)))
      const f = (1 - Math.cos((2 * Math.PI * m) / 4)) / 2
      if (glowRef.current) {
        glowRef.current.style.transform = `translateX(0px) scale(${1 + 0.22 * f})`
        glowRef.current.style.opacity = String(0.45 + f * 0.55)
      }
    }
    const frame = (now) => {
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0
      last = now
      m += dt
      nodes.forEach((n, i) => {
        n.angle += ((2 * RINGS[n.ring].dir * Math.PI) / n.lap) * (1 + 0.3 * Math.sin(0.35 * m + 1.7 * i)) * dt
      })
      render()
      raf = requestAnimationFrame(frame)
    }
    const start = () => { if (!raf) { last = 0; raf = requestAnimationFrame(frame) } }
    const stop = () => { cancelAnimationFrame(raf); raf = 0 }

    render()
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return undefined
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()))
    io.observe(el)
    return () => { io.disconnect(); stop() }
  }, [])

  return (
    <div className="raw-diagram" ref={wrapRef}>
      <div
        className="raw-stage"
        data-ready={scale ? 'true' : 'false'}
        style={scale ? { transform: `scale(${scale})` } : undefined}
      >
        <svg className="raw-svg" viewBox="0 0 1280 630" aria-hidden="true">
          {RINGS.map((r) => (
            <ellipse key={r.cx} cx={r.cx} cy={r.cy} rx={r.rx} ry={r.ry} transform={`rotate(${r.rot} ${r.cx} ${r.cy})`} />
          ))}
          {INITIAL_NODES.map((n, i) => (
            <rect
              key={i}
              ref={(el) => (nodeRefs.current[i] = el)}
              className="fill-blue"
              x="-3" y="-3" width="6" height="6"
              transform={nodeTransform(RINGS[n.ring], n.angle)}
            />
          ))}
        </svg>
        <div className="raw-mask" aria-hidden="true" />
        <div className="raw-center" data-hidden={activeStep !== null ? 'true' : 'false'}>
          <img ref={glowRef} className="raw-glow" src="/assets/home-diagram-glow.svg" alt="" />
          <img className="raw-db" src="/assets/home-diagram-database.png" alt="" />
          <p className="raw-caption mono-12">Multimodal data processing</p>
        </div>
        <div className="raw-copy" aria-live="polite">
          {STEPS.map((s, i) => (
            <div key={s.label} className="raw-copy-item" data-active={activeStep === i ? 'true' : 'false'}>
              <p className="raw-copy-title">{s.title}</p>
              <p className="raw-copy-desc">{s.desc}</p>
            </div>
          ))}
        </div>
        {STEPS.map((s, i) => (
          <button
            key={s.label}
            type="button"
            className="raw-pill mono-14"
            style={{ left: s.left, top: s.top }}
            aria-pressed={activeStep === i}
            onMouseEnter={() => setActiveStep(i)}
            onMouseLeave={() => setActiveStep(null)}
            onFocus={() => setActiveStep(i)}
            onBlur={() => setActiveStep(null)}
            onClick={() => setActiveStep((cur) => (cur === i ? null : i))}
          >
            {s.label}
            <PlusIcon />
          </button>
        ))}
      </div>
    </div>
  )
}

export default function RawData() {
  return (
    <section className="raw-data">
      <div className="container">
        <div className="raw-header">
          <h2 className="h96">
            Turn raw{' '}
            <span className="h2-inline-img raw-h2-img">
              <img src="/assets/home-diagram-raw-data.png" alt="" />
            </span>{' '}
            data into <span className="h96-serif">rich context</span>
          </h2>
          <p>
            Recordings, documents, tickets and images arrive in every format. Each one is processed into structured,
            searchable, linked knowledge that your people and your tools can trust and act on.
          </p>
          <div className="cta-row">
            <a href="#" className="btn btn-primary">Book a demo</a>
            <a href="#" className="btn btn-glass">Start free trial</a>
          </div>
        </div>

        <Diagram />

        <div className="raw-mobile">
          <div className="raw-mobile-art" aria-hidden="true">
            <img className="raw-glow" src="/assets/home-diagram-glow.svg" alt="" />
            <img className="raw-db" src="/assets/home-diagram-database.png" alt="" />
          </div>
          <div className="raw-mobile-list">
            {STEPS.map((s) => (
              <div key={s.label} className="raw-mobile-item">
                <span className="raw-pill mono-14">{s.label}</span>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
