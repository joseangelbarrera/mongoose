// Import the 'Restaurant' schema
const Restaurant = require('../../models/Restaurant')

function listRestaurantsByCuisine (req, res) {
  const { projection, limit, skip } = req
  const { cuisine } = req.params

  Restaurant
        .find({ cuisine }, projection)
        .limit(limit)
        .skip(skip)
        .then(restaurants => {
          res.json(restaurants)
        })
}

module.exports = listRestaurantsByCuisine
