const express = require('express')
const bookController = require('./controllers/bookController')
const userController = require('./controllers/userController')
const router = express.Router()

// GET ALL BOOKS
router.get('/booklist', bookController.getAllBooks)

// GET USER BOOK LIST

// ADD A NEW BOOK
router.post('/addbook', bookController.addBook)
// EDIT BOOK STATUS

router.post('/signup', userController.signUp)
router.post('/login', userController.login)

module.exports = router
