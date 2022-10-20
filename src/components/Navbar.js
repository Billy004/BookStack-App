import { Link } from 'react-router-dom'

export default function Navbar () {

  const navStyle = {
    display : 'flex',
    alignItems : 'center',
    width : '100%',
    padding : '1rem',
  }

  const logoStyle = {

  }

  const ulStyle = {
    display : 'flex',
    gap : '1rem',
    marginLeft : 'auto',
    listStyleType : 'none',
  }

  const linkStyle = {
    textDecoration : 'none',
  }

  return(
  <nav style={ navStyle }>
  
    <div style={ logoStyle }>
      BookStack
    </div>

    <ul style={ ulStyle }>
      <li><Link to="/" style={ linkStyle }>Home</Link></li>
      <li><Link to="/library" style={ linkStyle }>Library</Link></li>
      <li><Link to="/about" style={ linkStyle }>About</Link></li>
      <li><Link to="/users" style={ linkStyle }>Users</Link></li>
    </ul>

  
  </nav>

  )



}