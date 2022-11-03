import { Style } from "react-style-tag"

export default function About () {


  return(
  <>
  <Style>{`
    .about {
      padding : 1rem;
    }

    .about p {
      margin-bottom : 1.7rem;
      max-width : 60ch;
      line-height : 1.7rem;
    }
  `}
  </Style>

  <div className="about">
  
  <p>
    <strong>Version number 1.1.0</strong>
  </p>

  <p>
    What started out as a javascript file to learn how to use arrays, has become a full-stack custom web app!
  </p>

  <p>
    BookStack is a custom Full-Stack web app that I programmed from the ground up as a portfolio project. It features a front-end UI made with <strong>React</strong>, and a backend with <strong> PHP and MYSQL</strong>. You can also <a href="https://github.com/kaye360/BookStack-App" target="_blank" rel="noreferrer">View the Github repo.</a>
  </p>

  <p>
    When an ISBN is addded, the data is fetched from the <strong>Google Books API</strong>, and the title, author, and other details are added to the database. Also, when a book is clicked on, more information is fetched from the Google Books API.
  </p>

  <p>
    Each user can sign up, log in/out, add books, and sort/filter/search their own personal library. New features and upgrades are constantly being added.
  </p>
  
  </div>

  </>
  )
}