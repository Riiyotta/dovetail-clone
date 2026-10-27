import '../../styles/marketing/grid-image-bg.css'

// GridImageBackground (marketing-shared.md §7.7). `data` = the background image content item
// ({"role":"img","src","w","h","alt"}, el `e1ms7w8v3`). The content box is the image's height (sm: auto).
// hideImageAtSm: product quotes hide the image layer at ≤799 (product.md §8).
export default function GridImageBackground({ data, children, hideImageAtSm = false, className = '' }) {
  const w = data?.w || 0
  const h = data?.h || 0
  return (
    <div className={`mk-gridbg ${className}`} style={{ '--gb-w': `${w}px`, '--gb-h': `${h}px` }}>
      {data?.src && (
        <div className={`mk-gridbg__layer${hideImageAtSm ? ' mk-gridbg__layer--hide-sm' : ''}`} aria-hidden="true">
          <img className="mk-gridbg__img" src={data.src} alt="" width={w || undefined} height={h || undefined} />
        </div>
      )}
      <div className="mk-gridbg__content">{children}</div>
    </div>
  )
}
