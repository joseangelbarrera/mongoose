// Whith mmongoDB we need create the 'Deamon' and the 'Shell'
// in that exactly order.
//
// the 'Deamon' rund with this command
// `mongod --dbpath ~/data/db`
// this is the standar path
// 
// 'Shell' are inicializate whith
// `mongo`

// 1º we require express, body-parser and mongoose

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// 2º we require the Restaurant model
const Restaurant = require('./models/Restaurant')

// 3º we inicialize express instance
const app = express()

// 4º we create a variable where the database is 'test'
const urlDB = 'mongodb://localhost:27017/test'

// 5º and assign the port 3000
const PORT = 3000

// 7º we connect mongoose to the database
mongoose.connect(urlDB)

// 8º We create the paramenter for use bodyparser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 9ª we stablish our promise
mongoose.Promise = Promise

// 10ª We create our middlewere

// in this case we want to show and hide some parameters
// for that reason we are going to use query request
// to capture the url from show, hide, page and limit


app.use((req, res, next) => {
    const { show, hide, page = 1, limit = 20 } = req.query

// GET http://localhost:3000/
// restaurant/?show=name,cuisine,borough&hide=_id
// if we `console.log(req.query)` from this url it returns:
// ==>> {show: 'name,cuisine,borough'}

// we create a empty object to save the req.query data
// in the form we need to use into the `find()` method of mongoose.
    let projection = {}


    if (show) {
// we past the req.query string to the `split()` method to convert
// it into an array wich we can pass into a forEach()
// to create the object fr the `projection{}` with
// elements as {'name': 1}
        const fieldToShow = show.split(',')
        fieldToShow.forEach(field => projection[field] = 1)
    }

    // same with hide but to create element as {'name': 0}
    if (hide) {
        const fieldToShow = hide.split(',')
        fieldToShow.forEach(field => projection[field] = 0)
    }

    req.projection = projection
    req.limit = +limit

    // here we create the number of pages we are going to skip in order 
    req.skip = limit * (page - 1)

    next()

})

// 11º We create our finalpoints

app.get('/restaurants', (req, res) => {

    const { projection, page = 1, limit = 20, skip = 1} = req
    console.log(req.query)
// We can use `Restaurant` just because we
// create the variable Restuurant that requires the model
// from the file `Restaurant.js` 

    Restaurant
//we find all the elements
     .find(null, projection)

// we limit to 20 the elemnets to show
     .limit(+limit)
     .skip(+skip)

// once we have those elements we use the json() method
// to convert the response into a json format
     .then(restaurants => {
        res.json(restaurants)
// now if we run `http://localhost:3000/restaurants`
// on the browser we are going to revieve 20 elements
// in json format
    })

})


// in this case we use req.params to intercept the value
// of the url afer `/restaurants/` which will be always
// a kind of cuisine
app.get('/restaurants/:cuisine', (req, res) => {
  const { projection, limit, skip } = req
  const { cuisine } = req.params

  Restaurant
        .find({ cuisine }, projection)
        .limit(limit)
        .skip(skip)
        .then(restaurants => {
          res.json(restaurants)
        })
})

// same that last but with borough
app.get('/restaurants/:borough', (req, res) => {
  const { projection, limit, skip } = req
  const { borough } = req.params

  Restaurant
        .find({ borough }, projection)
        .limit(limit)
        .skip(skip)
        .then(restaurants => {
          res.json(restaurants)
        })
})

// it excludes the cuisine element on the results
// to achieve it we use the `$ne` mongoose element 
app.get('/restaurants/:cuisine', (req, res) => {
  const { projection, limit, skip } = req
  const { cuisine } = req.params

  Restaurant
    .find({'cuisine': {$ne: cuisine}}, projection)
    .limit(limit)
    .skip(skip)
    .then(restaurants => {
      res.json(restaurants)
    })
})

//  in this case we use the `findById`methos to return the result
// only one restaurant whith a exaxt id
// and we also change the route to `restaurant`
app.get('/restaurant/:id', (req, res) => {
  const { projection, limit, skip } = req
  const { id } = req.params

  Restaurant
    .findById(id, projection)
    .limit(limit)
    .skip(skip)
    .then(restaurants => {
      res.json(restaurants)
    })
})

// 6ª We listen at port 3000
app.listen(PORT)
console.log(`Listening on PORT ${PORT}`)
