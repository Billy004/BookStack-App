import { Style } from 'react-style-tag'
import logo from '../img/logo.png'

export default function Logo() {

  return(
    <>
    <Style>{`
      .logo {
        display : flex;
        align-items: center;
        gap : 0.3rem;
        font-size: 1.7rem;
        pointer-events: none;
      }
      
      .title {
        font-weight : 600;
      }
    `}</Style>
    
    <div className="logo">
      <img src={ logo } alt="BookStack Logo" />
      <span className="title">BookStack</span>
    </div>
    </>

  )
}