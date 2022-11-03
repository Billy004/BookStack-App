import debounce from "lodash.debounce"
import { useMemo } from "react"
import { Style } from "react-style-tag"
import searchIcon  from '../img/icon-search.png'


export default function SearchLibrary ({LIBRARYMODEL, setLibrary, user, sortMethod, filterMethod}) {

  async function searchLibrary(e) {

    let searchResults
    if(e.target.value.length === 0) {
      searchResults = await LIBRARYMODEL.getLibrary({
        userId : user.id, 
        sortMethod, 
        filterMethod
      })
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
  <>
  <Style>{`
    .search-bar {
      position: relative;
      padding : 0;
      margin : 0;
    }
    
    .search-label {
      position: absolute;
      top : 50%;
      left : 0.5rem;
      transform: translateY(-50%);
      transition: all 250ms;
    }
    
    .search-bar-input[type=text] {
      width : 600px;
      max-width : 400px;
      margin : 0;
    }
    
    .search-bar-input:focus + .search-label {
      top : 0;
      transform: translateY(-1.3rem);
    }
    
    .search-icon {
      position: absolute;
      top : 50%;
      right : 0.5rem;
      transform: translateY(-50%);
    }
  `}</Style>

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
  </>
  )
}