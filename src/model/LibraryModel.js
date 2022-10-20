export default class LibraryModel {

  constructor() {

  }

  async getLibrary() {

    try {

      const data = await fetch('http://localhost:81/projects/BookStack-App/bookstack-app/php/api/library.php?action=getLibrary')

      let books = await data.json()
      return books
      // return data
    } catch(err) {
        return err
    }
  }

  async addBook(data) {

    // TODO Check if book is already added

    const requestOptions = {
      method : 'POST',
      headers : { 'Content-Type': 'application/json' },
      body : JSON.stringify(data)
    }

    const googleResponse = await fetch('http://localhost:81/projects/BookStack-App/bookstack-app/php/api/Library.php?action=addBook', requestOptions)
    const result = await googleResponse.json()
  }


}