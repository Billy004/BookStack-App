import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'

export default function Header({ user, setUser }) {

  function loseFocus() {
    document.activeElement.blur()
  }
  
  const currentPage = useLocation().pathname

  return(
    <>
    {
    currentPage !== '/' &&
    
    <nav>
      
      <Logo />

      <ul className="nav-links">
        <li>
          <Link 
            to="/" 
            className={ currentPage === '/' ? 'active-nav-link' : '' }
            onClick={ loseFocus }
          >
            Home
          </Link>
        </li>
        <li>
          <Link 
            to="/library" 
            className={ currentPage.includes('/library') && 'active-nav-link' }
            onClick={ loseFocus }
          >
            Library
          </Link>
        </li>
        <li>
          <Link 
            to="/about"
            className={ currentPage.includes('/about') && 'active-nav-link' }
            onClick={ loseFocus }
          >
            About
          </Link>
        </li>
        {
        user ?
        <>
        <li><span className="bold">{ user.email }</span></li>
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