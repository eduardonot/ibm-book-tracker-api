const AuthRoute = require('./routes/AuthRoute')
const BookRoute = require('./routes/BookRoute')
const UserRoute = require('./routes/UserRoute')

module.exports = router => {
  AuthRoute(router)
  BookRoute(router)
  UserRoute(router)
}
