import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from 'react'
import { latitudePaths, longitudePaths, nodes, ringPoint, STEP_ANGLES } from './globe.js'

const INITIAL_ANGLE = -75
const BLUE = '#0044FF'
const WHITE = '#fafafa' // LIGHT_COLORS.white: inactive markers, progress arc and dot outline (measured fill="#fafafa")
const RING = WHITE

// Spinning wireframe globe + progress ring (§7). The ring state (dot/arc/markers) is driven
// imperatively from the parent's scroll handler via the returned `setAngle` on the ref.
const LoopGlobe = forwardRef(function LoopGlobe(_props, ref) {
  const svgRef = useRef(null)
  const lonRefs = useRef([])
  const nodeRefs = useRef([])
  const arcRef = useRef(null)
  const dotRef = useRef(null)
  const markerRefs = useRef([])

  const lats = useMemo(() => latitudePaths(), [])
  const lons0 = useMemo(() => longitudePaths(0), [])
  const nodes0 = useMemo(() => nodes(0), [])
  const dot0 = ringPoint(INITIAL_ANGLE)

  // Expose the scroll-driven ring update to the parent.
  useImperativeHandle(ref, () => ({
    setAngle(p) {
      const pt = ringPoint(p)
      dotRef.current?.setAttribute('cx', pt.x.toFixed(2))
      dotRef.current?.setAttribute('cy', pt.y.toFixed(2))
      arcRef.current?.setAttribute('stroke-dasharray', `${((p + 90) / 360).toFixed(4)} 1`)
      markerRefs.current.forEach((el, i) => el?.setAttribute('fill', p >= STEP_ANGLES[i] - 0.01 ? BLUE : WHITE))
    },
  }), [])

  // Continuous spin while visible: one revolution per 60s, dt capped at .05s. Off with reduced motion.
  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    let last = 0
    let offset = 0
    const frame = (now) => {
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0
      last = now
      offset -= ((2 * Math.PI) / 60) * dt
      const lons = longitudePaths(offset)
      lons.forEach((d, k) => lonRefs.current[k]?.setAttribute('d', d))
      nodes(offset).forEach((n, t) => {
        const el = nodeRefs.current[t]
        if (!el) return
        el.setAttribute('transform', `translate(${n.x.toFixed(1)} ${n.y.toFixed(1)})`)
        el.setAttribute('opacity', n.opacity.toFixed(2))
      })
      raf = requestAnimationFrame(frame)
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!raf) { last = 0; raf = requestAnimationFrame(frame) }
      } else if (raf) {
        cancelAnimationFrame(raf)
        raf = 0
      }
    })
    io.observe(svg)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [])

  return (
    <svg ref={svgRef} className="loop-globe" viewBox="0 0 840 840" aria-hidden="true">
      <g transform="translate(56 60)" fill="none" stroke="#626262" strokeWidth=".5">
        <circle cx="360" cy="360" r="360" />
        {lats.map((d, i) => <path key={`lat${i}`} d={d} />)}
        {lons0.map((d, k) => <path key={`lon${k}`} ref={(el) => (lonRefs.current[k] = el)} d={d} />)}
        {nodes0.map((n, t) => (
          <rect
            key={`n${t}`}
            ref={(el) => (nodeRefs.current[t] = el)}
            x="-3" y="-3" width="6" height="6" fill={BLUE} stroke="none"
            transform={`translate(${n.x.toFixed(1)} ${n.y.toFixed(1)})`}
            opacity={n.opacity.toFixed(2)}
          />
        ))}
      </g>
      <circle cx="420" cy="420" r="420" fill="none" stroke="#626262" strokeDasharray="4 4" strokeWidth=".5" />
      <circle
        ref={arcRef}
        cx="420" cy="420" r="420" fill="none" stroke={RING} strokeWidth=".5" pathLength="1"
        transform="rotate(-180 420 420)"
        strokeDasharray={`${((INITIAL_ANGLE + 90) / 360).toFixed(4)} 1`}
      />
      {STEP_ANGLES.map((a, i) => {
        const pt = ringPoint(a)
        return (
          <rect
            key={`m${i}`}
            ref={(el) => (markerRefs.current[i] = el)}
            x="-3" y="-3" width="6" height="6"
            transform={`translate(${pt.x} ${pt.y}) rotate(${a})`}
            fill={INITIAL_ANGLE >= a - 0.01 ? BLUE : WHITE}
          />
        )
      })}
      <circle ref={dotRef} cx={dot0.x.toFixed(2)} cy={dot0.y.toFixed(2)} r="16" fill={BLUE} stroke={RING} strokeWidth=".5" />
    </svg>
  )
})

export default LoopGlobe
