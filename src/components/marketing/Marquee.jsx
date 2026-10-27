import '../../styles/marketing/marquee.css'

// Marquee (marketing-shared.md §7.5, `e1u7fodh*`). `data` = { direction?: 'ltr' | 'rtl' (default 'rtl'),
// removeShadow?: boolean, duration?: seconds (default 60) }. Children are the items; they're rendered
// twice, the second copy aria-hidden + inert.
// Motion (GSAP x loop over one copy width, 60s linear, pause on focusin) is left for the animation pass;
// the track exposes data-direction / data-duration for it.
export default function Marquee({ data = {}, children, className = '' }) {
  const direction = data.direction === 'ltr' ? 'ltr' : 'rtl'
  return (
    <div className={`mk-marquee${data.removeShadow ? '' : ' mk-marquee--shadow'} ${className}`}>
      <div className="mk-marquee__track" data-direction={direction} data-duration={data.duration ?? 60}>
        <div className="mk-marquee__group">{children}</div>
        <div className="mk-marquee__group" aria-hidden="true" inert="">{children}</div>
      </div>
    </div>
  )
}
