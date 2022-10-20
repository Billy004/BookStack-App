import { useEffect, useState } from "react";
import Book from "../components/Book";
import AddBookForm from "../components/AddBookForm";
import LibraryModel from '../model/LibraryModel'

export default function Library ( {flash, setFlash } ) {

  const libraryStyle = {
    padding : '1rem',
    display : 'grid',
    gridTemplateColumns : 'repeat(auto-fit, minmax(200px, 1fr))',
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
  <div>

    <div style={ libraryActionsStyle }>

      <button onClick={ () => toggleShowAddBookForm(!showAddBookForm) } style={ addBookBtnStyle }>Add Book</button>

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
          title={ book.title }
          author={ book.author }
          isbn={ book.isbn }
          key={ index }
        />
      ) 
    }
    </div>
  
  </div>

  )
}