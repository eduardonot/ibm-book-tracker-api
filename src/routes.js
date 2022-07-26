const express = require('express')
const bookController = require('./controllers/bookController')
const userController = require('./controllers/userController')
const checkUserAuth = require('./middlewares/checkUserAuth')
const checkMandatoryParams = require('./middlewares/checkMandatoryParams')
const router = express.Router()

// GENERAL BOOKS
router.get('/booklist', bookController.getAllBooks)

// BOOK MANAGEMENT
router.get('/useraddedbooks', checkUserAuth.checkToken, bookController.getBooksByUserId)
router.post('/addbook', checkUserAuth.checkToken, bookController.addBook)
router.put('/updatebook/:bookid', checkMandatoryParams.checkBookId, checkUserAuth.checkToken, bookController.updateBook)
router.delete('/deletebook/:bookid', checkMandatoryParams.checkBookId, checkUserAuth.checkToken, bookController.deleteBook)

// USER BOOK LIST
router.get('/userbooklist', checkUserAuth.checkToken)
router.post('/addbooktolist/:bookid', checkMandatoryParams.checkBookId, checkUserAuth.checkToken)
router.put('/editbookfromlist/:bookid', checkMandatoryParams.checkBookId, checkUserAuth.checkToken)
router.delete('/removebookfromlist/:bookid', checkMandatoryParams.checkBookId, checkUserAuth.checkToken)

// USER
router.post('/signup', userController.signUp)
router.post('/login', userController.login)

module.exports = router
