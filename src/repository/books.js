const Books = require('../models/Books')

module.exports = {
  getAllBooks: async () => {
    const getData = await Books.find()
    return getData
  },

  getBookByUserId: async (userId) => {
    const getData = await Books.find({ uploadedBy: userId })
    return getData
  },

  addBook: async (data) => {
    const searchBook = await Books.find({ titulo: data.titulo })
    if (searchBook.length === 0) {
      await Books.create({
        titulo: data.titulo,
        autor: data.autor,
        uploadedBy: data.userId
      })
      return true
    }
    return false
  },

  updateBook: async (id, data) => {
    const searchBook = await Books.find({ titulo: data.titulo })
    if (searchBook.length === 0) {
      await Books.findByIdAndUpdate(id, {
        titulo: data.titulo,
        autor: data.autor,
        uploadedBy: data.userId
      })
      return true
    }
    return false
  },

  deleteBook: async (id) => {
    const removeBook = await Books.findByIdAndRemove(id)
    return removeBook
  }
}
