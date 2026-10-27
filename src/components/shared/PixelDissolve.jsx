import { useEffect, useRef } from 'react'
import '../../styles/shared.css'

// Shared component B — PixelDissolve (CLONE_SPEC.md).
const SIZE = 16
const DURATION = 300

export default function PixelDissolve({ active, color }) {
  const canvasRef = useRef(null)
  const state = useRef({ p: 0, cols: 0, cells: 0, order: [], raf: 0, draw: null })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const s = state.current

    s.draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = s.color
      const n = Math.round(s.p * s.cells)
      for (let k = 0; k < n; k++) {
        const i = s.order[k]
        ctx.fillRect((i % s.cols) * SIZE, Math.floor(i / s.cols) * SIZE, SIZE, SIZE)
      }
    }

    const build = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      canvas.width = Math.max(1, w)
      canvas.height = Math.max(1, h)
      s.cols = Math.ceil(w / SIZE)
      s.cells = s.cols * Math.ceil(h / SIZE)
      const order = Array.from({ length: s.cells }, (_, i) => i)
      for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[order[i], order[j]] = [order[j], order[i]]
      }
      s.order = order
      s.draw()
    }

    build()
    const ro = new ResizeObserver(build)
    ro.observe(canvas)
    return () => { ro.disconnect(); cancelAnimationFrame(s.raf) }
  }, [])

  useEffect(() => {
    state.current.color = color
    state.current.draw?.()
  }, [color])

  useEffect(() => {
    const s = state.current
    const target = active ? 1 : 0
    const p0 = s.p
    const start = performance.now()
    cancelAnimationFrame(s.raf)
    const frame = (now) => {
      const k = Math.min(1, (now - start) / DURATION)
      s.p = p0 + (target - p0) * k
      s.draw?.()
      if (k < 1) s.raf = requestAnimationFrame(frame)
    }
    s.raf = requestAnimationFrame(frame)
  }, [active])

  return <canvas ref={canvasRef} className="pixel-dissolve" aria-hidden="true" />
}
