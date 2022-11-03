import UserModel from "../model/UserModel";
import { Link } from "react-router-dom";
import { Style } from "react-style-tag";
import Logo from "../components/Logo";
import heroImg from '../img/hero-img.png'

export default function Home({user, setUser, setFlash}) {


  // User DB functions
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

    } else {

      setFlash({ 'message' : 'Login Attempt Failed. Please check username and password.', 'type' : 'fail' })

    }
  }

  return(

<>
<Style>{`
  .home-wrapper {
    display : grid;
    grid-template-columns: 1fr 0.75fr;
    gap : 1rem;
    min-height: 80vh;
    padding : var(--padding-x-default); 
  }

  .hero h1 {
    margin-top : 0;
  }

  .hero-wrapper {
    padding : 2rem var(--padding-x-default);
    background-color: hsla(0, 0%, 100%, 0.7);
    border-radius: 10px;
  }

  .hero > .logo {
    margin-bottom : 2rem;
  }

  .hero-welcome {
    margin-bottom : 3rem;
  }

  .hero-img {
    background-position: center bottom;
    background-size: cover;
    background-repeat: no-repeat;
  }
`}
</Style>

<section className="home-wrapper">

  <div className="hero">

    <Logo />

    <div className="hero-wrapper">


      {
        !user &&

        <div className="hero-welcome">

          <h1>Organize Your Books!</h1>

          <p>
          Keep track of your personal library with BookStack. This app stores your entire book collection (inlcuding books you haven't read yet) in a digital format. 
          </p>

          <Link to="/about">
            <button className="btn btn-sec">Learn More</button>
        </Link>

      </div>
      }

     


      {
      user ?
      <>
      <h2>Welcome to BookStack!</h2>
      <p>
        You are logged in as:
      </p>
      <p>
        <span className="bold">
          {user.email} 
        </span>

        <button 
          className="btn"
          onClick={ () => setUser(false) }
        >
          Logout
        </button>
      </p>
      <p>
        
        <Link to="/library">
          <button className="btn btn-pri mr2">
            View your library
          </button>
        </Link>

        <Link to="/library">
            Learn about this app
        </Link>
      </p>
      </>

      :
      <>
        <h2>Log in to your account:</h2>
        <span>Hint: Log in as "guest" with password "123456"</span>

        <form onSubmit={ handleLogin } >
          
          <label>
            Email<br />
            <input type="text" name="name" />
          </label>
          
          <label>
            Password<br />
            <input type="password" name="password" />
          </label>

          <input type="submit" value="Sign In" className="btn btn-pri" />
          
          <Link to="/sign-up">
            <span className="btn btn-ter">...or Sign Up</span>
          </Link>

        </form>
      </>
      }

    </div> {/* hero-wrapper */}
  </div> {/* hero */}
  


  <div className="hero-img" style={{ backgroundImage : `url(${heroImg})` } }>
  </div>





</section>
</>
  )
}