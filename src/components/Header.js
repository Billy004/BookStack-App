import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'
import { Style } from 'react-style-tag'
import { useState } from 'react'

export default function Header({ user, setUser }) {

  function loseFocus() {
    document.activeElement.blur()
  }

  const currentPage = useLocation().pathname

  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(true)

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
        padding-block : 1rem;

        display : flex; 
        justify-content : space-around;
        align-items: center;
        
        list-style-type: none;
      
        border-top : 2px solid #bbb;
        background-color : hsl(0, 0%, 100%, 0.97);
      }
      
      nav li a {
        font-weight: 600;
        color : #333;
      }
      
      .active-nav-link {
        border-bottom : 2px solid hsl(var(--clr-pri));
      }

      .nav-user {
        font-weight : bold;
      }
      
      .mobile-menu-hidden {
        display : none;
      }

      .mobile-menu-visible {
        display : block;
      }

      .mobile-menu-isOpen {
        position : absolute;
        bottom : 100%;

        display : grid;
        align-items : center;

        width : 50%;
        height : 15vh;
        padding : 1rem;
        background-color : hsl(0, 0%, 100%, 0.95);
      }
      
      .nav-user-li {
        left : 0;
        text-align : right;
      }
      
      .nav-logout-li {
        right : 0;
      }
      
      @media screen and (min-width : 600px) {
        
        .nav-links { 
          position: relative;
          background : transparent;
          gap : 1.5rem;
          border : 0;
        }
        
        .mobile-menu-hidden {
          display : block;
        }
  
        .mobile-menu-visible {
          display : none;
        }
        
        .mobile-menu-isOpen {
          position : relative;
          bottom : 0;
          display : block;
          width : auto;
          height : auto;
          padding : 0;
          background : transparent;
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
          
          <li className={ mobileMenuIsOpen ? 'mobile-menu-isOpen nav-user-li' : 'mobile-menu-hidden' }>
            <span className="nav-user">{ user.email }</span>
          </li>
          <li className={ mobileMenuIsOpen ? 'mobile-menu-isOpen nav-logout-li' : 'mobile-menu-hidden' }>
            <button className="btn btn-sec" onClick={ () => setUser(false) }>Log Out</button>
          </li>
          <li className="mobile-menu-visible">
            <button className="mobile-menu-icon" onClick={ () => { setMobileMenuIsOpen(!mobileMenuIsOpen) } }>|||</button>
          </li>
          </>
        : <li><Link to="/sign-up" >Sign Up</Link></li>
        }
      </ul>

    </nav>
    }
    </>

  )



}