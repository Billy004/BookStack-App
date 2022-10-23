import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { getGoogleBookInfo } from "../utils/google"
import imageNotAvailable from '../img/image-not-available.svg'
import LoadingSpinner from "../components/LoadingSpinner"

export default function MoreBookInfo () {

  const baseStyle = {
    display : 'flex',
    flexWrap : 'wrap',
    justifyContent :  'center',
    gap : '1rem',
    padding : '1rem',
    backgroundColor : '#fff',
  }

  const backStyle = {
    width : '100%',
    marginBlock : '1rem',
  }

  const coverImageWrapperStyle = {
    width : '30%',
    maxWidth : '300px',
  }

  const coverImageStyle = {
    width : '100%',
  }
  
  const contentStyle = {
    width : '60%',
  }

  let isbn = useParams().isbn

  const [book, setBook] = useState([])
  
  useEffect( () => {
    async function getBook() {
      const request = await getGoogleBookInfo(isbn)
      setBook(request)
    }
    getBook()
  }, [isbn])

  const {
    averageRating,
    categories, 
    description,
    pageCount,
    publishedDate,
    publisher,
    ratingsCount,
    subtitle,
    title, 
  } = book

  const cover = book.imageLinks ? book.imageLinks.smallThumbnail : imageNotAvailable

  let authors =''
  if (book.authors !== undefined) book.authors.forEach( author => authors += `${author}, `)
  authors = authors.slice(0, -2)


  
  return(
  <div style={ baseStyle }>

    {book.length === 0 && <LoadingSpinner /> } 

    <div style={ backStyle }>
      <Link to="/library">Back to Library</Link>
    </div>

    <div style={ coverImageWrapperStyle }>
      <img src={ cover } style={ coverImageStyle }/>
    </div>

    <div style={ contentStyle }>

      <h2>
        <span>{title}</span>
        <span>{subtitle}</span>
      </h2>

      <span>By: {authors}</span>
      <span>{categories}</span>

      <p>{description}</p>

      <span>{pageCount} Pages</span>

      <span>{averageRating} / 5 with {ratingsCount} ratings</span>

    </div>
  
  </div>

  )
}