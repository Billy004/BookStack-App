import { Style } from 'react-style-tag'
import loadingSpinner from '../img/loading-spinner.svg'

export default function LoadingSpinner () {

  return(
  <>
  <Style>{`
    .loading-spinner {
      padding : 1rem;
      text-align : center;
    }
  `}</Style>

  <div className="loading-spinner">

    <img src={ loadingSpinner } alt="Loading Book Info" />  
      
  </div>
  </>
  )
}