
function App() {


  async function getStuff() {
    try {

      const data = await fetch('http://localhost:81/projects/BookStack-App/bookstack-app/php/models/library.php')

      let books = await data.json()
      
      console.log(books)

      return data
      // return data
    } catch(err) {
        return false
    }

  }

  getStuff()


  return (
    <div className="App">
        {/* {stuff} */}
    </div>
  );
}

export default App;
