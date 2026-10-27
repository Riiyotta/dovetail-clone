import '../../styles/shared.css'

// Icon: a currentColor mask of an SVG file (uses the global `.svg-icon` from styles/shared.css).
// Props: { src, className, style } — size it with className/style (width/height).
export default function Icon({ src, className = '', style }) {
  return <span aria-hidden="true" className={`svg-icon ${className}`} style={{ '--icon': `url("${src}")`, ...style }} />
}
