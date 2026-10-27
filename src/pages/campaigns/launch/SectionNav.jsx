import { useEffect, useState } from 'react'
import { section, pick } from './data.js'

// launch.md §1 — fixed section nav with scroll-spy.
//   visible = #launch-shipped.bottom ≤ 0 && #launch-protected.bottom > 0
//   active  = last of TARGETS whose top ≤ 120px
//   click   → scrollTo({ top: el.top + scrollY - 160, behavior: 'smooth' })
const TARGETS = ['launch-agents', 'launch-channels', 'launch-ecosystem', 'launch-enterprise']

export default function SectionNav() {
  const sec = section('LaunchSectionNav')
  const labels = pick(sec, 'enicust2')
  const icons = pick(sec, 'enicust3')
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState(0)

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const shipped = document.getElementById('launch-shipped')
      const protectedEl = document.getElementById('launch-protected')
      if (!shipped || !protectedEl) return
      setVisible(shipped.getBoundingClientRect().bottom <= 0 && protectedEl.getBoundingClientRect().bottom > 0)
      let idx = 0
      TARGETS.forEach((id, i) => {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 120) idx = i
      })
      setActive(idx)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const go = (id) => {
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 160, behavior: 'smooth' })
  }

  return (
    <nav className="lx-secnav" data-visible={visible} aria-label="Launch sections" aria-hidden={!visible}>
      <div className="lx-secnav__inner">
        {labels.map((l, i) => (
          <button
            key={l.text}
            type="button"
            className="lx-secnav__btn"
            data-active={i === active}
            tabIndex={visible ? 0 : -1}
            onClick={() => go(TARGETS[i])}
          >
            <img className="lx-secnav__icon" src={icons[i].src} alt="" />
            <span className="lx-secnav__label">{l.text}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
