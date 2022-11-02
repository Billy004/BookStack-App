export default class LibraryModel {

  // joshkaye.ca
  // URLROOT = '/projects/bookstack-app/php/api/Library.php'

  // localhost
  URLROOT = 'http://localhost:80/projects/BookStack-App/bookstack-app/php/api/Library.php'

  async getLibrary({userId, sortMethod, filterMethod}) {
    try {

      const data = await fetch(`${this.URLROOT}?action=getLibrary&query=${userId}&sort=${sortMethod}&filter=${filterMethod}`)

      let books = await data.json()
      
      return books
      // return data
    } catch(err) {
        return err
    }
  }




  async addBook({isbn, bookIsRead, library, userId}) {
    // console.log(`isbn: ${isbn} | bookIsRead : ${bookIsRead} | library : ${library.length}`)

    // Check if isbn is entered
    if (!isbn) return { error : 'noIsbn'}

    // Check if book is already in library
    if( library.find( book => book.isbn === isbn ) ) return { error : 'userHasBook' }

    // Get Book Data from Google. I should probably hide this key =)
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=AIzaSyDMCCAwAVRo5YHS07hVrUDtBCzx1VPEcTo`)

      if (!response.ok) return { error : 'googleFailure' }

      const data = await response.json()

      // Check if book was found in Google API
      if ( data.totalItems === 0 ) return { error : 'noBookFound' }

      // Format New Book Data
      const newBookData = {
        isbn,
        bookIsRead,
        userId,
        cover : (data.items[0].volumeInfo.imageLinks !== undefined) 
                ? data.items[0].volumeInfo.imageLinks.thumbnail 
                : false,
        date : new Date().valueOf(),
        title : data.items[0].volumeInfo.title,
        author : data.items[0].volumeInfo.authors[0],
        pages : data.items[0].volumeInfo.pageCount
      }
        
      // Add to DB
      const requestOptions = {
        method : 'POST',
        headers : { 'Content-Type': 'application/json' },
        body : JSON.stringify(newBookData)
      }

      const dbResponse = await fetch(`${this.URLROOT}?action=addBook`, requestOptions)
      return dbResponse.json()

    } catch (err) {
        console.log(`try/catch error : ${err}`)
        return { error : 'tryCatchFailure' }
    }

  }


  

  async getBook(isbn) {
    const book = await fetch(`${this.URLROOT}?action=getBook&query=${isbn}`)

    return book.json()
  }



  async getBookByUser(userId, isbn) {
    const book = await fetch(`${this.URLROOT}?action=getBookByUser&query=${userId}&isbn=${isbn}`)

    return book.json()
  }



  async deleteBook(id) {
    try {
      const deletedBook = await fetch(`${this.URLROOT}?action=deleteBook&query=${id}`) 
      
      if (deletedBook.status === 200) return true

    } catch (error) {
      return false
    }
  }



  async searchLibrary(query, userId) {

    try {
      const searchResults = await fetch(`${this.URLROOT}?action=searchLibrary&query=${query}&user=${userId}`)

      return searchResults.json()
    } catch (e) {
      console.log(e)
    }
  }




  async toggleReadStatus(id) {
    try {
      await fetch(`${this.URLROOT}?action=toggleReadStatus&query=${id}`)

    } catch (e) {
      console.log(e)
    }
  }
}