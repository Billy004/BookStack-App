import debounce from "lodash.debounce"
import { useMemo } from "react"


export default function SearchLibrary ({LIBRARYMODEL, setLibrary}) {

  const baseStyle = {
    marginInline : '1rem',
    padding : '1rem',
    border : '1px solid #ddd',
    borderRadius : '1rem',
  }


  async function searchLibrary(e) {
    const searchResults = await LIBRARYMODEL.searchLibrary(e.target.value)
    setLibrary(searchResults)
     
  }

  const handleSearch = useMemo( () => 
    //eslint-disable-next-line
    debounce(searchLibrary, 1000), []
  )

  return(
  <div style={ baseStyle } className="slide-down">
    
    <h2 className="mb1">Search your library</h2>

    <label>
      Enter a word or two to search titles and authors:<br />
      <input 
        type="text" 
        onChange={ handleSearch } 
      />
    </label>

  
  </div>

  )
}