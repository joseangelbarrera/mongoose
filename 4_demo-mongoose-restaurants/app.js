// We requiere express
const express = require('express')

//We requiere body-parser
const bodyParser = require('body-parser')

//We requiere mongoose
const mongoose = require('mongoose')

// Paramater for use promises
mongoose.Promise = Promise

// We inicialize express instance
const app = express

// We import our routes
const userRoutes = require('./routes')
const filtersMiddleware = require('./routes/middleware/filters')

// We define the database url and port variables
const urlDB = 'mongodb://localhost:27017/test'
const PORT = 3000

// We connect mongoose to the database
mongoose.connect(urlDB)

// Parameters for use body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// We define our middleware
app.use(filtersMiddleware)
app.use(userRoutes)

// We listen at PORT 3000
app.listen(PORT)
console.log(`Listening on PORT ${PORT}`)
