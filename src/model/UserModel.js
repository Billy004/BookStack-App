export default class UserModel {

  // joshkaye.ca
  // URLROOT = '/projects/bookstack-app/php/api/Users.php'

  // localhost
  URLROOT = 'http://localhost:80/projects/BookStack-App/bookstack-app/php/api/Users.php'

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

  

  async toggleUserSetting(id, setting, method) {

    const data = {
      'id' : id,
      'setting' : setting,
      'method' : method
    }

    const requestOptions = {
      method : 'POST',
      headers : { 'Content-Type': 'application/json' },
      body : JSON.stringify(data)
    }

    const response = await fetch(`${this.URLROOT}?action=toggleUserSetting`, requestOptions)
   
    return response
  }




  async getUserSettings(id) {
    const response = await fetch(`${this.URLROOT}?action=getUserSettings&query=${id}`)

    return response.json()
  }

}