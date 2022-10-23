
export default function ChangeSettings ({sortMethod, setSortMethod, filterMethod,setFilterMethod}) {

  const baseStyle = {
    marginInline : '1rem',
    padding : '1rem',
    border : '1px solid #ddd',
    borderRadius : '1rem',
  }

  function handleMethodChange(method, param) {
    switch (method) {
      case 'sort': setSortMethod(param); break
      case 'filter': setFilterMethod(param); break
      default:
    }
  }

  return(
  <div style={ baseStyle }>
    {sortMethod } - 
    {filterMethod }
  
    <h2>Change Settings</h2>

    <div>
      <h3>Sort by:</h3>

      <button onClick={ () => handleMethodChange('sort', 'title') }>
        Title
      </button>

      <button onClick={ () => handleMethodChange('sort', 'author') }>
        Author
      </button>

      <button onClick={ () => handleMethodChange('sort', 'newFirst') }>
        Date Added (Newest to Oldest)
      </button>

      <button onClick={ () => handleMethodChange('sort', 'oldFirst') }>
        Date Added (Oldest to Newest)
      </button>

    </div>

    <div>
      <h3>Filter by:</h3>

      <button onClick={ () => handleMethodChange('filter', 'read') }>
        Read
      </button>

      <button onClick={ () => handleMethodChange('filter', 'notRead') }>
        Not Read
      </button>

      <button onClick={ () => handleMethodChange('filter', 'all') }>
        All
      </button>
    </div>
  
  </div>

  )
}