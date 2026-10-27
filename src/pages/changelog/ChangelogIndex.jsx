import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { usePageChrome } from '../../chrome.jsx'
import { entries, categories, years, pageTitle, categoryBySlug, entryYear } from './data.js'
import { Chevron, RowArrow } from './icons.jsx'
import InlineCta from './InlineCta.jsx'
import '../../styles/changelog/grid.css'
import '../../styles/changelog/changelog-index.css'

// specs/changelog-index.md

const ALL_YEARS = years[0] // "All years"
const DESKTOP = '(min-width: 1281px)' // preview is display:none at <=1280

function YearDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const rootRef = useRef(null)
  const listRef = useRef(null)
  const selectedIndex = Math.max(0, years.indexOf(value))

  useEffect(() => {
    if (!open) return
    listRef.current?.focus()
    const onDown = (e) => { if (!rootRef.current?.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  const toggle = () => {
    setActive(selectedIndex)
    setOpen((o) => !o)
  }
  const choose = (i) => {
    onChange(years[i])
    setOpen(false)
  }
  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((i) => Math.min(years.length - 1, i + 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((i) => Math.max(0, i - 1)) }
    else if (e.key === 'Home') { e.preventDefault(); setActive(0) }
    else if (e.key === 'End') { e.preventDefault(); setActive(years.length - 1) }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (active >= 0) choose(active) }
    else if (e.key === 'Escape' || e.key === 'Tab') setOpen(false)
  }

  return (
    <div className="cl-year" ref={rootRef}>
      <button
        type="button"
        className="cl-year__btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="cl-year-listbox"
        onClick={toggle}
      >
        {value === ALL_YEARS ? 'Year' : value}
        <Chevron className="cl-year__chevron" />
      </button>
      {open && (
        <ul
          id="cl-year-listbox"
          ref={listRef}
          role="listbox"
          tabIndex={-1}
          aria-label="Year"
          aria-activedescendant={active >= 0 ? `cl-year-opt-${active}` : undefined}
          className="cl-year__list"
          onKeyDown={onKeyDown}
          onMouseLeave={() => setActive(-1)}
        >
          {years.map((y, i) => (
            <li
              key={y}
              id={`cl-year-opt-${i}`}
              role="option"
              aria-selected={i === selectedIndex}
              data-active={i === active || undefined}
              className="cl-year__opt"
              onMouseEnter={() => setActive(i)}
              onClick={() => choose(i)}
            >
              {y}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function Row({ entry, onEnter, onLeave }) {
  return (
    <div>
      <Link
        to={entry.path}
        className="cl-row"
        onMouseEnter={(e) => onEnter(entry, e)}
        onMouseLeave={onLeave}
      >
        <div className="cl-row__grid">
          <div className="cl-row__date-cell">
            <p className="cl-row__meta">
              <RowArrow className="cl-row__arrow" />
              <span className="cl-row__datetime">
                <span className="cl-row__date">{entry.date}</span>
                <span className="cl-row__time">{entry.time}</span>
              </span>
            </p>
          </div>
          <div className="cl-row__title-cell">
            <h2 className="cl-row__title">{entry.title}</h2>
          </div>
        </div>
      </Link>
      <hr className="cl-rule" />
    </div>
  )
}

// Cursor-follow preview (>1280 only). Position is applied immediately on every mousemove,
// equivalent to gsap.set — see handoff notes for the unmeasured easing / fade-out.
function usePreview() {
  const boxRef = useRef(null)
  const [hovered, setHovered] = useState(null)

  const place = (x, y) => {
    if (boxRef.current) boxRef.current.style.transform = `translate(${x - 20}px, ${y - 80}px)`
  }

  useEffect(() => {
    if (!hovered) return
    const onMove = (e) => place(e.clientX, e.clientY)
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [hovered])

  const onEnter = (entry, e) => {
    if (!window.matchMedia(DESKTOP).matches) return
    place(e.clientX, e.clientY)
    setHovered(entry)
  }
  const onLeave = () => setHovered(null)
  const src = hovered && (hovered.previewImage || hovered.previewImageRemote)

  const preview = (
    <div
      ref={boxRef}
      className="cl-preview"
      aria-hidden="true"
      style={hovered ? { opacity: 1, visibility: 'inherit' } : undefined}
    >
      {src && (
        <span className="cl-preview__frame">
          <img className="cl-preview__img" src={src} alt="" loading="lazy" />
        </span>
      )}
    </div>
  )
  return { preview, onEnter, onLeave }
}

export default function ChangelogIndex({ category: categorySlug }) {
  usePageChrome({ footer: 'default', navSpacer: false })

  const category = categorySlug ? categoryBySlug(categorySlug) : null
  const [year, setYear] = useState(ALL_YEARS)
  const { preview, onEnter, onLeave } = usePreview()

  useEffect(() => {
    document.title = category ? `${category.label} | Dovetail changelog` : pageTitle
  }, [category])

  const activePath = category ? category.path : '/changelog/'
  const list = entries.filter(
    (e) =>
      (!category || e.categories.includes(category.label)) &&
      (year === ALL_YEARS || entryYear(e) === year),
  )

  return (
    <main className="cl-index">
      <div className="cl-hero">
        <div className="cl-hero__fade" />
        <section className="container">
          <h1 className="cl-hero__title">Changelog</h1>
          <div style={{ height: 64 }} />
          <div className="cl-filters">
            <nav className="cl-filters__nav" aria-label="Changelog categories">
              <ul className="cl-pills">
                {categories.map((c) => (
                  <li key={c.path}>
                    <Link
                      to={c.path}
                      className="cl-pill"
                      aria-current={c.path === activePath ? 'page' : undefined}
                    >
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <YearDropdown value={year} onChange={setYear} />
          </div>
        </section>
      </div>

      <div style={{ height: 32 }} />

      <section className="cl-grid">
        <div className="cl-cell-full">
          {preview}
          <hr className="cl-rule" />
          {list.map((entry) => (
            <Row key={entry.path} entry={entry} onEnter={onEnter} onLeave={onLeave} />
          ))}
        </div>
      </section>

      <div style={{ height: 120 }} />

      <InlineCta />
    </main>
  )
}
