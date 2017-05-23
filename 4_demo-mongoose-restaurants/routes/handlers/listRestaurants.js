 // Import the 'Restaurant' schema
const Restaurant = require('../../models/Restaurant')

function listRestaurants (req, res) {
  const { projection, limit, skip } = req

  Restaurant
         .find(null, projection)
         .limit(limit)
         .skip(skip)
         .then(restaurants => {
           res.json(restaurants)
         })
}

module.exports = listRestaurants
