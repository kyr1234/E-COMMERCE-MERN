const mongoose = require('mongoose')

const connectDb = async () => {
  mongoose
    .connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log('connected')
    })
    .catch((err) => {
      console.log(err)
    })
}

module.exports = connectDb
