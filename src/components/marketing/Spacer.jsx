import '../../styles/marketing/base.css'

// Spacer (marketing-shared.md §2). `data` is a {"slice":"Spacer","height":{1440,1280,768,390}} entry.
export default function Spacer({ data }) {
  const h = data?.height || {}
  return (
    <div
      className="mk-spacer"
      aria-hidden="true"
      style={{ '--sp-d': `${h['1440'] ?? 200}px`, '--sp-md': `${h['1280'] ?? h['768'] ?? 96}px`, '--sp-sm': `${h['390'] ?? 96}px` }}
    />
  )
}
