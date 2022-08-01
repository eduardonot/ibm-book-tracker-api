const mongoose = require('mongoose')
const UserSchema = require('./../schemas/UserSchema')
const mongooseSchema = mongoose.Schema(UserSchema, { timestamps: true })

module.exports = mongoose.model('accounts', mongooseSchema)
