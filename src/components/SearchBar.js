import debounce from "lodash.debounce"
import { useMemo } from "react"


export default function SearchLibrary ({LIBRARYMODEL, setLibrary}) {

  const baseStyle = {
    padding : '1rem',
  }


  async function searchLibrary(e) {
    const searchResults = await LIBRARYMODEL.searchLibrary(e.target.value)
    console.log(searchResults.length)
    setLibrary(searchResults)
     
  }

  const handleSearch = useMemo( () => 
    //eslint-disable-next-line
    debounce(searchLibrary, 1000), []
  )

  return(
  <div style={ baseStyle } className="slide-down">
  
    <label>
      Search:
      <input 
        type="text" 
        onChange={ handleSearch } 
      />
    </label>

  
  </div>

  )
}