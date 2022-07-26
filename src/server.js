const express = require('express')
const config = require('./config/index')
const routes = require('./routes')
const database = require('./database/mongoose')
const dbPopulate = require('./database/populate')
const app = express()

module.exports = {
  start: () => {
    // CONNECT TO MONGODB
    database.connect()
    // START SERVER
    app.listen(config.serverPort, () => {
      console.log(`Server is listening on port ${config.serverPort}`)
    })
    app.use(express.json())
    app.use(routes)

    // POPULATE DATABASE
    dbPopulate.generateData()
  }
}
