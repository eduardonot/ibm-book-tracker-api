const serverResponse = require('./../utils/serverResponse')
const BookModel = require('./../models/BookModel')
const UserModel = require('./../models/UserModel')
const book = BookModel
const user = UserModel

module.exports = class BookController {
  getAll ({ res }) {
    book.find()
      .then(data => {
        if (data.length === 0) {
          return serverResponse.send(res, { status: 404 })
        }
        return serverResponse.send(res, { status: 200, data })
      })
      .catch(() => { return serverResponse.send(res, { status: 500 }) })
  }

  async addToUserList (req, res) {
    if (!req.body.title || !req.body.author) {
      return serverResponse.send(res, { status: 400 })
    }

    const userExists = await user.findOne({ _id: req.body.userId })
    if (!userExists) {
      return serverResponse.send(res, { status: 404 })
    }

    const doesBookExists = await book.findOne({ title: req.body.title, author: req.body.author })
    if (!doesBookExists) {
      return serverResponse.send(res, { status: 404 })
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
          createdAt: new Date(),
          conclusionDate: null,
          rating: null
        }
      }
    })
      .then(data => { return serverResponse.send(res, { status: 200, data }) })
      .catch(() => { return serverResponse.send(res, { status: 500 }) })
  }
}
