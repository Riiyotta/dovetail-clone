import { Fragment } from 'react'
import { CtaRow, Lines, MaskIcon, SmartLink, textOf } from '../../components/marketing/content.jsx'

// ProductHero (product.md §1, `e10k4luw*`) + Channels video card (§1.1, `efrydo*`).
export default function ProductHero({ data }) {
  const c = data.content
  const left = c.find((x) => x.el === 'e10k4luw2')
  const right = c.find((x) => x.el === 'e10k4luw3')
  const iconSvg = c.find((x) => x.role === 'svg' && x.el === 'svg')
  const name = c.find((x) => x.el === 'e10k4luw7')
  const beta = c.find((x) => x.el === 'e10k4luw8')
  const h1 = c.find((x) => x.role === 'h1')
  const inlineIcon = c.find((x) => x.role === 'img' && x.el === 'e10k4luw12')
  const sub = c.find((x) => x.el === 'e10k4luw14')
  const ctas = c.filter((x) => x.role === 'link' && x.el === 'a')
  const card = c.find((x) => x.el === 'efrydo00')
  const cardVideo = c.find((x) => x.role === 'video')
  const cardPlay = c.find((x) => x.role === 'svg' && x.src.includes('e1uk7pdk15'))
  const intLabel = c.find((x) => x.el === 'e10k4luw18')
  const chips = c.filter((x) => x.role === 'img' && x.el === 'img')
  const plus = c.find((x) => x.el === 'e10k4luw21')
  const heroImg = c.find((x) => x.el === 'e10k4luw24')
  const heroMobile = c.find((x) => x.el === 'e10k4luw25')

  // Inline icon width = round(72*aspect) / round(54*aspect) / round(36*aspect) (product.md §1).
  const aspect = inlineIcon?.w && inlineIcon?.h ? inlineIcon.w / inlineIcon.h : 1
  const iconVars = {
    '--hero-icon-w': `${Math.round(72 * aspect)}px`,
    '--hero-icon-w-md': `${Math.round(54 * aspect)}px`,
    '--hero-icon-w-sm': `${Math.round(36 * aspect)}px`,
  }

  return (
    <div className="pd-hero">
      {left && <img className="pd-hero__shape pd-hero__shape--left" src={left.src} alt="" />}
      {right && <img className="pd-hero__shape pd-hero__shape--right" src={right.src} alt="" />}
      <div className="mk-slicegrid pd-hero__grid">
        <div className="pd-hero__col">
          <div className="pd-hero__row">
            <div className="pd-hero__left">
              <div className="pd-eyebrow">
                {iconSvg && <MaskIcon src={iconSvg.src} className="pd-eyebrow__icon" />}
                {name && <p className="pd-eyebrow__name">{name.text}</p>}
                {beta && <span className="pd-eyebrow__beta">{beta.text}</span>}
              </div>
              <h1 className="pd-hero__h1" style={iconVars}>
                <HeadingParts parts={h1?.parts} fallback={h1?.text} />
              </h1>
              <p className="pd-hero__sub">{textOf(sub, 1)}</p>
              <CtaRow links={ctas} className="pd-hero__ctas" />
            </div>
            <div className={`pd-hero__right${card ? '' : ' pd-hero__right--no-card'}`}>
              {card && <VideoCard text={card.text} label={card.ariaLabel} video={cardVideo} play={cardPlay} />}
              {intLabel && (
                <div className="pd-int">
                  <p className="pd-int__label">{intLabel.text}</p>
                  <div className="pd-int__chips">
                    {chips.map((ch, i) => (
                      // Gap: per-integration docs URLs aren't recorded; every chip uses the "+" link's href.
                      <SmartLink key={i} href={plus?.href} className="pd-int__chip" aria-label={ch.alt}>
                        <img src={ch.src} alt="" width={24} height={24} />
                      </SmartLink>
                    ))}
                    {plus && (
                      <SmartLink href={plus.href} className="pd-int__chip" aria-label={plus.ariaLabel}>
                        <span className="pd-int__plus">{plus.text}</span>
                      </SmartLink>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="pd-hero__imgcol">
          {heroImg && <img className="pd-hero__img" src={heroImg.src} alt={heroImg.alt || ''} />}
          {heroMobile && <img className="pd-hero__img-mobile" src={heroMobile.src} alt={heroMobile.alt || ''} />}
        </div>
      </div>
    </div>
  )
}

// h1 parts: Inter spans, PP Mondwest spans and the inline icon. "\n" in a part = hard <br>.
function HeadingParts({ parts, fallback }) {
  if (!parts?.length) return <span className="pd-hero__inter"><Lines text={fallback} /></span>
  return parts.map((p, i) => {
    const prev = parts[i - 1]
    // A space between adjacent text parts; the icon's own 12/8/6px margins separate it from its neighbours.
    const space = i > 0 && !p.img && !prev?.img ? ' ' : ''
    if (p.img) {
      return (
        <span key={i} className="pd-hero__icon-wrap">
          <img className="pd-hero__icon" src={p.img} alt="" />
        </span>
      )
    }
    return (
      <Fragment key={i}>
        {space}
        <span className={p.font === 'PP Mondwest' ? 'pd-hero__serif' : 'pd-hero__inter'}><Lines text={p.text} /></span>
      </Fragment>
    )
  })
}

// Channels-only video card (§1.1). Gap: the YouTube id for this card isn't recorded, so click does nothing.
function VideoCard({ text, label, video, play }) {
  const [title, more] = text.split(/ (?=See what)/)
  return (
    <button type="button" className="pd-vcard" aria-label={label}>
      <div className="pd-vcard__thumb">
        {video && <video src={video.src} poster={video.poster || undefined} autoPlay loop muted playsInline preload="none" />}
        <span className="pd-vcard__play">{play && <MaskIcon src={play.src} className="pd-vcard__play-icon" />}</span>
      </div>
      <div className="pd-vcard__text">
        <p className="pd-vcard__title">{title}</p>
        {more && <p className="pd-vcard__more">{more}</p>}
      </div>
    </button>
  )
}
