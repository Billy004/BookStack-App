import { useEffect, useState } from "react";
import Book from "../components/Book";
import LibraryModel from '../model/LibraryModel'

export default function Library () {

  const libraryStyle = {
    padding : '1rem',
    display : 'grid',
    gridTemplateColumns : 'repeat(auto-fit, minmax(200px, 20vw))',
    gap : '1rem',
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
  


  return(
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

  )
}