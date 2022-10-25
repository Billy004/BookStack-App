export default class LibraryModel {

  URLROOT = 'http://localhost:81/projects/BookStack-App/bookstack-app/php/api/library.php'

  async getLibrary(userId) {
    try {

      const data = await fetch(`${this.URLROOT}?action=getLibrary&query=${userId}`)

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



  async deleteBook(id) {
    try {
      const deletedBook = await fetch(`${this.URLROOT}?action=deleteBook&query=${id}`) 
      
      if (deletedBook.status === 200) return true

    } catch (error) {
      return false
    }
  }



  async searchLibrary(query) {

    try {
      const searchResults = await fetch(`${this.URLROOT}?action=searchLibrary&query=${query}`)

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