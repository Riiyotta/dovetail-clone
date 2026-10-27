import { Lines, textOf } from '../../components/marketing/content.jsx'

// ProductStatementSlice (product.md §3, `e1ql6xhm*`).
export default function ProductStatement({ data }) {
  const h2 = data.content.find((x) => x.el === 'e1ql6xhm1')
  const p = data.content.find((x) => x.el === 'e1ql6xhm2')
  return (
    <section className="pd-statement">
      <div className="mk-container">
        <h2 className="pd-statement__h2"><Lines text={h2?.text} /></h2>
        <p className="pd-statement__p">{textOf(p, 3)}</p>
      </div>
    </section>
  )
}
