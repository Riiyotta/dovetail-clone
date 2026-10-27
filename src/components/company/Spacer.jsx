import '../../styles/company/base.css'

// Spacer (company-shared.md S0.3). Props: { size } — one of the named sizes below
// (heights >1280 / ≤1280 / ≤799). S200 / S200-fixed become 160 when last child of a `.co-main` at ≥1281.
const SIZES = {
  hero: [96, 56, 56],
  s200: [200, 96, 96],
  's200-fixed': [200, 200, 200],
  s160: [160, 96, 96],
  's160-0': [160, 0, 0],
  s120: [120, 96, 96],
  's120-64': [120, 64, 64],
  s96: [96, 64, 64],
  's96-32': [96, 32, 32],
  s80: [80, 80, 80],
  s64: [64, 64, 64],
  's64-48': [64, 48, 48],
  s48: [48, 48, 48],
  's48-32': [48, 32, 32],
  s40: [40, 40, 40],
  's40-32': [40, 32, 32],
  s32: [32, 32, 32],
  's32-24': [32, 24, 24],
  's32-8': [32, 8, 8],
  's24-16': [24, 16, 16],
  s246: [246, 246, 246],
  header: [88, 88, 88],
  's0-96': [0, 96, 96],
  's160-160-96': [160, 160, 96],
  's100-64': [100, 100, 64],
}

export default function Spacer({ size = 's200' }) {
  const [d, md, sm] = SIZES[size] || SIZES.s200
  return (
    <div
      aria-hidden="true"
      className={`co-sp co-sp--${size}`}
      style={{ '--sp-d': `${d}px`, '--sp-md': `${md}px`, '--sp-sm': `${sm}px` }}
    />
  )
}
