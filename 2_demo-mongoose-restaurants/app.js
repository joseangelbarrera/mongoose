const express = require('express')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId

const app = express()
const PORT = 3000

const urlDb = 'mongodb://localhost:27017/test'

MongoClient.connect(urlDb, (err, db) => {

  if (err) throw err
  console.log(`We're connected to the DB...`);

  app.use( (req, res, next) => {

    const { show, hide, page=1, limit=20 } = req.query
    let projection = {}

    if (show) {
      const fieldsToShow = show.split(',')
      fieldsToShow.forEach( field => projection[field] = 1 )
    }

    if (hide) {
      const fieldsToShow = hide.split(',')
      fieldsToShow.forEach( field => projection[field] = 0 )
    }

    req.projection = projection
    req.limit = +limit
    req.skip = limit * (page - 1)

    next()

  })


  app.get('/restaurant/:id', (req,res) => {

    const { id } = req.params

    db.collection('restaurants')
      .find( { _id: ObjectId(id) }) // cursor
      .toArray( (err, docs) => {
        if (err) throw err
        res.json(docs)
      })

  })

  app.get('/restaurants', (req,res) => {

    const { projection, limit, skip } = req

    db.collection('restaurants')
      .find( {} , projection) // cursor
      .limit(limit)
      .skip(skip)
      .toArray( (err, docs) => {
        if (err) throw err
        res.json(docs)
      })

  })

  app.get('/restaurants/borough/:borough', (req,res) => {

    const { borough } = req.params
    const { projection, limit, skip } = req

    db.collection('restaurants')
      .find( { borough }, projection ) // cursor
      .limit(limit)
      .skip(skip)
      .toArray( (err, docs) => {
        if (err) throw err
        res.json(docs)
      })

  })



})

app.listen(PORT)
console.log(`Listening on PORT ${PORT}...`);