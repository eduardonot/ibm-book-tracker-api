const BookModel = require('./../../models/BookModel')

module.exports = {
  generateData: async () => {
    const getBook1 = await BookModel.find({ title: 'O Senhor dos Anéis' })
    if (getBook1.length === 0) {
      await BookModel.create({
        title: 'O Senhor dos Anéis',
        author: 'J.R.R. Tolkien'
      })
    }
    const getBook2 = await BookModel.find({ title: 'Harry Potter' })
    if (getBook2.length === 0) {
      await BookModel.create({
        title: 'Harry Potter',
        author: 'J.K. Rowling'
      })
    }
    const getBook3 = await BookModel.find({ title: 'As Crônicas de Gelo e Fogo' })
    if (getBook3.length === 0) {
      await BookModel.create({
        title: 'As Crônicas de Gelo e Fogo',
        author: 'George R.R. Martin'
      })
    }
    const getBook4 = await BookModel.find({ title: 'O Hobbit' })
    if (getBook4.length === 0) {
      await BookModel.create({
        title: 'O Hobbit',
        author: 'J.R.R. Tolkien'
      })
    }
    const getBook5 = await BookModel.find({ title: 'A revolução dos bichos' })
    if (getBook5.length === 0) {
      await BookModel.create({
        title: 'A revolução dos bichos',
        author: 'George Orwell'
      })
    }
    const getBook6 = await BookModel.find({ title: 'One Piece' })
    if (getBook6.length === 0) {
      await BookModel.create({
        title: 'One Piece',
        author: 'Eiichiro Oda'
      })
    }
    const getBook7 = await BookModel.find({ title: 'Dragon Ball' })
    if (getBook7.length === 0) {
      await BookModel.create({
        title: 'Dragon Ball',
        author: 'Akira Toriyama'
      })
    }
  }
}
