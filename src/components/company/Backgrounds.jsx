import '../../styles/company/components.css'

// Background patterns (company-shared.md S12). All static.
//   <DotBackground className style />    16px radial dot grid (events / webinars hero)
//   <GridBackground className style />   48px line grid (careers / b2bsaasy hero)
//   <GradientBanner side size color />   absolute edge fade: side 'top'(0deg) | 'bottom'(180deg) | 'left'(270deg) | 'right'(90deg),
//                                        size px (default 200), color the solid end (default #0A0A0A via CSS var)
//   Dot tile (customers ratings band): add className "co-dottile" to a positioned wrapper.
export function DotBackground({ className = '', style }) {
  return <div aria-hidden="true" className={`co-dot-bg ${className}`.trim()} style={style} />
}

export function GridBackground({ className = '', style }) {
  return <div aria-hidden="true" className={`co-grid-bg ${className}`.trim()} style={style} />
}

const DEG = { top: 0, bottom: 180, left: 270, right: 90 }

export function GradientBanner({ side = 'top', size = 200, color = 'var(--co-gradient-color)' }) {
  return (
    <div
      aria-hidden="true"
      className={`co-gradient co-gradient--${side}`}
      style={{ '--co-g-size': `${size}px`, background: `linear-gradient(${DEG[side]}deg, rgba(0,0,0,0) 0%, ${color} 100%)` }}
    />
  )
}
