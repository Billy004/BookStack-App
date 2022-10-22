import { useEffect, useMemo, useState } from "react";
import Book from "../components/Book";
import AddBookForm from "../components/AddBookForm";
import SearchBar from "../components/SearchBar"
import LibraryModel from '../model/LibraryModel'
import EmptySearchMsg from '../components/EmptySearchMsg'

export default function Library ( { setFlash } ) {

  const libraryStyle = {
    padding : '1rem',
    display : 'grid',
    gridTemplateColumns : 'repeat(auto-fit, 140px)',
    gap : '1rem',
  }

  const libraryActionsStyle = {
    display : 'flex',
    justifyContent : 'flex-end',
    width : '100%',
    padding : '1rem',
  }

  const addBookBtnStyle = {
    padding : '0.5rem 1rem',
    backgroundColor : '#571D1D',
    color : '#fff',
    border : '1px solid #571D1D',
    borderRadius : '0.3rem',
    cursor : 'pointer',
  }

  const searchBarBtnStyle = {
    padding : '0.5rem 1rem',
    marginRight : '1rem',
    backgroundColor : '#1D571D',
    color : '#fff',
    border : '1px solid #571D1D',
    borderRadius : '0.3rem',
    cursor : 'pointer',
  }

  const LIBRARYMODEL = useMemo( () => new LibraryModel(), [] ) 

  // Maybe Look into useMemo
  const [library, setLibrary] = useState([{}]);

  useEffect( () => {
    async function initLibrary() {
      const lib =  await LIBRARYMODEL.getLibrary();
      setLibrary(lib)
    }
  
    initLibrary()
  }, [LIBRARYMODEL])
  

  const [userAction, setUserAction] = useState(false)
  const showEmptySearchMsg = library.length === 0 ? true : false



  return(
  <div>

    <div style={ libraryActionsStyle }>

      <button
        onClick={ () =>  setUserAction( userAction !== 'searchLibrary' ? 'searchLibrary' : false ) }
        style={ searchBarBtnStyle }
      >
        { 
        userAction !== 'searchLibrary' ? 'Search Library' : 'Close' 
        }
      </button>
      
      <button 
        onClick={ () => setUserAction( userAction !== 'addBook' ? 'addBook' : false) } 
        style={ addBookBtnStyle }
      >
        { userAction !== 'addBook' ? 'Add Book' : 'Close' }
      </button>

    </div>

    {
    userAction === 'addBook' && 
      <AddBookForm 
        LIBRARYMODEL={ LIBRARYMODEL } 
        setLibrary={ setLibrary } 
        setUserAction={ setUserAction } 
        setFlash={ setFlash }
      />
    }

    {
      userAction === 'searchLibrary' &&
        <SearchBar 
          LIBRARYMODEL={ LIBRARYMODEL }
          setLibrary={ setLibrary }
        />
    }

    {
      showEmptySearchMsg && 
        <EmptySearchMsg />
    }

    <div style={ libraryStyle }>

      { 
      library.map((book, index) => 
        <Book 
          LIBRARYMODEL={ LIBRARYMODEL }
          setLibrary={ setLibrary }
          setFlash={ setFlash }
          bookData={ book }
          key={ index }
        />
      ) 
    }
    </div>
  
  </div>

  )
}