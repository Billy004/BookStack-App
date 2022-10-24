# BookStack
## Keep Track of your book library!
### Version number 1.0.0

BookStack is a custom Full-Stack web app that I programmed from the ground up as a portfolio project.

Users and books are stored in a MYSQL database, which is returned to an API with PHP. React then dynamically access this API to implement basic CRUD operations.

More Info coming soon

#### TODO
- UI/UX
  - make a kickass css layout
  - light/dark mode
- users
  - sign up
  - add sessions with log in (cant do on localhost due to different ports)
  - log out
- user settings (sort, filter)
- use res.ok for fetch statements
- refactor model/api
  - LibraryModel.js -> make Constants for fetch URLs
  - Put reusable php code in Database class and extend

#### Bugs