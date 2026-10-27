import '../styles/guides/primitives.css'
import '../styles/Footer.css'

// content-shared.md §4.6 — "Turn customer feedback into product innovation".
// Rendered by Footer for the `plain` footer variant (guide-article, hub, changelog-index).
export default function InlineCta({ theme = 'dark' }) {
  const light = theme === 'light'
  return (
    <section className={`cgrid inline-cta${light ? ' inline-cta--light' : ''}`}>
      <div className="c-span-9 c-keep">
        <div className="csp inline-cta__sp-top" />
        <h2 className="inline-cta__h2">Turn customer feedback into product{' '}innovation</h2>
        <div className="cbtn-row inline-cta__ctas">
          <a href="/contact-sales/" className={`cbtn ${light ? 'cbtn--ink' : 'cbtn--white'}`}>Contact sales</a>
          <a href="/auth/signup/" target="_blank" rel="noreferrer" className={`cbtn ${light ? 'cbtn--soft' : 'cbtn--glass'}`}>
            Try Dovetail free
          </a>
        </div>
        <div className="csp inline-cta__sp-bottom" />
      </div>
    </section>
  )
}
