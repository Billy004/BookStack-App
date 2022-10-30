
import { getGoogleBookInfo } from "../utils/google"
import { useRef } from "react"

export default function AddBookForm ( { LIBRARYMODEL, library, user, setLibrary, setUserAction, setFlash, sortMethod, filterMethod } ) {

  const wrapper = useRef()

  async function handleSubmit(e) {

    e.preventDefault()

    let isbn = e.target[0].value
    let bookIsRead = e.target[1].checked

    if (!isbn) {
      setFlash({
        message : 'Please Enter an ISBN',
        type : 'fail'
      })
      return
    }
  
    const userHasBook = library.find( (book) => {
      return book.isbn === isbn
    } )

    if(userHasBook) {
      setFlash({
        message : `This book is already in your Library.`,
        type : 'fail',
        link : `#${isbn}`,
        linkText : 'View Book >'
      })
      return
    }
  

    const googleResponse = await getGoogleBookInfo(isbn)

    if (!googleResponse) return 'Error fetching book data from Google API'

    let cover
    try {
      cover = googleResponse.imageLinks.thumbnail
    } catch (err) {
      cover = false
    }

    const newBook = {
      isbn,
      bookIsRead,
      cover,
      date : new Date().valueOf(),
      title : googleResponse.title,
      author : googleResponse.authors[0],
      pages : googleResponse.pageCount,
      userId : user.id,
    }

    // Add Book to DB. If 'duplicate' is returned let the user know the book was already added
    if (await LIBRARYMODEL.addBook(newBook) === 'duplicate') {
      setFlash({
        message : `${googleResponse.title} is already in your library. (ISBN# ${isbn})`, 
        type : 'fail',
        link : `#${isbn}`,
        linkText : 'View Book'
      })
      return
    }

    // Update Library in UI
    const updatedLibrary = await LIBRARYMODEL.getLibrary(user.id, sortMethod, filterMethod)
    setLibrary(updatedLibrary)

    // Close Add Book Form
    // toggleShowAddBookForm(!showAddBookForm)
    setUserAction(false)

    // Update flash message
    setFlash({
      message : `${ googleResponse.title } Added Successfully`,
      type : 'success',
      link : `#${ isbn }`,
      linkText : 'View Book'
    })

  }


  return(
  <div className="user-actions-modal slide-down" ref={ wrapper }>

    <button
      className="btn btn-close-user-action"
      onClick={ (e) => {
        // console.log(e.target, 'eve')
        wrapper.current.classList.remove('slide-down')
        wrapper.current.classList.add('slide-down-exit')
        setTimeout( () => {
          setUserAction(false) 
        }, 500)
      }} 
    >
      Close
    </button>

    <h2 className="mb2">Add A New Book</h2>

    <form onSubmit={ handleSubmit }>

      <label className="mb3">
          Isbn:

        <input type="text" name="isbn" className="user-actions-input ml1" />
      </label>

      <div className="mb1">
        Have you read this book yet?
      </div>

      <div>
        <label className="mb1 mr1">
            <input type="radio" name="read" value="true" className="user-actions-input" />
            Yes 
        </label>

        <label>
            <input type="radio" name="read" value="false" className="user-actions-input" />
            No
        </label>
      </div>

      <input type="submit" value="Add Book" className="mt1 btn btn-pri" />

    </form>
  
  </div>

  )
}