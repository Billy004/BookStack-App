
// Take isbn and request book info from Google Books API

export async function getGoogleBookInfo(isbn) {
  try {
      const google = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=AIzaSyDMCCAwAVRo5YHS07hVrUDtBCzx1VPEcTo`)
      
      const data = await google.json()
      
      return data.items[0].volumeInfo
      // return data
  } catch(err) {
      return false
  }

}