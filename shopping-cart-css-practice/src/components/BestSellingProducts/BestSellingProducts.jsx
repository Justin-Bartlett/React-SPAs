import ProductList from "../ProductList/ProductList"

import "./bestSellingProducts.css"

const bestSellingProducts = () => {
  return (
    <>
      <div className="featured-list">
        <h2>Best Selling Products</h2>
        <button>View All &rarr;</button>
      </div>
      <ProductList />
    </>
  )
}

export default bestSellingProducts
