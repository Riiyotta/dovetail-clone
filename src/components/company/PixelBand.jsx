import PixelTransitionSlice from '../marketing/PixelTransitionSlice.jsx'

// PixelBand — pixel transition band (company-shared.md S10). Thin wrapper over the marketing
// PixelTransitionSlice, which implements S10 exactly (48px squares, 3 rows over 120px, staircase
// m(r,c) = ((rows-1-r)*3 + .5c)*.1 + order*.01, ScrollTrigger scrub top bottom+=240 → bottom top-=240,
// ≥1281 only, hidden ≤1280).
// Props:
//   position  'top'    (pixelateTop: margin-top -120, transparent → #0A0A0A, band above the children)
//           | 'bottom' (pixelateBottom: margin-bottom -120, #0A0A0A → transparent, band below the children)
//   children  the #0A0A0A content block (e.g. a spacer). Omit for a bare band.
export default function PixelBand({ position = 'top', children }) {
  return <PixelTransitionSlice position={position}>{children}</PixelTransitionSlice>
}
