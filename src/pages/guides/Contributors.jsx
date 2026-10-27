import { Fragment, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { usePageChrome } from '../../chrome.jsx'
import FinalCta from '../../components/FinalCta.jsx'
import { humanize, useContent } from './data.js'
import { fill, padTo, rng } from './placeholder.js'
import { ArrowRight, Breadcrumb, EditorialBox, Spacer, TagCloud } from './components.jsx'
import '../../styles/guides/primitives.css'
import '../../styles/guides/content.css'
import '../../styles/guides/contributors.css'

const LIGHT = { theme: 'light', footer: 'default', navSpacer: true }

// Fixed boilerplate on the live site — same-length placeholders (343 + 241 chars).
function editorialBody(d) {
  const [a, b] = d?.editorialProcess?.paragraphs || [{ chars: 343 }, { chars: 241 }]
  return [fill(a.chars, rng('editorial-1')), fill(b.chars, rng('editorial-2'))]
}

// specs/contributors-index.md
export function ContributorsIndex() {
  usePageChrome(LIGHT)
  const d = useContent('contributors')
  if (!d) return <main className="ct" />
  return (
    <main className="ct">
      <Spacer className="h-[112px]" />
      <div className="ctitle">
        <section className="container">
          <h1 className="ctitle__h1">{d.h1}</h1>
          <div className="cgrid-inner">
            <div className="c-span-9">
              <p className="ct__intro">{padTo(d.introFirstSentence, d.introChars, 'contributors-intro')}</p>
            </div>
          </div>
        </section>
      </div>
      <Spacer className="ct__sp-64" />
      <section className="container">
        {Object.entries(d.groups).map(([group, people], gi) => (
          <Fragment key={group}>
            {/* Text says 80px, but the recorded section end / box y / doc heights at all 4 widths fit 200 (≤1280 96). */}
            {gi > 0 && <Spacer className="ct__sp-200" />}
            <h2 className="ct__group-h">{group}</h2>
            <hr className="chr" />
            {people.map((p) => (
              <Fragment key={p.href}>
                <div className="ct-row">
                  <Link to={p.href} className="ct-row__name">
                    {p.name}
                    <span className="ct-row__arrow"><ArrowRight /></span>
                  </Link>
                  {p.role && <p className="ct-row__role">{p.role}</p>}
                </div>
                <hr className="chr" />
              </Fragment>
            ))}
          </Fragment>
        ))}
      </section>
      <Spacer className="ct__sp-200" />
      <EditorialBox data={d.editorialProcess} body={editorialBody(d)} />
      <FinalCta />
    </main>
  )
}

// specs/contributor-profile.md
export function ContributorProfile() {
  usePageChrome(LIGHT)
  const { pathname } = useLocation()
  const d = useContent('contributors')
  const path = pathname.endsWith('/') ? pathname : `${pathname}/`
  const profile = useMemo(() => {
    if (!d) return null
    return d.profiles.find((p) => p.path === path)
      || { path, name: humanize(path.split('/').filter(Boolean)[1]), role: null, skills: [], articleLists: {} }
  }, [d, path])
  if (!profile) return <main className="ct" />
  const lists = Object.entries(profile.articleLists || {})
  return (
    <main className="ct" key={path}>
      <Spacer className="h-[112px]" />
      <div className="ctitle">
        <section className="container">
          <Breadcrumb crumbs={[{ text: 'Contributors', href: '/contributors/' }, { text: profile.name }]} />
          <Spacer className="h-[32px]" />
          <h1 className="ctitle__h1">{profile.name}</h1>
          <div className="cgrid-inner">
            <div className="c-span-9">
              <p className="ct__role">{profile.role || ''}</p>
            </div>
          </div>
        </section>
      </div>
      <Spacer className="ct__sp-64" />
      <section className="container">
        <div className="ct__skills">
          <Spacer className="h-[80px]" />
          <TagCloud heading="Skills" headingAs="p" items={profile.skills} />
        </div>
      </section>
      <Spacer className="ct__sp-200" />
      <EditorialBox data={d.editorialProcess} body={editorialBody(d)} />
      {lists.map(([heading, items]) => (
        <Fragment key={heading}>
          <Spacer className="ct__sp-200" />
          <section className="cgrid cgrid--rg64">
            <div className="c-full">
              <h2 className="ct__list-h">{heading}</h2>
            </div>
            {items.map((it) => (
              <div key={it.href} className="c-span-4 c-keep">
                <Link to={it.href} className="ct-item__title">{it.title}</Link>
                <p className="ct-item__date cmono">{it.date}</p>
              </div>
            ))}
          </section>
        </Fragment>
      ))}
      <FinalCta />
    </main>
  )
}
