import ProductList from "../ProductList/ProductList"

import "./featuredProducts.css"

const FeaturedProducts = () => {
  return (
    <>
      <div className="featured-list">
        <h2>Featured Products</h2>
        <button>View All &rarr;</button>
      </div>
      <ProductList />
    </>
  )
}

export default FeaturedProducts
