const mongoose = require('mongoose')
const UserBookListSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('accounts', UserBookListSchema)
