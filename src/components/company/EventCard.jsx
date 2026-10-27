import { Link } from 'react-router-dom'
import '../../styles/company/base.css'
import '../../styles/company/components.css'

// EventCard (company-shared.md S3). Events/webinars upcoming grid and "More events".
// Props: { href, image, alt?, title, meta: string[] } — meta lines are rendered as given, e.g.
//   ['[When] 19 Nov 2026', '[Where] Online'] (format the date with formatEventDate from ./dates.js, S14).
// Meta colour is not stated in S3; uses w64 #A7A7A7 ("mono meta" per S0.1).
export default function EventCard({ href, image, alt = '', title, meta = [] }) {
  const external = /^https?:/.test(href || '')
  const inner = (
    <>
      {image && <img className="co-event__img" src={image} alt={alt} loading="lazy" />}
      <h3 className="co-event__title co-h20">{title}</h3>
      {meta.map((m, i) => <p key={i} className="co-event__meta co-m14" style={{ margin: 0 }}>{m}</p>)}
    </>
  )
  return external
    ? <a className="co-event" href={href} target="_blank" rel="noreferrer">{inner}</a>
    : <Link className="co-event" to={href}>{inner}</Link>
}
