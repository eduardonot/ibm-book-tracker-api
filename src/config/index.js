module.exports = {
  serverPort: process.env.APP_PORT,
  databasePort: process.env.MONGODB_PORT,
  jwtSecretPassword: process.env.JWT_SECRET_PASSWORD,
  bcryptSaltRounds: 10,
  mongoSetup: {
    useNewUrlParser: true
  }
}
