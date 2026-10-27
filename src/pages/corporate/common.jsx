import { useEffect } from 'react'
import { CtaRow, textOf } from '../../components/marketing/content.jsx'
import '../../styles/marketing/base.css'
import '../../styles/corporate/common.css'

// Shared bits for the corporate pages (pricing, enterprise, enterprise articles, deploy, menu).

export function useDocTitle(title) {
  useEffect(() => { if (title) document.title = title }, [title])
}

// Section lookups in a data file's `sections` array.
export const sectionsOf = (d, slice) => d.sections.filter((s) => s.slice === slice)
export const findIn = (content, pred) => (content || []).find(pred)
export const allIn = (content, pred) => (content || []).filter(pred)

// Eyebrow (etfyu4r0): M14 #A7A7A7
export function Eyebrow({ children, className = '' }) {
  return <p className={`co-m14 text-text-dim ${className}`}>{children}</p>
}

// BaseHeading (e18o1u1v*): eyebrow (mb 32) → heading → P20 (margin 32px 0) → buttons (margin-top 32, gap 8).
// `size` picks the heading preset; `maxW` / `subMaxW` are the per-instance max-widths from the specs.
export function BaseHeading({ eyebrow, as: Tag = 'h2', size = 'h64', heading, sub, subSeed = 0, maxW, subMaxW, subFlush, links, children }) {
  return (
    <div className="co-heading">
      {eyebrow && <Eyebrow className="co-heading__eyebrow">{eyebrow}</Eyebrow>}
      <Tag className={`co-${size} co-heading__title`} style={maxW ? { maxWidth: maxW } : undefined}>{heading}</Tag>
      {sub && (
        <p className={`co-p20 co-heading__sub${subFlush ? ' co-heading__sub--flush' : ''}`} style={subMaxW ? { maxWidth: subMaxW } : undefined}>
          {textOf(sub, subSeed)}
        </p>
      )}
      {links?.length > 0 && <CtaRow links={links} className="co-heading__ctas" />}
      {children}
    </div>
  )
}

// SectionImageBackgroundContainer (e1jvfgez*): full-width decorative image pinned to the top, hidden ≤799.
export function SectionBg({ src, className = '', innerClassName = '', children }) {
  return (
    <div className={`co-sbg ${className}`}>
      {src && <img className="co-sbg__img" src={src} alt="" loading="lazy" />}
      <div className={`co-sbg__inner ${innerClassName}`}>{children}</div>
    </div>
  )
}

// GradientBanner (e1afr2p80): decorative #0A0A0A fade. `dir` is the CSS gradient angle.
export function GradientBanner({ className = '', style }) {
  return <div aria-hidden="true" className={`co-gbanner ${className}`} style={style} />
}

// SecurityAndCompliance (enterprise.md §5; reused by deploy.md §0.7): 6 cells in a framed flex row.
// The SOC 2 cell's copy links the word "report" to the trust centre.
const TRUST_URL = 'https://trust.dovetail.com/'
export function SecurityGrid({ section }) {
  const c = section.content
  const bg = findIn(c, (x) => x.role === 'img')
  const cells = []
  c.forEach((x, i) => {
    if (x.role === 'svg') cells.push({ svg: x.src, h3: c[i + 1]?.text, p: c[i + 2]?.text })
  })
  return (
    <SectionBg src={bg?.src} className="co-security" innerClassName="co-security__inner">
      <div className="mk-slicegrid co-rowgap-0">
        <div className="co-col-full">
          <div className="co-security__frame">
            {cells.map((cell, i) => (
              <div key={cell.h3} className={`co-security__cell co-security__cell--${i + 1}`}>
                <div className="co-security__art"><img src={cell.svg} alt="" /></div>
                <div>
                  <h3 className="co-security__title">{cell.h3}</h3>
                  <p className="co-p16 text-text-dim">{renderSoc(cell.p)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionBg>
  )
}

function renderSoc(text) {
  const key = 'Our report '
  if (!text?.startsWith(key)) return text
  return (
    <>
      Our <a className="co-inline-link" href={TRUST_URL} target="_blank" rel="noreferrer">report</a>{' '}
      {text.slice(key.length)}
    </>
  )
}
