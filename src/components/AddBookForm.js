
import { getGoogleBookInfo } from "../utils/google"

export default function AddBookForm ( { LIBRARYMODEL, setLibrary, showAddBookForm,toggleShowAddBookForm, setFlash } ) {

  const addBookStyle = {
    padding : '1rem',
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

    await LIBRARYMODEL.addBook(newBook)

    const updatedLibrary = await LIBRARYMODEL.getLibrary()
    setLibrary(updatedLibrary)

    toggleShowAddBookForm(!showAddBookForm)

    setFlash({message : `${googleResponse.title} Added Successfully`, type : 'success'})

  }

  return(
  <div style={ addBookStyle }>

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