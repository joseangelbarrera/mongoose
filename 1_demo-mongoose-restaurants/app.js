const express = require('express')
const MongoClient = require('mongodb').MongoClient

const app = express()
const PORT = 3000

const urlDb = 'mongodb://localhost:27017/test'

MongoClient.connect(urlDb, (err, db) => {
  if (err) throw err
  console.log(`We're connected to the DB...`);

  /* /restaurants?show=_id,name,cuisine */
  /* /restaurants */


  app.get('/restaurants', (req,res) => {

    const { show } = req.query
    let projection = {}

    if (show) { // "_id,name,cuisine"
      const fieldsToShow = show.split(',') // ["_id","name","cuisine"]
      fieldsToShow.forEach( field => projection[field] = 1 )
    }

    db.collection('restaurants')
      .find( {} , projection) // cursor
      .limit(20)
      .toArray( (err, docs) => {
        if (err) throw err
        res.json(docs)
      })

  })



})

app.listen(PORT)
console.log(`Listening on PORT ${PORT}...`);