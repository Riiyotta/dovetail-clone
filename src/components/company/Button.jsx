import { Link } from 'react-router-dom'
import '../../styles/company/base.css'

// Button (company-shared.md S0.5). Props:
//   href?      — renders <Link> for internal paths, <a target=_blank> for http(s) URLs, <button> otherwise
//   variant    — 'primary' | 'secondary' | 'secondary-blue' | 'light-primary' | 'light-secondary'
//   type, onClick, disabled, className, children
export default function Button({ href, variant = 'primary', children, className = '', type = 'button', ...rest }) {
  const cls = `co-btn co-btn--${variant} ${className}`.trim()
  if (href && /^https?:/.test(href)) {
    return <a className={cls} href={href} target="_blank" rel="noreferrer" {...rest}>{children}</a>
  }
  if (href) return <Link className={cls} to={href} {...rest}>{children}</Link>
  return <button className={cls} type={type} {...rest}>{children}</button>
}
