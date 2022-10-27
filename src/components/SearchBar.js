import debounce from "lodash.debounce"
import { useMemo } from "react"
import searchIcon  from '../img/icon-search.png'


export default function SearchLibrary ({LIBRARYMODEL, setLibrary, user, sortMethod, filterMethod}) {

  async function searchLibrary(e) {

    let searchResults
    if(e.target.value.length === 0) {
      searchResults = await LIBRARYMODEL.getLibrary(user.id, sortMethod, filterMethod)
    } else {
      searchResults = await LIBRARYMODEL.searchLibrary(e.target.value, user.id)
    }

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