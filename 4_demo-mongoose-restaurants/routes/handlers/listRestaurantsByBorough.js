// Import the 'Restaurant' schema
const Restaurant = require('../../models/Restaurant')

function listRestaurantsByBorough (req, res) {
  const { projection, limit, skip } = req
  const { borough } = req.params

  Restaurant
        .find({ borough }, projection)
        .limit(limit)
        .skip(skip)
        .then(restaurants => {
          res.json(restaurants)
        })
}

module.exports = listRestaurantsByBorough
