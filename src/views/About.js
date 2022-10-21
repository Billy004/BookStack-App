export default function About () {

  const aboutStyle = {
    padding : '1rem',
  }

  const pStyle = {
    marginBottom : '1.7rem',
    maxWidth : '60ch',
    lineHeight : '1.7rem',
  }

  return(
  <div style={ aboutStyle }>
  
  <p style={ pStyle }>
    <strong>Version number 1.0.0</strong>
  </p>

  <p style={ pStyle }>
    BookStack is a custom Full-Stack web app that I programmed from the ground up as a portfolio project.
  </p>

  <p style={ pStyle }>
    Users and books are stored in a MYSQL database, which is returned to an API with PHP. React then dynamically access this API to implement basic CRUD operations.
  </p>
  
  </div>

  )
}