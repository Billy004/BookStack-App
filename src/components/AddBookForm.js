
import { getGoogleBookInfo } from "../utils/google"
import { useRef } from "react"

export default function AddBookForm ( { LIBRARYMODEL, library, user, setLibrary, setUserAction, setFlash, sortMethod, filterMethod } ) {

  const wrapper = useRef()

  async function handleSubmit(e) {
    
    e.preventDefault()
    

    // Get Form Data and Set Variables
    let isbn = e.target[0].value
    let bookIsRead = e.target[1].checked
    
    
    // Check if ISBN is entered
    if (!isbn) {
      setFlash({
        message : 'Please Enter an ISBN',
        type : 'fail'
      })
      return
    }
    
    // Check if book is already in the users library
    const userHasBook = library.find( book => book.isbn === isbn )
    
    if(userHasBook) {
      setFlash({
        message : `This book is already in your Library.`,
        type : 'fail',
        link : `#${isbn}`,
        linkText : 'View Book >'
      })
      return
    }
  
    // Get book data from google
    let res
    try {
      res = await getGoogleBookInfo(isbn)
    } catch (error) {
      console.log(error)
      return 'Error fetching book data from Google API'
    }

    // Check if book has cover (some dont)
    let cover = (res.imageLinks !== undefined) ? res.imageLinks.thumbnail : false


    // Add book entry to DB
    const newBook = {
      isbn,
      bookIsRead,
      cover,
      date : new Date().valueOf(),
      title : res.title,
      author : res.authors[0],
      pages : res.pageCount,
      userId : user.id,
    }

    await LIBRARYMODEL.addBook(newBook)

    // Update Library in UI
    const updatedLibrary = await LIBRARYMODEL.getLibrary(user.id, sortMethod, filterMethod)
    setLibrary(updatedLibrary)

    // Close Add Book Form
    setUserAction(false)

    // Update flash message
    setFlash({
      message : `${ res.title } Added Successfully`,
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