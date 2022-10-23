import loadingSpinner from '../img/loading-spinner.svg'

export default function LoadingSpinner () {

  const baseStyle = {
    padding : '1rem',
    textAlign : 'center',
  }

  return(
  <div style={ baseStyle }>

    <img src={ loadingSpinner } alt="" />  
      
  </div>

  )
}