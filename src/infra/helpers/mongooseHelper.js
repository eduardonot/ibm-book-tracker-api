const mongoose = require('mongoose')
const mongoHost = process.env.MONGO_HOST || 'localhost'
const mongoPort = process.env.MONGO_PORT || 27017
const mongoDatabase = process.env.MONGODB_DB || 'book-catalog'

module.exports = {
  connect: () => {
    mongoose.connect(`mongodb://${mongoHost}:${mongoPort}/${mongoDatabase}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
      .then(() => console.log('MongoDB connected'))
      .catch(() => console.log('Error connecting to MongoDB. Check if it is running.'))
  }
}
