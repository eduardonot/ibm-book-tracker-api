const serverResponse = require('./../utils/serverResponse')
const UserModel = require('./../models/UserModel')
const BookModel = require('./../models/BookModel')
const hash = require('./../utils/hash')
const user = UserModel
const book = BookModel

class UserController {
  async create (req, res) {
    if (!req.body.name || !req.body.email || !req.body.password || req.body.password.length < 6) {
      return serverResponse.send(res, { status: 400 })
    }
    req.body.email = req.body.email.toLowerCase().trim()
    const userExists = await user.findOne({ email: req.body.email })
    if (userExists) {
      return serverResponse.send(res, { status: 400 })
    }
    req.body.password = hash.encrypt(req.body.password)
    await user.create(req.body)
      .then(data => { return serverResponse.send(res, { status: 201, data }) })
      .catch(() => { return serverResponse.send(res, { status: 500 }) })
  }

  async getUserData (req, res) {
    const userExists = await user.findOne({ _id: req.body.userId })
    if (!userExists) { return serverResponse.send(res, { status: 404 }) }
    return serverResponse.send(res, { status: 200, data: userExists })
  }

  async addBook (req, res) {
    if (!req.body.title || !req.body.author) {
      return serverResponse.send(res, { status: 400 })
    }
    req.body.title = req.body.title.trim()
    req.body.author = req.body.author.trim()

    const userExists = await user.findOne({ _id: req.body.userId })
    if (!userExists) {
      return serverResponse.send(res, { status: 404 })
    }
    const getBookDuplicate = await book.findOne({ title: req.body.title, author: req.body.author })
    if (getBookDuplicate) {
      console.log(req.body)
      return serverResponse.send(res, { status: 400 })
    }
    const getBook = await user.findOne({
      _id: req.body.userId,
      books: { $elemMatch: { title: req.body.title } }
    })
    if (getBook) {
      return serverResponse.send(res, { status: 400 })
    }

    await user.findOneAndUpdate({ _id: req.body.userId }, {
      $push: {
        books: {
          title: req.body.title,
          author: req.body.author,
          status: 'quero ler',
          createdAt: new Date()
        }
      }
    })
      .then(data => { return serverResponse.send(res, { status: 201, data }) })
      .catch(() => { return serverResponse.send(res, { status: 500 }) })
  }

  async setBookStatus (req, res) {
    if (!req.body.title || !req.body.status) {
      return serverResponse.send(res, { status: 400 })
    }
    if (req.body.status !== 'quero ler' && req.body.status !== 'lendo' && req.body.status !== 'lido') {
      return serverResponse.send(res, { status: 400 })
    }
    const userExists = await user.findOne({ _id: req.body.userId })
    if (!userExists) { return serverResponse.send(res, { status: 404 }) }
    const getBook = await user.findOne({
      _id: req.body.userId,
      books: { $elemMatch: { title: req.body.title } }
    })
    if (!getBook) {
      return serverResponse.send(res, { status: 404 })
    }
    await user.findOneAndUpdate({ _id: req.body.userId, 'books.title': req.body.title }, {
      $set: {
        'books.$.conclusionDate': req.body.status === 'lido' ? new Date() : null,
        'books.$.rating': req.body.status === 'lido' ? req.body.rating : null,
        'books.$.status': req.body.status
      }
    })
      .then(data => { return serverResponse.send(res, { status: 201, data }) })
      .catch(() => { return serverResponse.send(res, { status: 500 }) })
  }

  async setBookRating (req, res) {
    if (!req.body.title || !req.body.rating) {
      return serverResponse.send(res, { status: 400 })
    }
    if (req.body.rating < 0 || req.body.rating > 5) {
      return serverResponse.send(res, { status: 400 })
    }
    if (Number.isInteger(req.body.rating) === false) {
      return serverResponse.send(res, { status: 400 })
    }

    const userExists = await user.findOne({ _id: req.body.userId })
    if (!userExists) { return serverResponse.send(res, { status: 404 }) }

    const getBook = await user.findOne({
      _id: req.body.userId,
      books: { $elemMatch: { title: req.body.title, status: 'lido' } }
    })
    if (!getBook) {
      return serverResponse.send(res, { status: 404 })
    }

    await user.findOneAndUpdate({ _id: req.body.userId, 'books.title': req.body.title }, {
      $set: {
        'books.$.rating': req.body.rating
      }
    })
      .then(data => { return serverResponse.send(res, { status: 201, data }) })
      .catch(() => { return serverResponse.send(res, { status: 500 }) })
  }

  async deleteBook (req, res) {
    if (!req.body.title) {
      return serverResponse.send(res, { status: 400 })
    }
    const userExists = await user.findOne({ _id: req.body.userId })
    if (!userExists) { return serverResponse.send(res, { status: 404 }) }
    const getBook = await user.findOne({
      _id: req.body.userId,
      books: { $elemMatch: { title: req.body.title } }
    })
    if (!getBook) {
      return serverResponse.send(res, { status: 404 })
    }
    await user.findOneAndUpdate({ _id: req.body.userId }, {
      $pull: {
        books: {
          title: req.body.title
        }
      }
    })
      .then(data => { return serverResponse.send(res, { status: 201, data }) })
      .catch(() => { return serverResponse.send(res, { status: 500 }) })
  }
}

module.exports = UserController
