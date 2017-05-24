const mongoose = require('mongoose');
const collection = 'restaurants'

var RestaurantSchema = new mongoose.Schema({
  name: String,
  borough: String,
  cuisine: String,
  address: {
    building: String,
    street: String,
    zipcode: String,
    coord: [ Number ],
  },
  grades: [{
    date: Date,
    grade: String,
    score: Number
  }],

// this is the collection object
// in this case we use the 'restaurants' collection
// in case we do not name it mongoose goes to use the name
// from the last line in plural
}, { collection })


// we export the model
module.exports = mongoose.model('Restaurant', RestaurantSchema);