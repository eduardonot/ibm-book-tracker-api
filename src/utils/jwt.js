const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET_KEY || 'secret'

module.exports = {
  generator: (user) => {
    return jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 60),
      data: {
        id: user._id,
        name: user.username
      }
    }, jwtSecret)
  },

  verify: (token) => {
    try {
      return jwt.verify(token, jwtSecret)
    } catch (error) {
      return false
    }
  }
}
