import { Link, useLocation } from 'react-router-dom'

export default function Header({ user, setUser }) {

  const userStyle = {
    textAlign : 'right',
    paddingBlock : '0.5rem',
  }

  const navStyle = {
    display : 'flex',
    alignItems : 'center',
    width : '100%',
    padding : '1rem',
    backgroundColor : '#0F0A44',
    color : '#fff',
    borderRadius : '0.3rem',
  }

  const logoStyle = {
    fontSize : '1.7rem',
  }

  const ulStyle = {
    gap : '1rem',
    marginLeft : 'auto',
    listStyleType : 'none',
  }

  const linkStyle = {
    textDecoration : 'none',
    color : '#fff',
  }

  const activeLinkStyle = {
    textDecoration : 'none',
    color : '#fff',
    borderBottom : '2px solid #fff',
  }

  const currentPage = useLocation().pathname

  return(
    <>
      <div style={ userStyle }>
        {
        user &&
        <>
          Logged in as: { user.email } ({user.id})
          <button onClick={ () => setUser(false) } className="ml1">Log Out</button>
        </>
        }
      </div>
    
      <nav style={ navStyle }>
    
        <div style={ logoStyle }>
          BookStack
        </div>

        <ul style={ ulStyle }>
          <li><Link to="/" style={ currentPage === '/' ? activeLinkStyle : linkStyle }>Home</Link></li>
          <li><Link to="/library" style={ currentPage.includes('/library') ? activeLinkStyle : linkStyle }>Library</Link></li>
          <li><Link to="/about" style={ currentPage === '/about' ? activeLinkStyle : linkStyle }>About</Link></li>
          <li><Link to="/users" style={ currentPage === '/users' ? activeLinkStyle : linkStyle }>Users</Link></li>
        </ul>

      </nav>
    </>

  )



}