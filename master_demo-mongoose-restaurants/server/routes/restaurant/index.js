const express = require('express')


// here we define routes. in this case wwe only have one:
const router = express.Router()

const getById = require('./handlers/byId')

router.get('/:id', getById)

module.exports = router

