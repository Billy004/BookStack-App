import UserModel from "../model/UserModel";
import { Link } from "react-router-dom";

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

  {
    user ?
    <>
    <p>
      You are logged in as {user.email}.
    </p>
    <p>
      <Link to="/library">View your library</Link>
    </p>
    </>

    :
    <>
      <h3>Log in:</h3>

      <form onSubmit={ handleLogin } >
        
        <label style={ labelStyle }>
          Email<br />
          <input type="text" name="name" />
        </label>
        
        <label style={ labelStyle }>
          Password<br />
          <input type="password" name="password" />
        </label>

        <input type="submit" value="Log In" />

      </form>
    </>
  }

  
  
  </div>

  )
}