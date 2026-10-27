import { useEffect, useRef } from 'react'
import '../../styles/shared.css'

// Shared component A — "QuoteAsciiBackground" (CLONE_SPEC.md).
const GLYPHS = ['0', '1', '0', '1', '2', '+', '=', '-', '.', ':', '/', '*', '<', '>', '|', '%']
const OPTS = { hoverReveal: 0.8, hoverMax: 0.18, pushStrength: 16, hoverRadius: 230, baseMin: 0.08, baseMax: 0.24, rgb: '255, 255, 255' }
const CELL = 15
const FRAME_MS = 1000 / 30
const makeLut = (rgb) => Array.from({ length: 101 }, (_, i) => `rgba(${rgb}, ${i / 100})`)
const LUT_DEFAULT = makeLut(OPTS.rgb)

export default function AsciiField({ className = '', rgb = OPTS.rgb }) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const LUT = rgb === OPTS.rgb ? LUT_DEFAULT : makeLut(rgb)
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    const parent = wrap.parentElement
    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w = 0, h = 0, cols = 0, rows = 0, count = 0
    let glyph = new Uint8Array(0), thr = new Float32Array(0), offX = new Float32Array(0), offY = new Float32Array(0), velX = new Float32Array(0), velY = new Float32Array(0)
    const mouse = { x: 0, y: 0, active: false }
    let raf = 0, last = 0, inView = false, running = false

    function build() {
      const rect = wrap.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return
      w = rect.width
      h = rect.height
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.ceil(w / CELL)
      rows = Math.ceil(h / CELL)
      count = cols * rows
      glyph = new Uint8Array(count)
      thr = new Float32Array(count)
      offX = new Float32Array(count)
      offY = new Float32Array(count)
      velX = new Float32Array(count)
      velY = new Float32Array(count)
      for (let i = 0; i < count; i++) {
        glyph[i] = Math.floor(Math.random() * GLYPHS.length)
        thr[i] = Math.random()
      }
    }

    function draw(t) {
      ctx.clearRect(0, 0, w, h)
      ctx.font = '11px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      const s = reduced ? 0 : 0.0011 * t
      const R = OPTS.hoverRadius
      for (let r = 0; r < rows; r++) {
        const y = CELL * r + 7.5
        const v = r / rows
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c
          const x = CELL * c + 7.5
          const u = c / cols
          const U = u + 0.06 * Math.sin(4 * v + 0.6 * s)
          const V = v + 0.06 * Math.sin(4 * u - 0.5 * s)
          const I = (Math.sin(6 * U + 1.1 * s) + Math.sin(5 * V - 0.9 * s) + Math.sin((U + V) * 4.5 + 0.75 * s) +
            Math.sin(10 * Math.hypot(U - 0.5, V - 0.55) - 1.3 * s) + 4) / 8
          let T = 0
          if (mouse.active) {
            const d = Math.hypot(x - mouse.x, y - mouse.y)
            if (d < R) T = (1 - d / R) ** 2
          }
          const E = 0.9 * I + ((1 - u) * 0.25 + 0.25 * v) + T * OPTS.hoverReveal
          const D = 0.62 + thr[i] * 0.4
          if (E < D) continue
          const alpha = Math.min(0.95, OPTS.baseMin + Math.min(1, (E - D) / 0.45) * (OPTS.baseMax - OPTS.baseMin) + T * OPTS.hoverMax)
          ctx.fillStyle = LUT[Math.round(alpha * 100)]
          ctx.fillText(GLYPHS[glyph[i]], x + offX[i], y + offY[i])
        }
      }
    }

    function step() {
      const R = OPTS.hoverRadius
      for (let r = 0; r < rows; r++) {
        const y = CELL * r + 7.5
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c
          const x = CELL * c + 7.5
          let tx = 0, ty = 0
          if (mouse.active) {
            const dx = x - mouse.x, dy = y - mouse.y
            const d = Math.hypot(dx, dy)
            if (d < R && d > 0.001) {
              const f = (1 - d / R) ** 2 * OPTS.pushStrength
              tx = (dx / d) * f
              ty = (dy / d) * f
            }
          }
          velX[i] += 0.18 * (tx - offX[i]) - 0.45 * velX[i]
          velY[i] += 0.18 * (ty - offY[i]) - 0.45 * velY[i]
          offX[i] += velX[i]
          offY[i] += velY[i]
        }
      }
      if (count === 0) return
      const n = Math.max(1, Math.floor(0.004 * count))
      for (let k = 0; k < n; k++) glyph[Math.floor(Math.random() * count)] = Math.floor(Math.random() * GLYPHS.length)
    }

    function tick(t) {
      raf = requestAnimationFrame(tick)
      if (t - last < FRAME_MS) return
      last = t
      step()
      draw(t)
    }

    function sync() {
      const should = !reduced && inView && document.visibilityState === 'visible'
      if (should && !running) { running = true; last = 0; raf = requestAnimationFrame(tick) }
      else if (!should && running) { running = false; cancelAnimationFrame(raf) }
    }

    build()
    draw(0)

    const ro = new ResizeObserver(() => { build(); draw(reduced ? 0 : performance.now()) })
    ro.observe(wrap)
    const io = new IntersectionObserver(([e]) => { inView = e.isIntersecting; sync() })
    io.observe(wrap)
    const onVis = () => sync()
    document.addEventListener('visibilitychange', onVis)

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.active = true
      if (reduced) draw(0) // original: static frame is redrawn with the hover reveal under reduced motion
    }
    const onLeave = () => { mouse.active = false; if (reduced) draw(0) }
    parent?.addEventListener('mousemove', onMove)
    parent?.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      parent?.removeEventListener('mousemove', onMove)
      parent?.removeEventListener('mouseleave', onLeave)
    }
  }, [rgb])

  return (
    <div ref={wrapRef} className={`ascii-field ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  )
}
