import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../../styles/marketing/pixel-transition.css'

gsap.registerPlugin(ScrollTrigger)

// PixelTransitionSlice (marketing-shared.md §7.2). `data` = a {"slice":"PixelBand"} entry.
//
// position: 'bottom' (Pixel▼, pixelateBottom, marginBottom:-120, band goes #0A0A0A → transparent)
//         | 'top'    (Pixel▲, pixelateTop, marginTop:-120, band goes transparent → #0A0A0A).
// Taken from the `position` prop, else `data.position`, else 'bottom'.
// With `children`, renders the full wrapper (.elyp12t1 > band + .elyp12t0 inner). Without children it
// renders the band alone with the same negative margin, so it can sit between sibling sections in data order.
export default function PixelTransitionSlice({ data, position, children, pixelSize = 48, sectionHeight = 120 }) {
  const pos = position || data?.position || 'bottom'
  const band = <PixelBand pos={pos} pixelSize={pixelSize} sectionHeight={sectionHeight} standalone={!children} />
  if (!children) return band
  return (
    <div className={`mk-pixel-wrap mk-pixel-wrap--${pos}`} style={{ '--px-h': `${sectionHeight}px` }}>
      {pos === 'top' && band}
      <div className="mk-pixel-wrap__inner">{children}</div>
      {pos === 'bottom' && band}
    </div>
  )
}

function shuffled(n) {
  const a = Array.from({ length: n }, (_, i) => i)
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function PixelBand({ pos, pixelSize, sectionHeight, standalone }) {
  const ref = useRef(null)
  const rows = Math.ceil(sectionHeight / pixelSize)
  const [layout, setLayout] = useState(() => {
    const cols = Math.ceil((typeof window === 'undefined' ? 1440 : window.innerWidth) / pixelSize)
    return { cols, shuffle: shuffled(rows * cols) }
  })

  // Re-generate columns + shuffle on resize (debounced 250ms).
  useEffect(() => {
    let t = 0
    const onResize = () => {
      clearTimeout(t)
      t = setTimeout(() => {
        const cols = Math.ceil(window.innerWidth / pixelSize)
        setLayout({ cols, shuffle: shuffled(rows * cols) })
      }, 250)
    }
    window.addEventListener('resize', onResize)
    return () => { clearTimeout(t); window.removeEventListener('resize', onResize) }
  }, [pixelSize, rows])

  const { cols, shuffle } = layout
  const n = rows * cols
  const time = (row, col) => ((rows - 1 - row) * 3 + 0.5 * col) * 0.1 + shuffle[row * cols + col] * 0.01

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const fill = getComputedStyle(el).getPropertyValue('--mk-pixel-fill').trim()
    const clear = 'transparent'
    const [from, to] = pos === 'bottom' ? [fill, clear] : [clear, fill]
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1281px)', () => {
      const cells = el.querySelectorAll('.mk-pixel-band__cell')
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: `top bottom+=${2 * sectionHeight}`,
          end: `bottom top-=${2 * sectionHeight}`,
          scrub: true,
        },
      })
      tl.set(cells, { backgroundColor: from }, 0)
      for (let r = 0; r < n; r++) {
        const row = Math.floor(r / cols)
        const col = (n - 1 - r) % cols
        tl.to(cells[r], { duration: 0, backgroundColor: to }, time(row, col))
      }
      return () => tl.scrollTrigger?.kill()
    })
    return () => mm.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pos, cols, shuffle, sectionHeight])

  // Static fallback before JS: a cell is filled if t(row,col) < ((rows-1)*.3 + (cols-1)*.05 + .09) / 2.
  const half = ((rows - 1) * 0.3 + (cols - 1) * 0.05 + 0.09) / 2

  return (
    <div
      ref={ref}
      className={`mk-pixel-band${standalone ? ` mk-pixel-band--standalone mk-pixel-band--${pos}` : ''}`}
      style={{ '--px-h': `${sectionHeight}px`, '--px-size': `${pixelSize}px` }}
      aria-hidden="true"
    >
      {Array.from({ length: rows }, (_, row) => (
        <div key={row} className="mk-pixel-band__row">
          {Array.from({ length: cols }, (_, col) => {
            const r = row * cols + col
            const tcol = (n - 1 - r) % cols
            return (
              <div key={col} className="mk-pixel-band__cell pixel" data-filled={time(row, tcol) < half ? 'true' : undefined} />
            )
          })}
        </div>
      ))}
    </div>
  )
}
