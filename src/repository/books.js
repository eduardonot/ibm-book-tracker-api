const Books = require('../models/Books')

module.exports = {
  getAllBooks: async () => {
    const getData = await Books.find()
    return getData
  },

  addBook: async (data) => {
    const searchBook = await Books.find({ titulo: data.titulo })
    if (searchBook.length === 0) {
      await Books.create(data)
      return true
    }
    return false
  }
}
