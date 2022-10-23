
import { getGoogleBookInfo } from "../utils/google"

export default function AddBookForm ( { LIBRARYMODEL, setLibrary, userAction, setUserAction, setFlash } ) {

  const addBookStyle = {
    marginInline : '1rem',
    padding : '1rem',
    border : '1px solid #ddd',
    borderRadius : '1rem',
  }

  const labelStyle = {
    display : 'block',
  }

  const submitStyle = {
    padding : '1rem 2rem',
    backgroundColor : '#E6B2B2',
    border : '2px solid #571D1D',
    borderRadius : '0.5rem',
    fontWeight : '600',
    cursor : 'pointer',
  }

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
      userId : 1,
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
    const updatedLibrary = await LIBRARYMODEL.getLibrary()
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
  <div style={ addBookStyle } className="slide-down">

    <h2 className="mb2">Add A New Book</h2>

    <form onSubmit={ handleSubmit }>

      <label style={ labelStyle } className="mb3">
        <span>
          Isbn:
        </span>

        <input type="text" name="isbn" className="ml1" />
      </label>

      <div className="mb1">
        Have you read this book yet?
      </div>

      <label style={ labelStyle } className="mb1">
          <input type="radio" name="read" value="true" className="mr1" />
          Yes 
      </label>

      <label style={ labelStyle }>
          <input type="radio" name="read" value="false" className="mr1" />
          No
      </label>

      <input type="submit" value="Add Book" style={ submitStyle } className="mt3" />

    </form>
  
  </div>

  )
}