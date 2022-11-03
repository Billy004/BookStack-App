import { useRef } from "react";
import { Style } from "react-style-tag";
import UserModel from "../model/UserModel"


export default function ChangeSettings ({user, sortMethod, setSortMethod, filterMethod,setFilterMethod, setUserAction}) {

  const wrapper =useRef()

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
    <>

    <Style>{`
      .change-settings{
        position : relative;
        padding : 1rem;
        border-radius: 10px;
        background-color: hsl(210, 130%, 98%);
      }
  
      .change-settings-isOpening {
        animation: expand-down 500ms cubic-bezier(.17,.67,.57, .96) both; overflow: hidden;
      }
  
      .change-settings-isClosing {
        animation: expand-down-exit 400ms cubic-bezier(.17,.67,.57, .96) both; overflow: hidden;
      }
  

      .user-actions-input {
        display : inline-block;
      }
        
    .setting, .setting-active {
      display : inline-block;
      padding : 0.5rem 1rem;
      margin-right : 1rem;
      background: transparent;
      font-weight: 600;
      cursor: pointer;
    }

    .setting-active {
      background-color: hsl( var(--clr-sec) );
      border-radius: 5px;
    }
  `}</Style>

  <div className="change-settings change-settings-isOpening" ref={ wrapper }>  

  <button
      className="btn btn-close-user-action"
      onClick={ (e) => {
        // console.log(e.target, 'eve')
        wrapper.current.classList.remove('change-settings-isOpening')
        wrapper.current.classList.add('change-settings-isClosing')
        setTimeout( () => {
          setUserAction(false) 
        }, 500)
      }} 
    >
      Close
    </button>

    <h2>Change Settings</h2>

    <div>
      <h3>Sort Library by:</h3>

      <button 
        onClick={ () => handleMethodChange('sort', 'title') }
        className={ sortMethod === 'title' ? 'setting-active' : 'setting' }
      >
        Title
      </button>

      <button 
        onClick={ () => handleMethodChange('sort', 'author') }
        className={ sortMethod === 'author' ? 'setting-active' : 'setting' }
      >
        Author
      </button>

      <button 
        onClick={ () => handleMethodChange('sort', 'newFirst') }
        className={ sortMethod === 'newFirst' ? 'setting-active' : 'setting' }
      >
        Date Added (Newest to Oldest)
      </button>

      <button 
        onClick={ () => handleMethodChange('sort', 'oldFirst') }
        className={ sortMethod === 'oldFirst' ? 'setting-active' : 'setting' }
      >
        Date Added (Oldest to Newest)
      </button>

    </div>

    <div>
      <h3>Filter by:</h3>

      <button 
        onClick={ () => handleMethodChange('filter', 'read') }
        className={ filterMethod === 'read' ? 'setting-active' : 'setting' }
      >
        Read
      </button>

      <button 
        onClick={ () => handleMethodChange('filter', 'notRead') }
        className={ filterMethod === 'notRead' ? 'setting-active' : 'setting' }
      >
        Not Read
      </button>

      <button 
        onClick={ () => handleMethodChange('filter', 'all') }
        className={ filterMethod === 'all' ? 'setting-active' : 'setting' }
      >
        All
      </button>
    </div>
  
  </div>
  </>
  )
}