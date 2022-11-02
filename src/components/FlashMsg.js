import { useEffect } from "react"

export default function FlashMsg ({ flash, setFlash }) {
  
  // useEffect( () => {
  //   const flashTimer = setTimeout( () => {
  //     setFlash(false)
  //   }, 6000)

  //   return () => clearTimeout(flashTimer)
  // }, [setFlash])


  return(
  <div className="flash-wrapper">
    <div className={ flash.type === 'success' ? 'flash flash-success afade-out' : 'flash flash-fail afade-out' }>
    
      <div>
        <span className="flash-message">
          { flash.message } 
        </span>
        { flash.link && flash.linkText && <a href={ flash.link }>{ flash.linkText }</a> }
      </div>

      <div>
        <button onClick={ () => setFlash(false) } className="close-btn" >
        ✖
        </button>
      </div>
    </div>
  </div>

  )
}