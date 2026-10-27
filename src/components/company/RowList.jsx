import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
import '../../styles/company/base.css'
import '../../styles/company/components.css'

// RowList — RowButton rows (company-shared.md S4). Past events, careers job rows.
// Props: { rows: [{ href, small, title, external? }] } — `external` (or an http(s) href) opens in a new tab.
// Renders an <hr> before the first row and after every row.
export default function RowList({ rows = [] }) {
  return (
    <div className="co-rows">
      <hr className="co-hr" />
      {rows.map((r, i) => {
        const ext = r.external || /^https?:/.test(r.href || '')
        const body = (
          <span className="co-row__grid">
            <span className="co-row__small co-m14">
              <Icon src="/assets/company/svg/icon-row-arrow.svg" className="co-row__arrow" />
              {r.small}
            </span>
            <span className="co-row__title">{r.title}</span>
          </span>
        )
        return (
          <Fragment key={r.href || i}>
            {ext
              ? <a className="co-row" href={r.href} target="_blank" rel="noreferrer">{body}</a>
              : <Link className="co-row" to={r.href}>{body}</Link>}
            <hr className="co-hr" />
          </Fragment>
        )
      })}
    </div>
  )
}
