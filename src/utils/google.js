
// Take isbn and request book info from Google Books API

export async function getGoogleBookInfo(isbn) {
  try {
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=AIzaSyDMCCAwAVRo5YHS07hVrUDtBCzx1VPEcTo`)
      
      if(res.ok) {
        const data = await res.json()
        return data.items[0].volumeInfo
      } else {
        return 'Error fetching data from google. (In function getGoogleBookInfo)'
      }
      
  } catch(err) {
      return 'Error fetching data from google. (In function getGoogleBookInfo)'
  }

}