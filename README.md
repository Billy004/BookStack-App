# BookStack
## Keep Track of your book library!
### Version number 1.0.0

BookStack is a custom Full-Stack web app that I programmed from the ground up as a portfolio project.

Users and books are stored in a MYSQL database, which is returned to an API with PHP. React then dynamically access this API to implement basic CRUD operations.

More Info coming soon

#### TODO
- UI/UX
  - make a kickass css layout
  - light/dark mode?
- add sessions with log in/out (cant do on localhost due to different ports)
- hash passwords
- use res.ok for fetch statements

#### Bugs
- search bar: if text is left in bar, label floats over text
- searching searches all books, not just users books