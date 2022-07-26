/* eslint-disable prefer-promise-reject-errors */
const UsersModel = require('../models/Users')
const bcrypt = require('./../utils/bcrypt')
const jwt = require('./../utils/jwt')
module.exports = {
  signUp: async (body) => {
    return new Promise((resolve, reject) => {
      UsersModel.find({ username: body.username })
        .then(data => {
          if (data.length > 0) {
            return reject({ message: 'User is already signed' })
          }
          body.password = bcrypt.hashPassword(body.password)
          UsersModel.create(body)
            .then(resolve)
            .catch(reject)
        })
        .catch(reject)
    })
  },

  login: async (body) => {
    return new Promise((resolve, reject) => {
      UsersModel.findOne({ username: body.username })
        .then(data => {
          if (!data) {
            return reject({ message: 'User does not exists' })
          }
          if (!bcrypt.comparePassword(body.password, data.password)) {
            return reject({ message: 'Wrong password' })
          }
          const genToken = jwt.genToken(data)
          resolve(genToken)
        })
        .catch(reject)
    })
  }
}
