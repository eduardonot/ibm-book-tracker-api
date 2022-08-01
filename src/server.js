require('dotenv').config()
const express = require('express')
const routes = require('./routes')
const mongo = require('./infra/helpers/mongooseHelper')
const cors = require('cors')
const populateDatabase = require('./infra/helpers/populateDatabase')
const app = express()

module.exports = class Server {
  constructor () {
    this.appPort = process.env.APP_PORT || 5000
  }

  up () {
    try {
      app.listen(this.appPort, () => { console.log(`Server is running on port ${this.appPort}`) })
      app.use(express.json())
      app.use(cors())
      routes(app)
      mongo.connect()
      populateDatabase.generateData()
    } catch (error) {
      console.log(error)
    }
  }
}
