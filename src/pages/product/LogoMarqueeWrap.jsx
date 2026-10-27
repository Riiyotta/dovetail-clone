import { MaskIcon, SmartLink } from '../../components/marketing/content.jsx'

const FULL_STAR = 'e1oz23xw0-239480'

// LogoMarqueeWrap + ProductLogoMarqueeSlice (product.md §2, `e1jzkpz9*`), DT ratings row (`eoxsi443`).
// Motion (CSS translateX(0 → -50%) 60s linear infinite) is left for the animation pass.
export default function LogoMarqueeWrap({ data }) {
  const c = data.content
  const label = c.find((x) => x.el === 'e1jzkpz90')
  const logos = c.filter((x) => x.role === 'svg' && x.ariaLabel)
  const ratings = []
  c.forEach((x) => {
    if (x.role === 'link' && x.el?.includes('e1oz23xw2')) ratings.push({ ...x, stars: [] })
    else if (x.role === 'svg' && !x.ariaLabel && ratings.length) ratings[ratings.length - 1].stars.push(x.src)
  })

  return (
    <div className="pd-logos">
      {ratings.length > 0 && (
        <div className="pd-ratings">
          {ratings.map((r, i) => (
            <SmartLink key={i} href={r.href} className="pd-rating">
              <div className="pd-rating__stars">
                {r.stars.map((s, j) => (s.includes(FULL_STAR)
                  ? <MaskIcon key={j} src={s} className="pd-rating__star" />
                  : <img key={j} src={s} alt="" className="pd-rating__star" width={16} height={16} />))}
              </div>
              <p className="pd-rating__label">{r.text}</p>
            </SmartLink>
          ))}
        </div>
      )}
      {label && <p className="pd-logos__label">{label.text}</p>}
      <div className="pd-logos__track">
        <div className="pd-logos__row" data-marquee="css-60s">
          {[0, 1].map((copy) => logos.map((l, i) => (
            <div key={`${copy}-${i}`} className="pd-logos__item" aria-hidden={copy === 1 ? 'true' : undefined}>
              <img className="pd-logos__img" src={l.src} alt={copy === 0 ? l.ariaLabel : ''} />
            </div>
          )))}
        </div>
      </div>
    </div>
  )
}
