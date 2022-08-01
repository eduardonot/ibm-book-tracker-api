const AuthController = require('../controllers/AuthController')
const authController = new AuthController()
const basePath = '/login'

module.exports = router => {
  router.post(basePath, authController.login)
}
