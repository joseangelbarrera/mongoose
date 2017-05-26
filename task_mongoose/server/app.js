const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
const PORT = 3000

const app = express()

const routerTasks = require('./routes/tasks')
const routerTask = require('./routes/task')

const urlDB = 'mongodb://localhost:27017/test'
mongoose.connect(urlDB)
mongoose.Promise = Promise

app.use(express.static( path.join(__dirname, '../public')  ))
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '/views'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/tasks', routerTasks)

app.use('/task', routerTask)

app.listen(PORT)
console.log(`Listening on PORT ${PORT}`)