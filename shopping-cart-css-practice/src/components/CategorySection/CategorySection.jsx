import MenuIcon from "@mui/icons-material/Menu"
import { IconButton } from "@mui/material"
import laptopImage from "../../assets/laptop.png"
import tshirtImage from "../../assets/tshirt.png"
import sofaImage from "../../assets/sofa.png"
import perfumesImage from "../../assets/perfumes.png"
import trainerImage from "../../assets/trainer.png"
import teddyBearImage from "../../assets/teddybear.png"
import booksImage from "../../assets/stackofbooks.png"
import shoppingBasketImage from "../../assets/shoppingbasket.png"

import "./categorySection.css"

const CategorySection = () => {
  return (
    <div className="main-nav">
      <IconButton
        color="inherit"
        aria-label="menu"
        className="all-categories-btn-txt"
      >
        <MenuIcon className="hamburger-icon" />
        <span>All Categories</span>
      </IconButton>
      <nav className="category-nav">
        <ul>
          <li>
            <div className="category-image-circle">
              <img src={laptopImage} alt="electronics" />
            </div>
            <button>Electronics</button>
          </li>
          <li>
            <div className="category-image-circle">
              <img src={tshirtImage} alt="fashion" />
            </div>
            <button>Fashion</button>
          </li>
          <li>
            <div className="category-image-circle">
              <img src={sofaImage} alt="Home & Living" />
            </div>
            <button>Home & Living</button>
          </li>
          <li>
            <div className="category-image-circle">
              <img src={perfumesImage} alt="Beauty" />
            </div>
            <button>Beauty</button>
          </li>
          <li>
            <div className="category-image-circle">
              <img src={trainerImage} alt="Sports" />
            </div>
            <button>Sports</button>
          </li>
          <li>
            <div className="category-image-circle">
              <img src={teddyBearImage} alt="Toys" />
            </div>
            <button>Toys</button>
          </li>
          <li>
            <div className="category-image-circle">
              <img src={booksImage} alt="Books" />
            </div>
            <button>Books</button>
          </li>
          <li>
            <div className="category-image-circle">
              <img src={shoppingBasketImage} alt="Grocery" />
            </div>
            <button>Grocery</button>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default CategorySection
