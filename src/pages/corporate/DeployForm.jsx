import { Fragment, useState } from 'react'
import { placeholder } from '../../components/marketing/placeholder.js'

// SalesforceForm (minimal), deploy.md §4 / §5. Static: nothing is sent anywhere. Submitting runs the
// required-field check and shows the recorded message under each empty field; valid input does nothing.
export default function DeployForm({ form }) {
  const [errors, setErrors] = useState({})
  const fields = form.fields.flatMap((f) => f.row || [f])

  const onSubmit = (e) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const next = {}
    fields.forEach((f) => { if (f.required && !String(fd.get(f.name) || '').trim()) next[f.name] = true })
    setErrors(next)
  }
  const clear = (name) => setErrors((er) => (er[name] ? { ...er, [name]: false } : er))

  const field = (f) => {
    const id = `deploy-${f.name}`
    const err = errors[f.name]
    const common = {
      id, name: f.name, 'aria-invalid': err ? 'true' : undefined, 'aria-describedby': err ? `${id}-err` : undefined,
      onChange: () => clear(f.name),
    }
    return (
      <div key={f.name} className="dp-field">
        <label htmlFor={id}>{f.label}{f.required && <span className="dp-req" aria-hidden="true">*</span>}</label>
        {f.type === 'select' && (
          <select {...common} defaultValue="">
            {f.options.map((o, i) => <option key={o} value={i === 0 ? '' : o}>{o}</option>)}
          </select>
        )}
        {f.type === 'textarea' && <textarea {...common} />}
        {f.type !== 'select' && f.type !== 'textarea' && <input {...common} type={f.type} placeholder={f.placeholder} />}
        {err && <p id={`${id}-err`} className="dp-error" role="alert">{form.errorRequired}</p>}
      </div>
    )
  }

  const [tos, privacy] = form.consent.links
  // Consent copy is a placeholder (~222 chars) with the two recorded links kept in place.
  const lead = placeholder(form.consent.chars - 46, 41)
  return (
    <div className="dp-form">
      <form noValidate onSubmit={onSubmit}>
        {form.fields.map((f, i) => (f.row
          ? <div key={i} className="dp-row">{f.row.map(field)}</div>
          : <Fragment key={i}>{field(f)}</Fragment>))}
        <div className="dp-consent">
          <p>
            {lead} See the{' '}
            <a href={tos.href} target="_blank" rel="noreferrer">{tos.label}</a> and{' '}
            <a href={privacy.href} target="_blank" rel="noreferrer">{privacy.label}</a>.
          </p>
        </div>
        <button type="submit" className="dp-submit">{form.submit}</button>
      </form>
    </div>
  )
}
