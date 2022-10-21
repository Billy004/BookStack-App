# BookStack
## Keep Track of your book library!
### Version number 1.0.0

BookStack is a custom Full-Stack web app that I programmed from the ground up as a portfolio project.

Users and books are stored in a MYSQL database, which is returned to an API with PHP. React then dynamically access this API to implement basic CRUD operations.

More Info coming soon

#### TODO
- UI/UX
  - make a kickass css layout
  - Active Nav Link
- users
  - sign up
  - log in 
  - log out
- user settings (sort, filter)
- search library
- toggle book read/unread
- book more info modal
- refactor model/api
  - LibraryModel.js -> make Constants for fetch URL
  - Put reusable php code in Database class and extend