import ProductPage, { PRODUCT_SLUGS } from './ProductPage.jsx'

// Routes for the product template group (specs/marketing-routes.md): the 7 /product/* pages.
export const productRoutes = PRODUCT_SLUGS.map((slug) => ({
  path: `/product/${slug}`,
  element: <ProductPage key={slug} slug={slug} />,
}))
