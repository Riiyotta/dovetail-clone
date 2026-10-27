// Inline SVGs. Arrow/chevron paths are from specs/content-assets.md
// (stroke 2, square caps, currentColor, 24x24 viewBox). The share glyphs and the
// row arrow are not given in the specs; see handoff notes.

const strokeProps = {
  fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'square', viewBox: '0 0 24 24',
  'aria-hidden': true, focusable: 'false',
}

export const BackArrow = ({ size = 24, className }) => (
  <svg {...strokeProps} width={size} height={size} className={className}>
    <path d="M8 12h9" />
    <path d="m12 17-5-5 5-5" />
  </svg>
)

export const NextArrow = ({ size = 24, className }) => (
  <svg {...strokeProps} width={size} height={size} className={className}>
    <path d="M6 12h10z" />
    <path d="m12 7 5 5-5 5" />
  </svg>
)

export const Chevron = ({ size = 16, className }) => (
  <svg {...strokeProps} width={size} height={size} className={className}>
    <path d="m16 10-4 4-4-4" />
  </svg>
)

// Row hover arrow ("↘-style"). Spec gives no path: the next-arrow geometry rotated 45deg.
export const RowArrow = ({ className }) => (
  <svg {...strokeProps} width={24} height={24} className={className}>
    <g transform="rotate(45 12 12)">
      <path d="M6 12h10z" />
      <path d="m12 7 5 5-5 5" />
    </g>
  </svg>
)

const fillProps = { viewBox: '0 0 14 14', width: 14, height: 14, fill: 'currentColor', 'aria-hidden': true, focusable: 'false' }

export const LinkIcon = () => (
  <svg {...fillProps} fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M5.8 8.2a2.6 2.6 0 0 0 3.7 0l2-2a2.6 2.6 0 0 0-3.7-3.7l-.9.9" />
    <path d="M8.2 5.8a2.6 2.6 0 0 0-3.7 0l-2 2a2.6 2.6 0 0 0 3.7 3.7l.9-.9" />
  </svg>
)

export const FacebookIcon = () => (
  <svg {...fillProps}>
    <path d="M8 14V7.6h2.1l.3-2.4H8V3.7c0-.7.2-1.2 1.2-1.2h1.3V.4A17 17 0 0 0 8.6.3C6.8.3 5.5 1.4 5.5 3.5v1.7H3.4v2.4h2.1V14H8Z" />
  </svg>
)

export const LinkedInIcon = () => (
  <svg {...fillProps}>
    <path d="M3.1 4.7H.4V14h2.7V4.7ZM1.8.3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM14 8.7c0-2.5-.5-4.3-3.4-4.3-1.4 0-2.3.8-2.7 1.5V4.7H5.3V14H8V9.4c0-1.2.2-2.4 1.8-2.4 1.5 0 1.5 1.4 1.5 2.5V14H14V8.7Z" />
  </svg>
)

export const XIcon = () => (
  <svg {...fillProps}>
    <path d="M8.3 5.9 13.4 0h-1.2L7.8 5.1 4.2 0H0l5.4 7.8L0 14h1.2l4.7-5.4 3.8 5.4H14L8.3 5.9Zm-1.7 1.9-.5-.8L1.7.9h1.9l3.5 5 .5.8 4.6 6.4h-1.9L6.6 7.8Z" />
  </svg>
)
