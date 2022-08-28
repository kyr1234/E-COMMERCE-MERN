require('./databaseConnect/DatabaseConnect')
require('dotenv').config()
const express = require('express')
const users = require('./routes/UserRoutes')
const products = require('./routes/ProductRoutes')
const orders = require('./routes/OrderRoutes')
const middleware = require('./Middleware/middleware')
const cookieparser = require('cookie-parser')
const cors=require("cors")
const app = require('./app')
const { error } = require('jquery')
app.use(express.json())
app.use(cookieparser())

process.on('uncaughtException', (error) => {
  console.log(error.message)
  console.log('Shutting Down the Server')
  process.exit(1)
})
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  }),
)

//CONNECT DATABASE

app.use('/api/v1', users)
app.use('/api/v1', products)
app.use('/api/v1', orders)

app.use(middleware)
app.listen(process.env.PORT, () => {
  console.log('Started the server')
})

/* process.on('unhandledRejection', (error) => {
  console.log(error.message)
  console.log('Shutting Down the Server')
  server.close(() => {
    process.exit(1)
  })
}) */
