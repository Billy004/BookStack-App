import { Style } from "react-style-tag"

export default function EmptySearchMsg () {

  return(
  <>
  <Style>{`
    .empty-search-msg {
      padding : 1rem;
    }
  `}</Style>
  
  <div className="empty-search-msg">
  
    No Results found
  
  </div>
  </>

  )
}