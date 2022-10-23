import { Link } from 'react-router-dom'

export default function Header({ user }) {

  const userStyle = {
    textAlign : 'right',
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

  let linkStyle = {
    textDecoration : 'none',
    color : '#fff',
  }

  return(
    <>
      <div style={ userStyle }>
        {
        user &&
          `Logged in as: ${user.email}`
        }
      </div>
    
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
    </>

  )



}