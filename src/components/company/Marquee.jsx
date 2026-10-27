import '../../styles/company/components.css'

// Marquee — GSAP marquee structure (company-shared.md S11). Customers awards strip, Forrester logo rows.
// Props:
//   children     the items (each wrapped in .co-marquee__item, padding gap/2)
//   direction    'rtl' (moves left, default) | 'ltr'
//   gap          px between items >1280 (default 80 → 40 padding);  gapMobile ≤1280 (default 40 → 20)
//   bg           edge-fade colour (default #0A0A0A via CSS)
//   duration     seconds per full set (default 60)
// Two copies of the set are rendered (second aria-hidden + inert).
// MOTION NOT IMPLEMENTED HERE (left for the animation pass): gsap.to(track,{x:'-='+setWidth, duration, ease:'none',
// repeat:-1, modifiers:{x: wrap(-setWidth,0)}}); pause/resume via timeScale 1→0 (1s power2.out) / 0→1 (.5s power2.in);
// focus inside and reduced motion pause it. The track carries data-direction / data-duration for that pass.
export default function Marquee({ children, direction = 'rtl', gap = 80, gapMobile = 40, bg, duration = 60, className = '' }) {
  const items = Array.isArray(children) ? children : [children]
  const style = { '--co-marquee-pad': `${gap / 2}px`, '--co-marquee-pad-md': `${gapMobile / 2}px` }
  if (bg) style['--co-marquee-bg'] = bg
  const set = items.map((c, i) => <div key={i} className="co-marquee__item">{c}</div>)
  return (
    <div className={`co-marquee ${className}`.trim()} style={style}>
      <div className="co-marquee__track" data-direction={direction} data-duration={duration}>
        <div className="co-marquee__set">{set}</div>
        <div className="co-marquee__set" aria-hidden="true" inert="">{set}</div>
      </div>
    </div>
  )
}
