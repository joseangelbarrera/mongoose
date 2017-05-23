// Import the 'Restaurant' schema
const Restaurant = require('../../models/Restaurant')

function listByLocation (req, res) {
  const { projection, limit, skip } = req
  const { id, km } = req.params

  Restaurant
         .findById(id, projection)
         .limit(limit)
         .skip(skip)
         .then(restaurants => {
           let ll = (restaurants.address.coord)
           let around = {
             'address.coord': {
               $near: {
                 $geometry: { type: 'Point', coordinates: ll },
                 $maxDistance: km * 1000
               }
             }
           }

           Restaurant
                 .find(around, projection)
                 .limit(limit)
                 .skip(skip)
                 .then(restaurants => {
                   res.json(restaurants)
                 })
         })
}

module.exports = listByLocation
