import { useLayoutEffect } from 'react'

// Helpers shared by the two campaign pages (/launch/suns-out/, /the-best-never-guess/).

// Both pages paint the whole document blue (#0044FF): launch.md intro, best-never-guess.md §0.
// The flag lives on <html> so html/body backgrounds can switch; see src/styles/campaigns/base.css.
export function useBluePage() {
  useLayoutEffect(() => {
    const html = document.documentElement
    html.dataset.campaign = 'blue'
    return () => { delete html.dataset.campaign }
  }, [])
}

// Neutral placeholder copy for fields recorded as { placeholder: true, chars: N } (marketing-shared.md §1).
// Original wording is intentionally not reproduced; this returns ~N characters ending in a full stop.
const FILLER =
  'This placeholder paragraph stands in for the final copy of this section. It describes the feature in plain, ' +
  'neutral terms so the layout can be reviewed at its real length. The finished wording will replace it before ' +
  'launch, keeping the same rhythm, tone and approximate size as the text shown here today. '

export function placeholder(chars) {
  let s = ''
  while (s.length < chars) s += FILLER
  s = s.slice(0, chars)
  const cut = s.lastIndexOf(' ', chars - 1)
  s = (cut > chars * 0.8 ? s.slice(0, cut) : s).replace(/[\s,.;:]+$/, '')
  return `${s}.`
}

// Inline SVG markup (imported with ?raw) so CSS can reach rect/path children
// (pixel blink keyframes, decoration path opacity rules).
export function InlineSvg({ markup, className, ...rest }) {
  return <span className={className} aria-hidden="true" dangerouslySetInnerHTML={{ __html: markup }} {...rest} />
}

// currentColor icon rendered as a CSS mask (same technique as .svg-icon in src/styles/shared.css).
export function MaskIcon({ src, className }) {
  return <span className={`svg-icon ${className || ''}`} style={{ '--icon': `url(${src})` }} aria-hidden="true" />
}
