import { useEffect, useMemo, useState } from "react";
import Book from "../components/Book";
import AddBookForm from "../components/AddBookForm";
import SearchBar from "../components/SearchBar"
import LibraryModel from '../model/LibraryModel'
import EmptySearchMsg from '../components/EmptySearchMsg'
import ChangeSettings from "../components/ChangeSettings";

export default function Library ( { setFlash, user } ) {

  const libraryStyle = {
    padding : '1rem',
    display : 'grid',
    gridTemplateColumns : 'repeat(auto-fit, 140px)',
    gap : '1rem',
  }

  const libraryActionsStyle = {
    display : 'flex',
    justifyContent : 'flex-end',
    gap : '1rem',
    width : '100%',
    padding : '1rem',
  }

  const settingsBtnStyle = {
    padding : '0.5rem 1rem',
    backgroundColor : '#571D57',
    color : '#fff',
    border : '1px solid #571D1D',
    borderRadius : '0.3rem',
    cursor : 'pointer',
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
    backgroundColor : '#1D571D',
    color : '#fff',
    border : '1px solid #571D1D',
    borderRadius : '0.3rem',
    cursor : 'pointer',
  }
  
  const [sortMethod, setSortMethod] = useState()
  const [filterMethod, setFilterMethod] = useState()

  const LIBRARYMODEL = useMemo( () => new LibraryModel(), [] ) 

  // Maybe Look into useMemo
  const [library, setLibrary] = useState([]);

  useEffect( () => {
    async function initLibrary() {
      const lib =  await LIBRARYMODEL.getLibrary(user.id);
      setLibrary(lib)
    }
  
    initLibrary()
  }, [LIBRARYMODEL, user])
  

  // const [userAction, setUserAction] = useState(false)
  const [userAction, setUserAction] = useState('changeSettings')
  const showEmptySearchMsg = library.length === 0 ? true : false


  return(
  <div>

    <div style={ libraryActionsStyle }>

      <button
        onClick={ () => setUserAction( userAction !== 'changeSettings' ? 'changeSettings' : false ) }
        style={ settingsBtnStyle }
      >
        Settings
      </button>

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
        user={ user }
        library={ library }
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
      userAction === 'changeSettings' &&
      <ChangeSettings 
        LIBRARYMODEL={ LIBRARYMODEL }
        user={ user }
        sortMethod={ sortMethod }
        setSortMethod={ setSortMethod }
        filterMethod={ filterMethod }
        setFilterMethod={ setFilterMethod }
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
          user={ user }
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