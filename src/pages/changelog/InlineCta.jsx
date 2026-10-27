import '../../styles/changelog/grid.css'
import '../../styles/changelog/inline-cta.css'

// specs/content-shared.md §4.6, dark variant (changelog-index, before the plain footer).
export default function InlineCta() {
  return (
    <section className="cl-grid">
      <div className="cl-cta">
        <div className="cl-cta__spacer-top" />
        <h2 className="cl-cta__title">Turn customer feedback into product{' '}innovation</h2>
        <div className="cl-cta__buttons">
          <a className="cl-cta__btn cl-cta__btn--white" href="/contact-sales/">Contact sales</a>
          <a className="cl-cta__btn cl-cta__btn--glass" href="/auth/signup/" target="_blank" rel="noopener noreferrer">
            Try Dovetail free
          </a>
        </div>
        <div className="cl-cta__spacer-bottom" />
      </div>
    </section>
  )
}
