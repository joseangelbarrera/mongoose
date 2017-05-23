// Import the 'Restaurant' schema
const Restaurant = require('../../models/Restaurant')

function listById (req, res) {
  const { projection, limit, skip } = req
  const { id } = req.params

  Restaurant
    .findById(id, projection)
    .limit(limit)
    .skip(skip)
    .then(restaurants => {
      res.json(restaurants)
    })
}

module.exports = listById
