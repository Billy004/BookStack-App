import { Link, useLocation } from 'react-router-dom'
import logo from '../img/logo.png'

export default function Header({ user, setUser }) {

  
  const currentPage = useLocation().pathname

  return(
    <>
    {
    currentPage !== '/' &&
    
    <nav>
      
      <div className="logo">
        <img src={ logo } alt="BookStack Logo" />
        <span className="title">BookStack</span>
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/library">Library</Link></li>
        <li><Link to="/about">About</Link></li>
        {
        user ?
        <>
        <li><span class="bold">{ user.email }</span></li>
        <li><button className="btn btn-sec" onClick={ () => setUser(false) }>Log Out</button></li>
        </>
        : <li><Link to="/sign-up" >Sign Up</Link></li>
        }
      </ul>

    </nav>
    }
    </>

  )



}