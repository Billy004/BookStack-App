import { useEffect, useState } from "react";
import Book from "../components/Book";
import AddBookForm from "../components/AddBookForm";
import SearchBar from "../components/SearchBar"
import EmptySearchMsg from '../components/EmptySearchMsg'
import ChangeSettings from "../components/ChangeSettings";
import addBookBtn from '../img/icon-add-book.png'
import settingsBtn from '../img/icon-settings.png'

export default function Library ( { LIBRARYMODEL, USERMODEL ,setFlash, user } ) {


  // Sorting and Filtering Methods - String or false
  const [sortMethod, setSortMethod] = useState('title')
  const [filterMethod, setFilterMethod] = useState('all')
  

  // Get User settings from User Model
  useEffect( () => {
    async function getUserSettings() {
      const userSettings = await USERMODEL.getUserSettings(user.id)

      setSortMethod(userSettings.sort_method)
      setFilterMethod(userSettings.filter_method)
    }
    getUserSettings()
  }, [USERMODEL, user.id])





  // Stores the library - Array of objects
  const [library, setLibrary] = useState([]);

  // Gets library from DB
  useEffect( () => {
    async function initLibrary() {
      const lib =  await LIBRARYMODEL.getLibrary({
        userId : user.id,
        sortMethod,
        filterMethod
      });
      setLibrary(lib)
    }
  
    initLibrary()
  }, [LIBRARYMODEL, user, sortMethod, filterMethod])
  



  // userAction -> View A User Action Dialog (Add Book, Change Settings). String or false
  const [userAction, setUserAction] = useState(false)
  const showEmptySearchMsg = library.length === 0 ? true : false





  return(
  <div className="library-wrapper content-wrapper">

    <div className="user-actions">

      <button
        onClick={ () => setUserAction( userAction !== 'changeSettings' ? 'changeSettings' : false ) }
        className="btn-user-action"
      >
        <img src={ settingsBtn } alt="Settings" />
      </button>

      <button 
        onClick={ () => setUserAction( userAction !== 'addBook' ? 'addBook' : false) } 
        className="btn-user-action"
      >
        <img src={ addBookBtn } alt="Add Book" />
      </button>

      
    <SearchBar 
      LIBRARYMODEL={ LIBRARYMODEL }
      setLibrary={ setLibrary }
      user={ user }
      sortMethod={ sortMethod }
      filterMethod={ filterMethod }
    />

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
        sortMethod={ sortMethod }
        filterMethod={ filterMethod }
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
        setUserAction= { setUserAction }
      />
    }

    {
      showEmptySearchMsg && 
        <EmptySearchMsg />
    }

    <div className="library">

      { 
      library.map((book, index) => 
        <Book 
          LIBRARYMODEL={ LIBRARYMODEL }
          user={ user }
          setLibrary={ setLibrary }
          setFlash={ setFlash }
          sortMethod={ sortMethod }
          filterMethod={ filterMethod }
          bookData={ book }
          key={ index }
        />
      ) 
    }
    </div>
  
  </div>

  )
}