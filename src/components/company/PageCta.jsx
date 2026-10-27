import Button from './Button.jsx'
import Spacer from './Spacer.jsx'
import '../../styles/company/base.css'
import '../../styles/company/components.css'

// PageCta — "Turn customer feedback into product innovation" (company-shared.md S6).
// Props:
//   heading    string (default the S6 text)
//   maxWidth   number, h2 max-width (712 default; b2bsaasy 924)
//   buttons    [{ label, href, variant }] (default Contact sales + Try Dovetail free; Forrester passes just the primary)
//   theme      'dark' | 'light' (guides: light button variants)
//   topSpacer  false when the page places the S200 spacer itself (Forrester)
const DEFAULT_BUTTONS = [
  { label: 'Contact sales', href: '/contact-sales/', variant: 'primary' },
  { label: 'Try Dovetail free', href: '/auth/signup/', variant: 'secondary' },
]
const LIGHT = { primary: 'light-primary', secondary: 'light-secondary' }

export default function PageCta({ heading = 'Turn customer feedback into product innovation', maxWidth = 712, buttons = DEFAULT_BUTTONS, theme = 'dark', topSpacer = true }) {
  return (
    <section className={`co-grid co-pagecta${theme === 'light' ? ' co-pagecta--light' : ''}`}>
      <div className="co-pagecta__col">
        {topSpacer && <Spacer size="s200" />}
        <h2 className="co-pagecta__h2 co-h64" style={{ maxWidth }}>{heading}</h2>
        <div className="co-pagecta__btns co-btn-row">
          {buttons.map((b) => (
            <Button key={b.label} href={b.href} variant={theme === 'light' ? (LIGHT[b.variant] || b.variant) : b.variant}>{b.label}</Button>
          ))}
        </div>
        <Spacer size="s120" />
      </div>
    </section>
  )
}
