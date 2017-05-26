const express = require('express')
const router = express.Router()

const getAllTasks = require('./handlers/getAllTasks')
const addTask= require('./handlers/addTask')

router.post('/', addTask)
router.get('/', getAllTasks)

module.exports = router