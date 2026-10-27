import { Link } from 'react-router-dom'
import { cardImage, tagLine } from './data.js'

// Shared image card — specs/content-shared.md §4.2.
// variant: 'grid' (title 20/28 + date + tags), 'featured' (title 24/32 + date + tags),
//          'side' (sidebar / related: title only).
export default function BlogCard({ post, variant = 'grid', className = '' }) {
  const titleOnly = variant === 'side'
  return (
    <div className={`blog-card blog-card--${variant} ${className}`}>
      <div className="blog-card__media">
        <Link className="blog-card__img-link" to={post.path} tabIndex={-1} aria-hidden="true">
          <img className="blog-card__img" src={cardImage(post)} alt="" loading="lazy" />
        </Link>
      </div>
      <Link className="blog-card__text" to={post.path}>
        <div className="blog-card__head">
          <p className="blog-card__title">{post.title}</p>
          {!titleOnly && <p className="blog-card__date">{post.date}</p>}
        </div>
        {!titleOnly && <p className="blog-card__tags">{tagLine(post.tags)}</p>}
      </Link>
    </div>
  )
}
