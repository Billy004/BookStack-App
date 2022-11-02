import { useEffect } from "react"
import { Style } from "react-style-tag"

export default function FlashMsg ({ flash, setFlash }) {
  
  useEffect( () => {
    const flashTimer = setTimeout( () => {
      setFlash(false)
    }, 6000)

    return () => clearTimeout(flashTimer)
  }, [setFlash])


  return(
  <>
  <Style>
  {`
    .flash-wrapper {
      content : '';
      position: fixed;
      top : 0;
      left : 0;
      width : 100vw;
      height : 100vh;
      z-index: 999;
      /* background-color : hsla(0, 0%, 0%, 0.6); */
      background-color : hsla( var(--clr-pri-ex-dark), 0.8 );
    }

    .flash {
      position : fixed;
      inset : 50% 10vw auto 10vw;
      z-index : 999;
      transform : translateY(-50%);
      display : flex;
      justify-content : space-between;
      align-items : center;
      padding : 1rem;
      background-color : ${ flash.type === 'success' ? '#C8FCDA' : 'hsl( var(--clr-sec) )' };
      border : 1px solid  ${ flash.type === 'success' ? '#079236' : 'hsl( var(--clr-sec-dark) )' };
      border-radius : 0.5rem;
    }

    .flash-message {
      display : inline-block;
      margin-right : 1rem;
    }
  `}
  </Style>


  <div className="flash-wrapper">
    <div className={ flash.type === 'success' ? 'flash fade-out' : 'flash fade-out' }>
    
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
  </>

  )
}