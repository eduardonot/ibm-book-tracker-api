const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports.encrypt = (value) => {
  return bcrypt.hashSync(value, saltRounds)
}

module.exports.decrypt = (value, hash) => {
  return bcrypt.compareSync(value, hash)
}
