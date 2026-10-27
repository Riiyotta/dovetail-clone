import Button from './Button.jsx'
import '../../styles/company/base.css'
import '../../styles/company/components.css'

// Form primitives (company-shared.md S13). All non-submitting in the rebuild; wire state in the page.
//   <FormBox onSubmit noValidate>…</FormBox>            boxed form: bg #1E1E1E, 1px rgba(255,255,255,.08), radius 8, pad 32 (≤1280 32/20), gap 24
//   <FormRow>…</FormRow>                                 side-by-side fields (gap 16; column ≤1280)
//   <Field label name type placeholder required error textarea hubspot value onChange inputRef />
//        label 16/24, required '*' 2px after; input 40 tall (textarea min 96, resize vertical);
//        error → aria-invalid + M14 #FF4400 line below. `hubspot` → 10/40/10/16 padding (HubSpot-styled forms).
//   <SubmitButton disabled>Register</SubmitButton>        full-width primary button
//   <FormMessage error>…</FormMessage>                   M14 success (#A7A7A7) / error (#FF4400) line
export function FormBox({ children, className = '', ...rest }) {
  return <form className={`co-form ${className}`.trim()} {...rest}>{children}</form>
}

export function FormRow({ children }) {
  return <div className="co-form__row">{children}</div>
}

export function Field({ label, name, type = 'text', placeholder, required = false, error, textarea = false, hubspot = false, inputRef, ...rest }) {
  const id = `co-f-${name || label}`.replace(/\s+/g, '-')
  const errId = `${id}-err`
  const common = {
    id,
    name: name || undefined,
    placeholder: placeholder || undefined,
    required,
    ref: inputRef,
    'aria-invalid': error ? 'true' : undefined,
    'aria-describedby': error ? errId : undefined,
    className: `co-input${hubspot ? ' co-input--hs' : ''}`,
    ...rest,
  }
  return (
    <div>
      <label className="co-field" htmlFor={id}>
        <span>{label}{required && <span className="co-field__req">*</span>}</span>
        {textarea ? <textarea {...common} /> : <input type={type} {...common} />}
      </label>
      {error && <p id={errId} className="co-field__error co-m14">{error}</p>}
    </div>
  )
}

export function SubmitButton({ children, disabled }) {
  return <Button type="submit" variant="primary" className="co-form__submit" disabled={disabled}>{children}</Button>
}

export function FormMessage({ children, error = false }) {
  return <p className={`co-form__msg co-m14${error ? ' co-form__msg--error' : ''}`} role={error ? 'alert' : 'status'}>{children}</p>
}
