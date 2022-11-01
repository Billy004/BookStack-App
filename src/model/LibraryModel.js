export default class LibraryModel {

  // joshkaye.ca
  // URLROOT = '/projects/bookstack-app/php/api/Library.php'

  // localhost
  URLROOT = 'http://localhost:80/projects/BookStack-App/bookstack-app/php/api/Library.php'

  async getLibrary(userId, sortMethod, filterMethod) {
    try {

      const data = await fetch(`${this.URLROOT}?action=getLibrary&query=${userId}&sort=${sortMethod}&filter=${filterMethod}`)

      let books = await data.json()
      
      return books
      // return data
    } catch(err) {
        return err
    }
  }




  async addBook(data) {
    // Called by handleAddBook im <AddBookForm />. userHasBook already checked.
    const requestOptions = {
      method : 'POST',
      headers : { 'Content-Type': 'application/json' },
      body : JSON.stringify(data)
    }

    await fetch(`${this.URLROOT}?action=addBook`, requestOptions)

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