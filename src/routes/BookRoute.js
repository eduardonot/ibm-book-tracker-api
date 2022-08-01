const BookController = require('./../controllers/BookController')
const bookController = new BookController()
const checkAuth = require('./../middlewares/checkAuth')
const basePath = '/book'

module.exports = router => {
  router.get(basePath, checkAuth.checkToken, bookController.getAll)
  router.post('/insertintouserbookcatalog', checkAuth.checkToken, bookController.addToUserList)
}
