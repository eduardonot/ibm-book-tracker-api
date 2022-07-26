const booksRepository = require('../repository/books')
module.exports = {
  getAllBooks: async ({ res }) => {
    await booksRepository.getAllBooks()
      .then(data => {
        if (data.length === 0) { return res.status(404).send('No books found') }
        return res.json(data)
      })
      .catch(err => {
        return res.json(err)
      })
  },

  getBooksByUserId: async (req, res) => {
    const userId = req.body.userId
    if (!userId) { return res.status(400).send('Missing userId') }
    await booksRepository.getBookByUserId(userId)
      .then(data => {
        if (data.length === 0) { return res.status(404).send('No books found') }
        return res.json(data)
      })
      .catch(err => {
        return res.json(err)
      })
  },

  addBook: async (req, res) => {
    if (!req.body.titulo || !req.body.autor) {
      return res.status(400).json({ message: '\'titulo\' and \'autor\' are mandatory' })
    }
    const addBook = await booksRepository.addBook(req.body)
    if (addBook === true) {
      return res.status(201).json(req.body)
    }
    return res.status(400).json({
      message: 'Error adding book. Check if the book already exists'
    })
  },

  updateBook: async (req, res) => {
    const bookId = req.params.bookid
    if (!req.body.autor || !req.body.titulo) {
      return res.status(400).json({ message: '\'titulo\' and \'autor\' are mandatory' })
    }
    if (!bookId) { return res.status(400).send('Missing bookId') }
    const updateBook = await booksRepository.updateBook(bookId, req.body)
    if (updateBook === true) {
      return res.status(200).json(req.body)
    }
    return res.status(400).json({ message: 'Error updating book' })
  },

  deleteBook: async (req, res) => {
    const bookId = req.params.bookid
    if (!bookId) { return res.status(400).send('Missing bookId') }
    await booksRepository.deleteBook(bookId)
      .then(data => {
        if (data === null) { return res.status(404).send('Book not found') }
        res.status(200).json(data)
      })
      .catch(() => { res.status(400).json({ message: 'Could not delete this book' }) })
  }
}
