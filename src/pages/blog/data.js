// Blog data access — specs/blog-index.md, specs/blog-post.md, specs/content-routes.md.
import blog from '../../data/content/blog.json'

export const blogData = blog
export const posts = blog.posts
export const categories = blog.categories // [{ label, path }], "All" first
export const PAGE_SIZE = blog.pageSize // 24

const byPath = new Map(posts.map((p) => [p.path, p]))

export function postByPath(path) {
  return byPath.get(path) || null
}

export const featuredPosts = blog.featured.map(postByPath).filter(Boolean)

// Card image: local first-page thumbnail, else the remote one. (No remote thumbnail is a .gif; the
// -poster.png swap from content-assets.md is already applied in the data.)
export function cardImage(post) {
  return post.thumbnail || post.thumbnailRemote
}

export function tagLine(tags) {
  return (tags || []).map((t) => `[${t}]`).join(' ')
}

// content-routes.md: humanise the slug ("what-is-a-cohort-study" -> "What is a cohort study").
export function titleFromSlug(slug) {
  const s = decodeURIComponent(slug || '').replace(/[-_]+/g, ' ').trim()
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : 'Blog'
}

// Tag pages filter by exact tag label (verified against categoryPages: Engineering = 8 grid posts).
export function categoryForPath(path) {
  return categories.find((c) => c.path === path) || categories[0]
}

export function gridPostsFor(category) {
  const rest = posts.filter((p) => !blog.featured.includes(p.path))
  if (!category || category.path === '/blog/') return rest
  return rest.filter((p) => p.tags.includes(category.label))
}

export function featuredRepeatsFor(category) {
  if (!category || category.path === '/blog/') return featuredPosts
  return featuredPosts.filter((p) => p.tags.includes(category.label))
}
