export default function Book ({title, author, isbn}) {

  const bookStyle = {
    padding : '1rem',
    border : '1px solid #333',
    borderRadius : '0.5rem',
  }

  return(
  <div style={ bookStyle }>
  
    <div>
      {title}
    </div>
  
    <div>
      {author}
    </div>

    <div>
      {isbn}
    </div>
  
  </div>

  )
}