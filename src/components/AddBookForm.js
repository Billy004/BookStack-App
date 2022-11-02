
import { useRef } from "react"

export default function AddBookForm ( { LIBRARYMODEL, library, user, setLibrary, setUserAction, setFlash, sortMethod, filterMethod } ) {

  const wrapper = useRef()

    

  async function handleSubmit(e) {
    e.preventDefault()

    // Attempt to add book
    const response = await LIBRARYMODEL.addBook({
        isbn : e.target[0].value,
        bookIsRead : e.target[1].checked,
        userId : user.id,
        library
    })

    if(!response.error) { // Successfully added book

      // Update library state and UI
      const updatedLibrary = await LIBRARYMODEL.getLibrary({
        userId : user.id,
        sortMethod, 
        filterMethod
      })
      setLibrary(updatedLibrary)
  
      // Close Add Book Form
      setUserAction(false)
  
      // Update flash message
      setFlash({
        message : `${ response.title } Added Successfully`,
        type : 'success',
        link : `#${ e.target[0].value }`,
        linkText : 'View Book'
      })

    } else { // Failure adding book

      const errorMsg = {
        noIsbn : 'Please Enter a 10 or 13 digit ISBN. Only letters and numbers are allowed.',
        userHasBook : 'This book is already in your library.',
        googleFailure : 'Something went wrong with Google\'s API.',
        noBookFound : 'This book doesn\'t exist on Google\'s API.',
        tryCatchFailure : 'Something went wrong with fetching data for this book.' 
      } 

      setFlash({
        message : errorMsg[response.error],
        type : 'fail'
      })
      
    }
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