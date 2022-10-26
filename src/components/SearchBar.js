import debounce from "lodash.debounce"
import { useMemo } from "react"


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
      <span className="search-label">Search</span>
    </label>

  
  </div>

  )
}