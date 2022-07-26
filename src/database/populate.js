const Books = require('../models/Books')

module.exports = {
  generateData: async () => {
    const getBook1 = await Books.find({ titulo: 'O Senhor dos Anéis' })
    if (getBook1.length === 0) {
      await Books.create({
        titulo: 'O Senhor dos Anéis',
        autor: 'J.R.R. Tolkien'
      })
    }
    const getBook2 = await Books.find({ titulo: 'Harry Potter' })
    if (getBook2.length === 0) {
      await Books.create({
        titulo: 'Harry Potter',
        autor: 'J.K. Rowling'
      })
    }
    const getBook3 = await Books.find({ titulo: 'As Crônicas de Gelo e Fogo' })
    if (getBook3.length === 0) {
      await Books.create({
        titulo: 'As Crônicas de Gelo e Fogo',
        autor: 'George R.R. Martin'
      })
    }
    const getBook4 = await Books.find({ titulo: 'O Hobbit' })
    if (getBook4.length === 0) {
      await Books.create({
        titulo: 'O Hobbit',
        autor: 'J.R.R. Tolkien'
      })
    }
    const getBook5 = await Books.find({ titulo: 'A revolução dos bichos' })
    if (getBook5.length === 0) {
      await Books.create({
        titulo: 'A revolução dos bichos',
        autor: 'George Orwell'
      })
    }
    const getBook6 = await Books.find({ titulo: 'One Piece' })
    if (getBook6.length === 0) {
      await Books.create({
        titulo: 'One Piece',
        autor: 'Eiichiro Oda'
      })
    }
    const getBook7 = await Books.find({ titulo: 'Dragon Ball' })
    if (getBook7.length === 0) {
      await Books.create({
        titulo: 'Dragon Ball',
        autor: 'Akira Toriyama'
      })
    }
  }
}
