require('dotenv').config()
const express = require('express')
const routes = require('./routes/routes')
const connectDb = require('./databaseConnect/DatabaseConnect')
const app = require('./app')
app.use(express.json())

//CONNECT DATABASE
connectDb()
app.use('/api/v1', routes)
app.listen(process.env.PORT, () => {
  console.log('Started the server')
})
