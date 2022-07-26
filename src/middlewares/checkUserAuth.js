const jwt = require('./../utils/jwt')
const checkToken = jwt.verifyToken

module.exports = {
  checkToken: (req, res, next) => {
    const token = req.headers.authorization
    if (!token) { return res.status(401).json({ message: 'unauthorized' }) }
    const validToken = checkToken(token)
    if (!validToken) { return res.status(401).json({ message: 'unauthorized' }) }
    Object.assign(req.body, { userId: validToken.data.id })
    next()
  }
}
