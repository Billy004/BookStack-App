import UserModel from "../model/UserModel"

export default function SignUp({ setFlash }) {

  const USERMODEL = new UserModel()

  async function handleSignUp(e) {
    e.preventDefault()

    const email = e.target[0].value
    const password = e.target[1].value
    const confirmPassword = e.target[2].value
    
    if (password !== confirmPassword) {
      setFlash({
        message : 'The two password entries do not match',
        type : 'fail'
      })
      return
    }

    const response = await USERMODEL.signUp(email, password)
    const isSignedUp = await response.text()

    if(isSignedUp && (isSignedUp !== 'duplicate')) {
      setFlash({
        message : `${isSignedUp}, you have successfully signed up to BookStack!`,
        type : 'success'
      })
    } else if (isSignedUp === 'duplicate') {
      setFlash({
        message : 'This email is already registered. Try another email',
        type : 'fail'
      })
    } else {
      setFlash({
        message : 'Something went wrong',
        type : 'fail'
      })
    }


  }

  return(
  <div className="content-wrapper">
  
  <>
      <h3>Sign Up:</h3>

      <form onSubmit={ handleSignUp } >
        
        <label>
          Email<br />
          <input type="text" name="name" />
        </label>
        
        <label>
          Password<br />
          <input type="password" name="password" />
        </label>

        <label>
          Confirm Password<br />
          <input type="password" name="confirmPassword" />
        </label>

        <input type="submit" value="Sign Up" className="btn btn-pri" />

      </form>
    </>
  
  </div>

  )
}