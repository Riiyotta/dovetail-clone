import { CtaRow, Lines, textOf } from '../../components/marketing/content.jsx'

// VoiceMode (product.md §11, `e13rmnxw*`, DT only).
// Gap: the mono tag `.e13rmnxw3` above the heading has no recorded text, so it isn't rendered.
export default function VoiceMode({ data }) {
  const c = data.content
  const h2 = c.find((x) => x.el === 'e13rmnxw4')
  const p = c.find((x) => x.el === 'e13rmnxw6')
  const ctas = c.filter((x) => x.role === 'link')
  const img = c.find((x) => x.el === 'e13rmnxw5')
  return (
    <section className="pd-voice">
      <div className="mk-container">
        <div className="pd-voice__col">
          <div className="pd-voice__text">
            <h2 className="pd-voice__h2"><Lines text={h2?.text} /></h2>
            <p className="pd-voice__p">{textOf(p, 6)}</p>
            <CtaRow links={ctas} />
          </div>
          {img && <img className="pd-voice__img" src={img.src} alt={img.alt || ''} width={img.w} height={img.h} />}
        </div>
      </div>
    </section>
  )
}
