export default class UserModel {

  async login(email, pass) {

    const data = {
      'email' : email,
      'password' : pass,
    }

    const requestOptions = {
      method : 'POST',
      headers : { 'Content-Type': 'application/json' },
      body : JSON.stringify(data)
    }

    const response = await fetch('http://localhost:81/projects/BookStack-App/bookstack-app/php/api/Users.php?action=login', requestOptions)
   
    return response
  }


  logout(userId) {
    // Placeholder
  }

}