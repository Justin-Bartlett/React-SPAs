import "./featuresSection.css"

const FeaturesSection = () => {
  return (
    <section className="features-section">
      <div className="feature">
        <img src="lorry.png" alt="Lorry" />
        <p className="title">Free Shipping</p>
        <p className="title-small">On orders above £499</p>
      </div>
      <div className="feature">
        <img src="badge.png" alt="Badge" />
        <p className="title">Secure Payment</p>
        <p className="title-small">100% secure checkout</p>
      </div>
      <div className="feature">
        <img src="parcel.png" alt="Parcel" />
        <p className="title">Easy Returns</p>
        <p className="title-small">7-day return policy</p>
      </div>
      <div className="feature">
        <img src="headphones.png" alt="Headphones" />
        <p className="title">24/7 Support</p>
        <p className="title-small">Dedicated customer support</p>
      </div>
    </section>
  )
}

export default FeaturesSection
