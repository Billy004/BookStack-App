export default class UserModel {

  URLROOT = 'http://localhost:81/projects/BookStack-App/bookstack-app/php/api/Users.php'

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

    const response = await fetch(`${this.URLROOT}?action=login`, requestOptions)
   
    return response
  }


  logout(userId) {
    // Placeholder
  }


  async signUp(email, pass) {
    const data = {
      'email' : email,
      'password' : pass,
    }

    const requestOptions = {
      method : 'POST',
      headers : { 'Content-Type': 'application/json' },
      body : JSON.stringify(data)
    }

    const response = await fetch(`${this.URLROOT}?action=signUp`, requestOptions)
   
    return response
  }

}