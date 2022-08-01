const mongoose = require('mongoose')
const BookSchema = require('./../schemas/BookSchema')
const mongooseSchema = mongoose.Schema(BookSchema, { timestamps: true })

module.exports = mongoose.model('Books', mongooseSchema)
