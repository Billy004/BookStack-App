import debounce from "lodash.debounce"
import { useMemo } from "react"
import searchIcon  from '../img/icon-search.png'


export default function SearchLibrary ({LIBRARYMODEL, setLibrary}) {

  async function searchLibrary(e) {
    const searchResults = await LIBRARYMODEL.searchLibrary(e.target.value)
    setLibrary(searchResults)
     
  }

  const handleSearch = useMemo( () => 
    //eslint-disable-next-line
    debounce(searchLibrary, 1000), []
  )

  return(
  <div className="search-bar">
    

    <label>
      <input 
        type="text" 
        onChange={ handleSearch } 
        className="search-bar-input"
      />
      <span className="search-label">Search your library</span>
      <img src={ searchIcon } className="search-icon" alt="Search" />
    </label>

  
  </div>

  )
}