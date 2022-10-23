import UserModel from "../model/UserModel";

export default function Home({user, setUser, setFlash}) {

  const homeStyle = {
    padding : '1rem',
  }

  const labelStyle = {
    display : 'block',
    marginBlock : '1rem',
  }

  const USERMODEL = new UserModel()

  async function handleLogin(e) {
    e.preventDefault()
    const email = e.target[0].value
    const pass = e.target[1].value

    const response = await USERMODEL.login(email, pass)
    let isLoggedIn = await response.text()

    console.log(isLoggedIn)

    
    if(isLoggedIn !== "0") {

      isLoggedIn = JSON.parse(isLoggedIn)

      setUser({ 'email' : isLoggedIn.email, 'id' : isLoggedIn.id })
      
      setFlash({ 'message' : `Logged in as ${isLoggedIn.email}`, 'type' : 'success' })

    } else {

      setFlash({ 'message' : 'Login Attempt Failed. Please check username and password.', 'type' : 'fail' })

    }
  }

  return(
  <div style={ homeStyle }>
  
  <h1>Welcome to BookStack!</h1>
  <h2>Keep your Books organized</h2>

  <h3>Log in:</h3>

  <form onSubmit={ handleLogin } >
    
    <label style={ labelStyle }>
      Email<br />
      <input type="text" name="name" />
    </label>
    
    <label style={ labelStyle }>
      Password<br />
      <input type="password" name="name" />
    </label>

    <input type="submit" value="Log In" />

  </form>
  
  </div>

  )
}