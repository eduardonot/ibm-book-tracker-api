const mongoose = require('mongoose')
const UserBookListSchema = mongoose.Schema({
  bookId: {
    type: Number,
    required: true
  },
  userId: {
    type: Number,
    required: true
  },
  dataAdicaoALista: {
    type: Date,
    default: Date.now
  },
  dataConclusaoLeitura: {
    type: Date
  },
  nota: {
    type: Number,
    validate: {
      validator: Number.isInteger,
      message: 'Must be an integer number'
    }
  },
  status: {
    type: String,
    enum: ['quero ler', 'lendo', 'lido']
  }

}, { timestamps: true })

module.exports = mongoose.model('UserBookList', UserBookListSchema)
