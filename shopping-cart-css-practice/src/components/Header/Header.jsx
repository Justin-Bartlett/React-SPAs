import SearchBar from "../SearchBar/SearchBar"
import HeaderNav from "../HeaderNav/HeaderNav"

import "./header.css"

const Header = () => {
  return (
    <header className="main-header">
      <h1>ShopOrWhat</h1>
      <SearchBar />
      <HeaderNav />
    </header>
  )
}

export default Header
