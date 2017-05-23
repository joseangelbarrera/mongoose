const mongoose = require('mongoose')
const Schena = mongoose.Schema

const CatSchema = new Schema({
  name: String
})

const Cat = mongoose.model('Cat', CatSchema)

module.exports = Cat
