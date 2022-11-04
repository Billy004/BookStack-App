# BookStack
## Keep Track of your book library!
### Version number 1.1.0

BookStack is a custom Full-Stack web app that I programmed from the ground up as a portfolio project.
View the project here:
https://joshkaye.ca/projects/bookstack-app/build

Users and books are stored in a MYSQL database, which is returned to an API with PHP. React then dynamically access this API to implement basic CRUD operations. It fetches book information from the google books API.


## App Structure
/src/img -> Static Images
/src/css -> Static CSS

/src/components -> All React Components

/src/utils -> JS Utility Functions
- google.js -> getGoogleBookInfo(isbn)

/src/views -> React Pages

/src/model -> JS interactions with Databases/API
- LibraryModel.js -> class LibraryModel
  - getLibrary()
  - addBook()
  - getBook()
  - getBookByUser()
  - deleteBook()
  - searchLibrary()
  - toggleReadStatus()
- UserModel.js -> class UserModel
  - login()
  - logout()
  - signUp()
  - toggleUserSetting()
  - getUserSettings()

/php/config -> Constant Variables

/php/api -> App Database Interface
- Library.php
  - __construct()
  - getLibrary()
  - getBookByIsbn()
  - getBookById()
  - getBookByUser()
  - addBook()
  - deleteBook()
  - searchLibrary()
  - toggleReadStatus()
  - Libarary Controller Logic
- Users.php
  - __construct()
  - login()
  - signUp()
  - getUserByEmail()
  - toggleUserSetting()
  - getUserSettings()
  - Users Controller Logic

## TODO
- add sessions with log in/out (cant do on localhost due to different ports)
- add .htaccess file for React files
- remove LibraryModel/UserModel Classes and convert to functions?

## Bugs