const NewsletterSection = () => {
  return (
    <section className="newsletter">
      <div className="img">
        <img src="envelope.png" alt="Envelope" />
      </div>
      <div className="description">
        <p className="title">Get the Latest Updates</p>
      </div>
      <div className="subscription">
        <input type="text" />
        <button className="subscribe">Subscribe</button>
      </div>
    </section>
  )
}

export default NewsletterSection
