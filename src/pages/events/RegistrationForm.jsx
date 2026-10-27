import { useState } from 'react'
import { FormBox, FormRow, Field, SubmitButton } from '../../components/company/Form.jsx'

// Native event registration form (company-shared.md S13; event-detail.md §3). Static and non-submitting:
// submit only runs the client-side validation and shows the error states.
// Props: { form } — the `form` object from src/data/company/events/suns-out-digital-twins-deep-dive.json.

const REQUIRED = 'This field is required.'
const INVALID_EMAIL = 'Please enter a valid email address.'
const PERSONAL_EMAIL = 'Please use your work email'
// The spec gives the "personal domains" rule but not the list; these are the common webmail domains.
const PERSONAL_DOMAINS = ['gmail.com', 'googlemail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com', 'icloud.com', 'aol.com', 'proton.me', 'protonmail.com']

function validate(field, value) {
  const v = value.trim()
  if (field.required && !v) return REQUIRED
  if (field.type === 'email' && v) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return INVALID_EMAIL
    if (PERSONAL_DOMAINS.includes(v.split('@')[1].toLowerCase())) return PERSONAL_EMAIL
  }
  return null
}

export default function RegistrationForm({ form }) {
  const fields = (form?.fields || []).map((f, i) => ({ ...f, key: f.name || `field${i}` }))
  const [errors, setErrors] = useState({})

  const onSubmit = (e) => {
    e.preventDefault()
    const formEl = e.currentTarget
    const data = new FormData(formEl)
    const next = {}
    for (const f of fields) {
      const err = validate(f, String(data.get(f.key) ?? ''))
      if (err) next[f.key] = err
    }
    setErrors(next)
    const first = fields.find((f) => next[f.key])
    if (first) formEl.elements[first.key]?.focus()
  }

  const renderField = (f) => (
    <Field key={f.key} name={f.key} label={f.label} type={f.type} placeholder={f.placeholder}
      required={f.required} textarea={f.type === 'textarea'} error={errors[f.key]} />
  )

  const [first, last, ...rest] = fields
  return (
    <FormBox noValidate onSubmit={onSubmit}>
      <FormRow>{[first, last].filter(Boolean).map(renderField)}</FormRow>
      {rest.map(renderField)}
      <SubmitButton>{form?.submit || 'Register'}</SubmitButton>
    </FormBox>
  )
}
