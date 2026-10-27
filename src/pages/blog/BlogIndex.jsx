import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { usePageChrome } from '../../chrome.jsx'
import FinalCta from '../../components/FinalCta.jsx'
import BlogCard from './BlogCard.jsx'
import {
  PAGE_SIZE, blogData, categories, categoryForPath, featuredPosts, featuredRepeatsFor, gridPostsFor,
} from './data.js'
import '../../styles/blog/blog.css'
import '../../styles/blog/blog-index.css'

function normalise(pathname) {
  return pathname.endsWith('/') ? pathname : `${pathname}/`
}

// specs/blog-index.md — /blog/ and the 5 tag pages.
function BlogIndexPage({ category }) {
  const navigate = useNavigate()
  const [count, setCount] = useState(blogData.initialCount)
  const grid = gridPostsFor(category)
  const repeats = featuredRepeatsFor(category)
  const [featA, featB] = featuredPosts

  return (
    <>
      <main className="blog-index">
        <div className="blog-index__top-spacer" />
        <section className="blog-grid blog-grid--index">
          {featA && (
            <div className="blog-index__feat blog-index__feat--a">
              <BlogCard post={featA} variant="featured" />
            </div>
          )}
          {featB && (
            <div className="blog-index__feat blog-index__feat--b">
              <BlogCard post={featB} variant="featured" />
            </div>
          )}
          <div className="blog-index__title-row">
            <h1 className="blog-index__h1">{blogData.h1}</h1>
            <div className="blog-index__pills">
              {categories.map((c) => (
                <button
                  key={c.path}
                  type="button"
                  className="blog-pill"
                  data-active={c.path === category.path ? 'true' : undefined}
                  aria-current={c.path === category.path ? 'page' : undefined}
                  onClick={() => navigate(c.path)}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </section>
        <div className="blog-index__mid-spacer" />
        <div className="blog-index__grid-wrap">
          <section className="blog-grid blog-grid--index">
            <div className="blog-index__zero-cell" />
            {repeats.map((p) => (
              <div key={`repeat-${p.path}`} className="blog-index__cell blog-index__cell--repeat">
                <BlogCard post={p} />
              </div>
            ))}
            {grid.slice(0, count).map((p) => (
              <div key={p.path} className="blog-index__cell">
                <BlogCard post={p} />
              </div>
            ))}
          </section>
          {count < grid.length && (
            <div className="blog-index__more">
              <button type="button" className="blog-more-btn" onClick={() => setCount((c) => c + PAGE_SIZE)}>
                Load more
              </button>
            </div>
          )}
        </div>
        <div className="blog-index__end-spacer" />
        <div className="blog-index__end-spacer-2" />
      </main>
      <FinalCta />
    </>
  )
}

export default function BlogIndex() {
  usePageChrome({ theme: 'dark', footer: 'default', navSpacer: true })
  const { pathname } = useLocation()
  const category = categoryForPath(normalise(pathname))
  // Keyed by route so "Load more" resets when switching filters.
  return <BlogIndexPage key={category.path} category={category} />
}
