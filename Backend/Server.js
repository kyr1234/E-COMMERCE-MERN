require('dotenv').config()
const express = require('express')
const routes = require('./routes/routes')
const connectDb = require('./databaseConnect/DatabaseConnect')
const middleware = require('./Middleware/middleware')
const app = require('./app')
const { error } = require('jquery')
app.use(express.json())

process.on('uncaughtException', (error) => {
  console.log(error.message)
  console.log('Shutting Down the Server')
  process.exit(1)
})

//CONNECT DATABASE
connectDb()
app.use('/api/v1', routes)

app.use(middleware)
const server = app.listen(process.env.PORT, () => {
  console.log('Started the server')
})

process.on('unhandledRejection', (error) => {
  console.log(error.message)
  console.log('Shutting Down the Server')
  server.close(() => {
    process.exit(1)
  })
})
