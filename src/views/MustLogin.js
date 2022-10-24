import { Link } from "react-router-dom"

export default function MustLogin() {

  const usersStyle = {
    padding : '5rem 1rem',
  }

  return(
  <div style={ usersStyle }>
  
    <div>
      <h2 className="mb1">Please Log In</h2>

      <p>
        You must be <Link to="/">logged in</Link> to view your library.
      </p>
    </div>
  
  </div>

  )
}