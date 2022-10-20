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


}