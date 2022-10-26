
import { useState } from 'react'
import { Link } from 'react-router-dom'
import imageNotAvailable from '../img/image-not-available.svg'

export default function Book ({bookData, LIBRARYMODEL, user, setFlash, setLibrary, sortMethod, filterMethod}) {
  
  if(!bookData.cover) bookData.cover = imageNotAvailable

  const { isbn, title, author, cover } = bookData
  const bookId = bookData.book_id
  
  const [isRead, setIsRead] = useState(Number(bookData.is_read) === 1 ? true : false)


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


  async function handleDelete(title, id) {
    const deletedBook = await LIBRARYMODEL.deleteBook(id)
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
    const updatedLibrary = await LIBRARYMODEL.getLibrary(user.id, sortMethod, filterMethod)
    setLibrary(updatedLibrary)

  }


  async function handleToggleReadStatus(id) {

    await LIBRARYMODEL.toggleReadStatus(id)
    setIsRead(!isRead)

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

      <button 
        style={ btnStyle }
        onClick={ () => handleToggleReadStatus(bookId) }  
        >
        { isRead ? 'R' : 'U' }
      </button>

      <Link to={ `/library/${isbn}` }>
        <button style={ btnStyle }>MI</button>
      </Link>

      <button onClick={ () => handleDelete(title, bookId) } style={ btnStyle }>
        DEL
      </button>
      
    </div>
  
  </div>

  )
}