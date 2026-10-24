import Header from "./components/Header/Header"
import HeroSection from "./components/HeroSection/HeroSection"
import CategorySection from "./components/CategorySection/CategorySection"
import FeaturedProducts from "./components/FeaturedProducts/FeaturedProducts"
import PromotionalOffers from "./components/PromotionalOffersSection/PromotionalOffers"
import BestSellingProducts from "./components/BestSellingProducts/BestSellingProducts"
import FeaturesSection from "./components/FeaturesSection/FeaturesSection"
import NewsletterSection from "./components/NewsletterSection/NewsletterSection"

import "./App.css"

function App() {
  return (
    <section id="center">
      <Header />

      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
      <PromotionalOffers />
      <BestSellingProducts />
      <FeaturesSection />
      <NewsletterSection />
    </section>
  )
}

export default App
