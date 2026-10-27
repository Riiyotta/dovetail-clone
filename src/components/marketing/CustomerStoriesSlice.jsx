import { useEffect, useRef, useState } from 'react'
import ProgressTabs from './ProgressTabs.jsx'
import useTabGroup from './useTabGroup.js'
import { MkButton, SmartLink, groupBy, textOf } from './content.jsx'
import '../../styles/marketing/base.css'
import '../../styles/marketing/customer-stories.css'

// Background loop named in marketing-shared.md §7.3 (only some data files record the <video> element).
const DEFAULT_VIDEO = '/assets/marketing/CustomerStoryBrevilleLoop.mp4'

// CustomerStoriesSlice (marketing-shared.md §7.3, `elme6fd*`, `e1wn1hrv*`).
// `data` = the {"slice":"CustomerStories"} section. useTabGroup(0,110): 11s per story; a tab click stops it.
export default function CustomerStoriesSlice({ data }) {
  const content = data?.content || []
  const rootRef = useRef(null)
  const videoItem = content.find((c) => c.role === 'video')
  const tabItems = content.filter((c) => c.el === 'e5b4pau2')
  const allStories = content.find((c) => c.el === 'e1wn1hrv8')
  const stories = groupBy(content.filter((c) => c.el !== 'e5b4pau2' && c.role !== 'video'), (c) => c.el === 'e1wn1hrv5')
    .map((g, i) => ({
      title: g[0].text,
      company: (tabItems[i]?.ariaLabel || '').replace(/ customer story$/, ''),
      logo: g.find((c) => c.el === 'e1wn1hrv11'),
      body: textOf(g.find((c) => c.el === 'e1wn1hrv6'), i + 11),
      read: g.find((c) => c.role === 'link' && c.el === 'a'),
    }))
  const { index, progress, select } = useTabGroup(stories.length, 110, rootRef)
  const videoSrc = videoItem?.src || DEFAULT_VIDEO
  const [videoOn, setVideoOn] = useState(false)

  // Lazy-attach the video after window load AND an IntersectionObserver hit (rootMargin 200px, threshold .1).
  useEffect(() => {
    const el = rootRef.current
    if (!el) return undefined
    let loaded = document.readyState === 'complete'
    let seen = false
    const check = () => { if (loaded && seen) setVideoOn(true) }
    const onLoad = () => { loaded = true; check() }
    if (!loaded) window.addEventListener('load', onLoad)
    const io = new IntersectionObserver((es) => {
      if (es.some((e) => e.isIntersecting)) { seen = true; check(); io.disconnect() }
    }, { rootMargin: '200px', threshold: 0.1 })
    io.observe(el)
    return () => { io.disconnect(); window.removeEventListener('load', onLoad) }
  }, [])

  return (
    <div className="mk-stories" ref={rootRef}>
      {videoOn && (
        <video className="mk-stories__video" src={videoSrc} poster={videoItem?.poster || undefined}
          autoPlay loop muted playsInline preload="none" aria-hidden="true" />
      )}
      <div className="mk-stories__inner">
        <div className="mk-stories__container">
          <ProgressTabs
            className="mk-stories__tabs"
            tone="light"
            labels={tabItems.map((t) => t.text)}
            ariaLabels={tabItems.map((t) => t.ariaLabel)}
            index={index}
            progress={progress}
            onSelect={select}
          />
          <div className="mk-stories__sp40" />
          <div className="mk-stories__list">
            {stories.map((s, i) => (
              <div key={i} className="mk-stories__story" data-active={i === index ? 'true' : undefined}>
                <h3 className="mk-stories__h3"><TitleWithLogo title={s.title} company={s.company} logo={s.logo} /></h3>
                <div className="mk-stories__sp24" />
                <p className="mk-stories__p">{s.body}</p>
                <div className="mk-stories__sp32" />
                <div className="mk-stories__ctas">
                  <MkButton item={s.read} variant="primary" />
                  {allStories && (
                    <SmartLink href={allStories.href} className="mk-btn mk-stories__secondary">{allStories.text}</SmartLink>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Inserts the bracketed inline logo "[ logo ]" after the word that contains the company name.
function TitleWithLogo({ title, company, logo }) {
  const logoEl = logo?.src ? (
    <span className="mk-stories__logo-wrap">
      <span aria-hidden="true">[</span>
      <img className="mk-stories__logo" src={logo.src} alt={company} />
      <span aria-hidden="true">]</span>
    </span>
  ) : null
  if (!logoEl || !company) return <>{title}{logoEl && <> {logoEl}</>}</>
  const at = title.indexOf(company)
  if (at < 0) return <>{title} {logoEl}</>
  let end = at + company.length
  while (end < title.length && title[end] !== ' ') end++
  return <>{title.slice(0, end)} {logoEl}{title.slice(end)}</>
}
