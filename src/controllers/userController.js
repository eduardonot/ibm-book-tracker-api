const usersRepository = require('./../repository/users')
module.exports = {
  signUp: (req, res) => {
    const { username, password, repassword } = req.body
    if (!username || !password || !repassword) {
      return res.status(400).json({ message: '\'username\', \'password\' and \'repassword\' are mandatory' })
    }
    if (password !== repassword) {
      return res.status(400).json({ message: '\'password\' and \'repassword\' must be the same' })
    }
    const user = {
      username,
      password
    }
    usersRepository.signUp(user)
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        res.status(400).json(err)
      })
  },

  login: (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
      return res.status(400).json({ message: '\'username\' and \'password\' are mandatory' })
    }
    const user = {
      username,
      password
    }
    usersRepository.login(user)
      .then(data => {
        res.status(200).json({
          message: 'Login success',
          authToken: data
        })
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }
}
