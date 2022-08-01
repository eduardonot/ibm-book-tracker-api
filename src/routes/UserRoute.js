const UserController = require('../controllers/UserController')
const userController = new UserController()
const checkAuth = require('./../middlewares/checkAuth')

module.exports = router => {
  router.get('/user', checkAuth.checkToken, userController.getUserData)
  router.post('/register', userController.create)
  router.post('/addbooktolist', checkAuth.checkToken, userController.addBook)
  router.put('/setstatus', checkAuth.checkToken, userController.setBookStatus)
  router.put('/setrating', checkAuth.checkToken, userController.setBookRating)
  router.delete('/removefromlist', checkAuth.checkToken, userController.deleteBook)
}
