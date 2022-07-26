const config = require('./../config/index')
const bcrypt = require('bcrypt')

module.exports = {
  hashPassword: (password) => {
    return bcrypt.hashSync(password, config.bcryptSaltRounds)
  },
  comparePassword: (password, hash) => {
    return bcrypt.compareSync(password, hash)
  }
}
