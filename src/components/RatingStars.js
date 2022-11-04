import starFull from '../img/star-full.png'
import starHalf from '../img/star-half.png'
import starEmpty from '../img/star-empty.png'


export default function RatingStars({rating}) {

    if(!rating) return false

    let i = 1
    let stars = []
    let starsFull = 0
    let starsHalf = 0
    let starsEmpty = 0

    //Figure out how many full stars
    starsFull = Math.floor(rating)

    for (i; i <= starsFull; i++) {
        stars[i] = <img src={ starFull } alt={ rating + '/5' } key={i} />
    }

    //Figure out if half star
    if(!Number.isInteger(rating)) {
        starsHalf = 1;
        i++
        stars[i] = <img src={ starHalf } alt={ rating + '/5' } key={i} />
    } 


    //Figure out how many remaining and display as empty
    starsEmpty = 5 - starsFull -starsHalf

    for (let j=1; j <= starsEmpty; j++ ) {
        i++
        stars[i] = <img src={ starEmpty } alt={ rating + '/5' } key={i} />
    }

    return(
      <>{
      stars.map( (star) => {
        return star
      })
      }</>
    )
}
