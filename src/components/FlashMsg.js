import { useEffect } from "react"

export default function FlashMsg ({ flash, setFlash }) {

  let bgClr = '#ddd'
  let borderClr = '#666'

  if (flash.type === 'success') {
    bgClr = '#C8FCDA'
    borderClr = '#079236'
  }

  if (flash.type === 'fail') {
    bgClr = 'hsl( var(--clr-sec) )'
    borderClr = 'hsl( var(--clr-sec-dark) )';
  }

  const flashStyle = {
    display : 'flex',
    justifyContent : 'space-between',
    alignItems : 'center',
    width : '100%',
    padding : '1rem',
    backgroundColor : bgClr,
    border : '1px solid ' + borderClr,
    borderRadius : '0.5rem',
  }
  
  const flashMsgStyle = {
    display : 'inline-block',
    marginRight : '1rem',
  }

  const closeBtnStyle ={ 
    padding : '0.5rem',
    backgroundColor : 'transparent',
    border : '0',
    outline : '0',
    cursor : 'pointer',
  }

  useEffect( () => {
    const flashTimer = setTimeout( () => {
      setFlash(false)
    }, 6000)

    return () => clearTimeout(flashTimer)
  }, [setFlash])


  return(
  <div style={ flashStyle } className="mt1 fade-out ">
  
    <div>
      <span style={ flashMsgStyle }>
        { flash.message } 
      </span>
      { flash.link && flash.linkText && <a href={ flash.link }>{ flash.linkText }</a> }
    </div>

    <div>
      <button onClick={ () => setFlash(false) } style={ closeBtnStyle } >
        ✖
      </button>
    </div>
  </div>

  )
}