const mongoose = require('mongoose')
const config = require('./../config/index')

module.exports = {
  connect: async () => {
    await mongoose.connect(`mongodb://localhost:${config.databasePort}/booktracker-eduardolourenco`, config.mongoSetup)
      .then(() => console.log('MongoDB connected'))
      .catch(() => console.log('Error connecting to database. Check if MongoDB is running'))
  }
}
