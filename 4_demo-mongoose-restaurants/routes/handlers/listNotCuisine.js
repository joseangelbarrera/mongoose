// Import the 'Restaurant' schema
const Restaurant = require('../../models/Restaurant')

function listNotCuisine (req, res) {
  const { projection, limit, skip } = req
  const { cuisine } = req.params

  Restaurant
    .find({'cuisine': {$ne: cuisine}}, projection)
    .limit(limit)
    .skip(skip)
    .then(restaurants => {
      res.json(restaurants)
    })
}

module.exports = listNotCuisine
