const mongoose = require('mongoose')
const BookSchema = mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  autor: {
    type: String,
    required: true
  }

})

module.exports = mongoose.model('Books', BookSchema)
