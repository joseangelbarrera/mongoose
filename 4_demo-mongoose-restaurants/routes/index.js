const express = require('express')
const router = express.Router()

const listRestaurants = require('./handlers/listRestaurants')
const listRestaurantsByCuisine = require('./handlers/listRestaurantsByCuisine')
const listNotCuisine = require('./handlers/listNotCuisine')
const listRestaurantsByBorough = require('./handlers/listRestaurantsByBorough')
const listById = require('./handlers/listById')
const listByLocation = require('./handlers/listByLocation')

router.get('/restaurants', listRestaurants)
router.get('/restaurants/borough/:borough', listRestaurantsByBorough)
router.get('/restaurants/cuisine/:cuisine', listRestaurantsByCuisine)
router.get('/restaurants/cuisine/not/:cuisine', listNotCuisine)
router.get('/restaurant/:id', listById)
router.get('/restaurant/:id/around/:km', listByLocation)

module.exports = router
