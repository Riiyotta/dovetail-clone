import { useLocation } from 'react-router-dom'

// Temporary placeholder for routes whose template isn't built yet.
export default function NotBuilt() {
  const { pathname } = useLocation()
  return (
    <main className="container py-[160px] text-text-muted">
      <p className="mono-12 mb-4">Template in progress</p>
      <p>{pathname}</p>
    </main>
  )
}
