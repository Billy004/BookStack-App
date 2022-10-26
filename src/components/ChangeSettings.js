import UserModel from "../model/UserModel"


export default function ChangeSettings ({user, sortMethod, setSortMethod, filterMethod,setFilterMethod}) {

  const baseStyle = {
    marginInline : '1rem',
    padding : '1rem',
    border : '1px solid #ddd',
    borderRadius : '1rem',
  }

  const USERMODEL = new UserModel()

  async function handleMethodChange(setting, value) {

    await USERMODEL.toggleUserSetting(user.id, setting, value)

    switch (setting) {
      case ('sort'): setSortMethod(value); break
      case ('filter'): setFilterMethod(value); break
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