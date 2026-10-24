import SearchIcon from "@mui/icons-material/Search"
import "./searchBar.css"

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input
        className="search-bar-input"
        type="text"
        name="top-search"
        placeholder="Search..."
        aria-label="Search"
      />
      <button className="search-bar-button" type="button" aria-label="Search">
        <SearchIcon />
      </button>
    </div>
  )
}

export default SearchBar
