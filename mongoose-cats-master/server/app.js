
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const pug = require('pug')
const path = require('path')

const routerCats = require('./routes/cats')
const routerCat = require('./routes/cat')

const dbUrl = 'mongodb://localhost:27017/test'
const PORT = 5000

const app = express()

mongoose.Promise = Promise
mongoose.connect(dbUrl)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// app.use(express.static( path.join(__dirname, '../client')  ))
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '/views'));

app.use('/cats', routerCats)
app.use('/cat', routerCat)

app.listen(PORT)
console.log(`Listening on PORT ${PORT}`);
