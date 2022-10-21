import { useEffect, useState } from "react";
import Book from "../components/Book";
import AddBookForm from "../components/AddBookForm";
import LibraryModel from '../model/LibraryModel'

export default function Library ( { setFlash } ) {

  const libraryStyle = {
    padding : '1rem',
    display : 'grid',
    gridTemplateColumns : 'repeat(auto-fit, minmax(100px, 1fr))',
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

  const LIBRARYMODEL = new LibraryModel

  // Maybe Look into useMemo
  const [library, setLibrary] = useState([{}]);

  useEffect( () => {
    async function initLibrary() {
      const lib =  await LIBRARYMODEL.getLibrary();
      setLibrary(lib)
    }
  
    initLibrary()
  }, [])
  

  const [showAddBookForm, toggleShowAddBookForm] = useState(false)




  return(
  <div className="slide-down">

    <div style={ libraryActionsStyle }>

      <button 
        onClick={ () => toggleShowAddBookForm(!showAddBookForm) } 
        style={ addBookBtnStyle }
      >
        { !showAddBookForm ? 'Add Book' : 'Close'}
      </button>

    </div>

    {
    showAddBookForm && 
      <AddBookForm 
        LIBRARYMODEL={ LIBRARYMODEL } 
        setLibrary={ setLibrary } 
        toggleShowAddBookForm={ toggleShowAddBookForm } 
        showAddBookForm={ showAddBookForm }
        setFlash={ setFlash }
      />
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