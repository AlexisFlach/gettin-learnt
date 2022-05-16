const mongoose = require('mongoose')
const config = require('config')

const db = config.get('mongoURI')

const connectDb = async () => {
  try {
    await mongoose.connect(db);
    console.log('Connected to db!')
  } catch (e) {
    console.error(e.message)
    process.exit(1)
  }
}

module.exports = connectDb;