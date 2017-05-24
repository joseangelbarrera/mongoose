const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const toDo = require('./models/toDo')

const app = express()

const urlDB = 'mongodb://localhost:27017/test'

const PORT = 3000

mongoose.connect(urlDB)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.Promise = Promise


app.get('/toDos', (req, res) => {
toDo.find()
    .then( toDos => {
      res.json(toDo)
    })
})

app.post('/toDos/addTask', (req, res) => {
    const { task, dateOfUpdate, completed } = req.body
    const newToDo = new toDo({ task, dateOfUpdate: +new Date(), completed })
    newToDo.save()
        .then(msg => {
            res.json(msg)
        })
        .catch(err => {
            res.json(err)
        })
})

app.listen(PORT)
console.log(`Listening on PORT ${PORT}`)

