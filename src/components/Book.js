
import { useState } from 'react'
import { Link } from 'react-router-dom'
import imageNotAvailable from '../img/image-not-available.svg'
import iconIsRead from '../img/icon-book-isread.png'
import iconIsNotRead from '../img/icon-book-notread.png'
import iconMoreInfo from '../img/icon-book-more-info.png'
import iconDelete from '../img/icon-delete-book.png'

export default function Book ({bookData, LIBRARYMODEL, user, setFlash, setLibrary, sortMethod, filterMethod}) {
  
  if(!bookData.cover) bookData.cover = imageNotAvailable

  const { isbn, title, author, cover } = bookData
  const bookId = bookData.book_id
  
  const [isRead, setIsRead] = useState(Number(bookData.is_read) === 1 ? true : false)


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
    const updatedLibrary = await LIBRARYMODEL.getLibrary({
      userId : user.id, 
      sortMethod, 
      filterMethod
    })
    setLibrary(updatedLibrary)

  }


  async function handleToggleReadStatus(id) {

    await LIBRARYMODEL.toggleReadStatus(id)
    setIsRead(!isRead)

  }

  return(
  <div id={ isbn } className="book">

    <div className='book-cover-img'>
      <Link to={ `/library/${isbn}` }>
        <img 
          src={  cover } 
          alt={ `${ title } by ${ author } book cover` } 
          className="hover-expand"
        />
      </Link>
    </div>

    <div className='book-btns'>

      <button 
        onClick={ () => handleToggleReadStatus(bookId) } 
        className="btn-book"
      >
        <img 
          src={ isRead ? iconIsRead : iconIsNotRead } 
          alt={ isRead 
            ? 'You have read this book' 
            : 'You haven\'t read this book yet' 
          } 
        />
      </button>

      <Link to={ `/library/${isbn}` }>
        <button className="btn-book">
          <img src={ iconMoreInfo } alt="More info" />
        </button>
      </Link>

      <button 
        onClick={ () => handleDelete(title, bookId) }
        className="btn-book"
      >
          <img src={ iconDelete } alt="More info" />
      </button>
      
    </div>
  
  </div>

  )
}