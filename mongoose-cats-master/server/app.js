
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const pug = require('pug')
const path = require('path')

const routerCats = require('./routes/cats')
const routerCat = require('./routes/cat')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}


// const dbUrl = 'mongodb://admin:bmp509@ds153501.mlab.com:53501/test-skylab'
// const PORT = 3000

const dbUrl = process.env.DB_URL
const PORT = process.env.PORT

const app = express()

mongoose.Promise = Promise
mongoose.connect(dbUrl)

app.use(express.static(path.join(__dirname, '../public')))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// app.use(express.static( path.join(__dirname, '../client')  ))

app.use('/cats', routerCats)
app.use('/cat', routerCat)

app.listen(PORT)
console.log(`Listening on PORT ${PORT}`);
