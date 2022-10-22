
import imageNotAvailable from '../img/image-not-available.svg'

export default function Book ({bookData, LIBRARYMODEL, setFlash, setLibrary}) {
  
  if(!bookData.cover) bookData.cover = imageNotAvailable

  const { isbn, title, author, pages, cover } = bookData
  const isRead = bookData.is_read
  const dateAdded = bookData.date_added

  const bookStyle = {
    border : '1px solid #333',
    borderRadius : '0.5rem',
    overflow : 'hidden',
  }

  const coverImgStyle = {
    width : '100%',
    maxWidth : '100%',
    aspectRatio : '1 / 1.3', 
    objectFit : 'cover',
    objectPosition : 'top',
    cursor : 'pointer',
  }

  const btnWrapperStyle = {
    display : 'flex',
    justifyContent : 'space-around',
    width : '100%',
    marginBlock : '0.5rem',
  }

  const btnStyle = {
    padding : '0.3rem',
    background : 'transparent',
    border : '1px solid #aaa',
    outline : '0',
    cursor : 'pointer',
  }



  async function handleDelete(isbn, title) {
    const deletedBook = await LIBRARYMODEL.deleteBook(isbn)
    if (deletedBook) {
      setFlash({
        message : `${title} was deleted successfully`,
        type : 'success',
      })
    } else {
      setFlash({
        message : `Book was not deleted`,
        type : 'fail',
      })
    }

    // Update UI
    const updatedLibrary = await LIBRARYMODEL.getLibrary()
    setLibrary(updatedLibrary)

  }

  return(
  <div style={ bookStyle } id={ isbn }>

    <div>
      <img 
        src={  cover } 
        alt={ `${ title } by ${ author } book cover` } 
        style={ coverImgStyle } 
        className="hover-expand"
      />
    </div>

    <div style={ btnWrapperStyle }>

      <button style={ btnStyle }>
        R/U
      </button>

      <button style={ btnStyle }>
        MI
      </button>

      <button onClick={ () => handleDelete(isbn, title) } style={ btnStyle }>
        DEL
      </button>
      
    </div>
  
  </div>

  )
}