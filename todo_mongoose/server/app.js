const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const routerTasks = require('./routes/tasks')
const routerTask = require('./routes/task')

const urlDB = 'mongodb://localhost:27017/test'
const PORT = 3000

const apiKey = require('./routes/middlewere/keyword.js')

const app = express()

mongoose.Promise = Promise
mongoose.connect(urlDB)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(apiKey)

app.use('/tasks', routerTasks)
app.use('/task', routerTask)

app.listen(PORT)
console.log(`Listening on PORT ${PORT}`)