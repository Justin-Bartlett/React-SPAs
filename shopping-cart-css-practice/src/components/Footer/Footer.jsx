const Footer = () => {
  return (
    <section className="footer-links">
      <p className="title">Plymouth Everything Store</p>
      <p className="description">Your one stop shop for everything you need</p>
      <div className="icon-btns">
        <img src="facebook-icon.png" alt="Facebook icon" />
        <img src="twitter.png" alt="Twitter" />
        <img src="linkdn.png" alt="Linkdn" />
      </div>
      <div className="shop-links">
        <p className="shop-title">Shop</p>
        <ul>
          <li>
            <button>All Products</button>
          </li>
          <li>
            <button>New Arrivals</button>
          </li>
          <li>
            <button>Best Sellers</button>
          </li>
          <li>
            <button>Offers</button>
          </li>
        </ul>
        <div className="customer-services-links">
          <p className="customer-services-title">Customer Services</p>
          <ul>
            <li>
              <button>Contact Us</button>
            </li>
            <li>
              <button>Track Order</button>
            </li>
            <li>
              <button>Returns & Refunds</button>
            </li>
            <li>
              <button>FAQs</button>
            </li>
          </ul>
        </div>
        <div className="company-links">
          <p className="company-title">Company</p>
          <ul>
            <li>
              <button>About Us</button>
            </li>
            <li>
              <button>Careers</button>
            </li>
            <li>
              <button>Privacy Policy</button>
            </li>
            <li>
              <button>Terms & Conditions</button>
            </li>
          </ul>
        </div>
        <div className="payment-methods">
          <img src="visa.png" alt="Visa" />
          <img src="mastercard.png" alt="Mastercard" />
          <img src="up.png" alt="Up" />
          <img src="paypal.png" alt="Paypal" />
        </div>
      </div>
    </section>
  )
}

export default Footer
