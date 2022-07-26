const booksRepository = require('../repository/books')
module.exports = {
  getAllBooks: ({ res }) => {
    booksRepository.getAllBooks()
      .then(data => {
        res.json(data)
      })
      .catch(err => {
        res.json(err)
      })
  },

  addBook: async (req, res) => {
    if (!req.body.titulo || !req.body.autor) {
      res.status(400).json({
        message: 'Titulo e Autor são obrigatórios'
      })
    }
    const addBook = await booksRepository.addBook(req.body)
    if (addBook === true) {
      return res.status(201).json({
        message: 'Livro adicionado com sucesso'
      })
    }
    return res.status(400).json({
      message: 'Livro já existe'
    })
  }
}
