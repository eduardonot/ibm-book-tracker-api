const mongoose = require('mongoose')
const BookSchema = mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  autor: {
    type: String,
    required: true
  },
  uploadedBy: {
    type: String
  }

})

module.exports = mongoose.model('Books', BookSchema)
