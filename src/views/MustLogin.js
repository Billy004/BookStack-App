import { Link } from "react-router-dom"
import { Style } from "react-style-tag"

export default function MustLogin() {

  return(
  <>
  <Style>{`
    .must-login {
      padding : 5rem 1rem;
    }
  `}</Style>

  <section className="must-login">
  
    <div>
      <h2 className="mb1">Please Log In</h2>

      <p>
        You must be <Link to="/">logged in</Link> to view your library.
      </p>
    </div>
  
  </section>
  </>

  )
}