export default function Footer () {

  const footerStyle = {
    padding : '1rem',
    backgroundColor : '#0F0A44',
    color : '#fff',
    borderRadius : '0.3rem',
    textAlign : 'center',
  }

  return(
  <div style={ footerStyle }>
  
    You have X total pages in your library <br />
    Made By Josh =)
  
  </div>

  )
}