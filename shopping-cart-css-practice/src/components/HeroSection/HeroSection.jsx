import "./heroSection.css"

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-img">
        <button className="left-arrow-nav" type="button" aria-label="Previous slide">
          <div className="left-nav-btn">&lt;</div>
        </button>
        <div className="cta">
          <p className="new-arrivals">NEW ARRIVALS</p>
          <p className="latest-gadgets">Latest Gadgets For a Smarter You</p>
          <p className="tagline">Up to 40% Off on Electronics</p>
          <button className="shop-now">Shop Now &rarr;</button>
        </div>
        <button className="right-arrow-nav" type="button" aria-label="Next slide">
          <div className="right-nav-btn">&gt;</div>
        </button>
      </div>
    </section>
  )
}

export default HeroSection
