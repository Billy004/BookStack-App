import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'
import { Style } from 'react-style-tag'

export default function Header({ user, setUser }) {

  function loseFocus() {
    document.activeElement.blur()
  }
  
  const currentPage = useLocation().pathname

  return(
    <>
    <Style>{`
      .logged-in {
        text-align: right;
      }
      
      nav {
        padding-block : 1rem;
        display : flex;
        justify-content: space-between;
        align-items: center;
        width : 100%;
        font-family: var(--style-font);
      }
      

      
      .nav-links { 
        position: fixed;
        z-index : 999;
        inset : auto 0 0 0;
        display : flex; 
        align-items: center;
        list-style-type: none;
      
        background-color: hsl(var(--clr-pri));
      }
      
      nav li a {
        font-weight: 600;
        color : #fff;
      }
      
      .active-nav-link {
        border-bottom : 2px solid hsl(var(--clr-pri));
      }
      
      @media screen and (min-width : 600px) {
        .nav-links { 
          position: static;
          background : transparent;
          gap : 1.5rem;
        }
        
        nav li a {
          color : #333;
        }
      }
    `}</Style>

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
            className={ currentPage.includes('/library') ? 'active-nav-link' : undefined }
            onClick={ loseFocus }
          >
            Library
          </Link>
        </li>
        <li>
          <Link 
            to="/about"
            className={ currentPage.includes('/about') ? 'active-nav-link' : undefined }
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