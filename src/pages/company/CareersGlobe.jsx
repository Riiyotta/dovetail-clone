import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Icon from '../../components/company/Icon.jsx'

gsap.registerPlugin(ScrollTrigger)

// Careers point-sphere globe — specs/careers.md §2 canvas algorithm (source `GlobeAnimationV2`), reproduced as recorded.
// Props: triggerRef = the whole CareersGlobeSlice (ScrollTrigger start "top bottom", end "bottom top").
// Dot colour is read from the canvas's CSS `color` (theme blue) so no colour literal lives in JS.

function makePoint(R) {
  const theta = Math.acos(-1 + 2 * Math.random())
  const phi = Math.random() * 2 * Math.PI
  const r = R * (1 + 0.05 * Math.random())
  const tx = r * Math.cos(phi) * Math.sin(theta)
  const ty = r * Math.sin(phi) * Math.sin(theta)
  const tz = r * Math.cos(theta)
  return {
    tx, ty, tz, x: tx, y: ty, z: tz,
    ditherThreshold: 0.4 * Math.random() - 0.2,
    isPermanentShadow: Math.random() < 0.02,
    visible: true,
    phase: Math.random() * 2 * Math.PI,
  }
}

const byZDesc = (a, b) => b.z - a.z

export default function CareersGlobe({ triggerRef }) {
  const boxRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const box = boxRef.current
    const canvas = canvasRef.current
    if (!box || !canvas) return undefined
    const ctx = canvas.getContext('2d')
    const dot = getComputedStyle(canvas).color
    const state = { time: 0, rotSpeed: 0.005, t: 0, points: [], R: 0, w: 0, h: 0 }

    const setup = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = box.getBoundingClientRect()
      // The box may be scaled with CSS transforms (.82 / .65); size the canvas from its layout size.
      const w = Math.round(box.offsetWidth * dpr)
      const h = Math.round(box.offsetHeight * dpr)
      if (!rect.width || (w === state.w && h === state.h)) return
      canvas.width = w
      canvas.height = h
      state.w = w
      state.h = h
      state.R = 0.35 * Math.min(w, h)
      state.points = Array.from({ length: 2000 }, () => makePoint(state.R)).sort(byZDesc)
    }

    const draw = () => {
      const { w, h } = state
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = dot
      const c = state.t
      for (const p of state.points) {
        if (!p.visible) continue
        const s = 1200 / (1200 + p.z)
        const jx = 0.8 * Math.sin(3 * c + p.phase)
        const jy = 0.8 * Math.cos(2.1 * c + 1.4 * p.phase)
        const X = p.x * s + w / 2 + jx
        const Y = p.y * s + h / 2 + jy
        const size = 4 * s
        ctx.globalAlpha = Math.max(0.3, 1 - 0.2 * Math.abs(Math.sin(3 * c + p.phase)))
        ctx.fillRect(X - size / 2, Y - size / 2, size, size)
      }
      ctx.globalAlpha = 1
    }

    // rAF loop only while the box intersects and the tab is visible.
    let raf = 0
    let inView = false
    const loop = () => {
      state.t += 0.016
      draw()
      raf = requestAnimationFrame(loop)
    }
    const run = () => {
      const should = inView && document.visibilityState === 'visible'
      if (should && !raf) raf = requestAnimationFrame(loop)
      if (!should && raf) { cancelAnimationFrame(raf); raf = 0 }
    }
    const io = new IntersectionObserver(([e]) => { inView = e.isIntersecting; run() })
    io.observe(box)
    document.addEventListener('visibilitychange', run)

    const onScrollUpdate = () => {
      state.time++
      if (state.time > 200 && state.points.length < 5000) {
        for (let i = 0; i < 40; i++) state.points.push(makePoint(state.R))
      }
      if (state.time > 180) {
        state.rotSpeed *= 0.9
        if (state.rotSpeed < 1e-5) state.rotSpeed = 0
      }
      const a = 0.01 * state.time + Math.PI
      let lx = Math.sin(a); let ly = 0.2; let lz = Math.cos(a)
      const ln = Math.hypot(lx, ly, lz)
      lx /= ln; ly /= ln; lz /= ln
      const cos = Math.cos(state.rotSpeed)
      const sin = Math.sin(state.rotSpeed)
      for (const p of state.points) {
        p.x += (p.tx - p.x) * 0.02
        p.y += (p.ty - p.y) * 0.02
        p.z += (p.tz - p.z) * 0.02
        if (state.rotSpeed > 0) {
          const tx = p.tx * cos - p.tz * sin
          const tz = p.tx * sin + p.tz * cos
          p.tx = tx
          p.tz = tz
        }
        const n = Math.hypot(p.tx, p.ty, p.tz) || 1
        p.visible = (p.tx * lx + p.ty * ly + p.tz * lz) / n > p.ditherThreshold || p.isPermanentShadow
      }
      state.points.sort(byZDesc)
      draw()
    }

    setup()
    draw()
    const ro = new ResizeObserver(() => { setup(); draw() })
    ro.observe(box)
    const st = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: onScrollUpdate,
    })

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      document.removeEventListener('visibilitychange', run)
      st.kill()
    }
  }, [triggerRef])

  return (
    <div className="cr-globe__box" ref={boxRef}>
      <Icon src="/assets/company/svg/careers-globe-wireframe.svg" className="cr-globe__wire" />
      <canvas className="cr-globe__canvas" ref={canvasRef} aria-hidden="true" />
    </div>
  )
}
