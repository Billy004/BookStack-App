import logo from '../img/logo.png'

export default function Logo() {


  return(
    <div className="logo">
      <img src={ logo } alt="BookStack Logo" />
      <span className="title">BookStack</span>
    </div>

  )
}