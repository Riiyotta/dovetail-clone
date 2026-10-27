import BlogIndex from './BlogIndex.jsx'
import BlogPost from './BlogPost.jsx'

// Routes for the blog template group (specs/content-routes.md). Most specific patterns first.
// /blog/ + the 5 tag pages -> blog-index; every other /blog/<slug>/ -> blog-post (unknown slugs included,
// with a slug-derived title). Only the exact slug "product" is a tag; "/blog/product-…/" is a post.
const TAG_SLUGS = ['ai', 'dovetail-team', 'engineering', 'product', 'ideas']

export const blogRoutes = [
  { path: '/blog', element: <BlogIndex /> },
  ...TAG_SLUGS.map((t) => ({ path: `/blog/${t}`, element: <BlogIndex /> })),
  { path: '/blog/:slug', element: <BlogPost /> },
]
