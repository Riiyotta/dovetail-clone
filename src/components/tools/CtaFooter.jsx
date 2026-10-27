import { CtaButtons, Spacer } from './ui.jsx'

// specs/tools-shared.md §H. data: { h2, ctas }.
export default function CtaFooter({ data }) {
  return (
    <>
      <Spacer d={200} md={96} sm={96} />
      <section className="t-grid">
        <div className="t-ctaf__col">
          <h2 className="t-h64 t-ctaf__h">{data.h2}</h2>
          <CtaButtons ctas={data.ctas} />
        </div>
      </section>
      <Spacer d={120} md={96} sm={96} />
    </>
  )
}
