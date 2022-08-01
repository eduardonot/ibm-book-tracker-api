const serverResponse = require('./../utils/serverResponse')
const UserModel = require('./../models/UserModel')
const hash = require('./../utils/hash')
const jwt = require('./../utils/jwt')
const user = UserModel

class AuthController {
  async login (req, res) {
    if (!req.body.email || !req.body.password) {
      return serverResponse.send(res, { status: 400 })
    }
    req.body.email = req.body.email.toLowerCase().trim()
    await user.findOne({ email: req.body.email })
      .then(data => {
        if (!data) {
          return serverResponse.send(res, { status: 404 })
        }
        if (!hash.decrypt(req.body.password, data.password)) {
          return serverResponse.send(res, { status: 401 })
        }
        return res.status(200).json({
          token: jwt.generator(data),
          user: {
            id: data._id,
            name: data.name,
            email: data.email
          }
        })
      })
  }
}

module.exports = AuthController
