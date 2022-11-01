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
    What started out as a javascript file to learn how to use arrays, has become a full-stack custom web app!
  </p>

  <p style={ pStyle }>
    BookStack is a custom Full-Stack web app that I programmed from the ground up as a portfolio project. It features a front-end UI made with <strong>React</strong>, and a backend with <strong> PHP and MYSQL</strong>. You can also <a href="https://github.com/kaye360/BookStack-App" target="_blank" rel="noreferrer">View the Github repo.</a>
  </p>

  <p style={ pStyle }>
    When an ISBN is addded, the data is fetched from the <strong>Google Books API</strong>, and the title, author, and other details are added to the database. Also, when a book is clicked on, more information is fetched from the Google Books API.
  </p>

  <p style={ pStyle }>
    Each user can sign up, log in/out, add books, and sort/filter/search their own personal library. New features and upgrades are constantly being added.
  </p>
  
  </div>

  )
}