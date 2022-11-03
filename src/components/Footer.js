import { Style } from "react-style-tag"

export default function Footer ({ user }) {

  return(
    <>
  <Style>{`
    .footer {
      padding-block : 2rem;
      background-color : hsl( var(--clr-pri-ex-dark) );
      color : #fff;
      border-radius : 0.3rem;
      text-align : center;
    }
  
  `}</Style>

  <div className="footer">
    {
    user && <p>Logged in as {user.email}</p>
    }
    Made By Josh =)
  
  </div>
  </>
  )
}