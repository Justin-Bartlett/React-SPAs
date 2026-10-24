import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import PersonIcon from "@mui/icons-material/Person"

import "./headerNav.css"

const HeaderNav = () => {
  return (
    <nav className="header-nav">
      <ul>
        <button>
          <li>
            <PersonIcon className="icon" />
            Account
          </li>
        </button>
        <button>
          <li>
            <ShoppingCartIcon className="icon" />
            Cart
          </li>
        </button>
      </ul>
    </nav>
  )
}

export default HeaderNav
