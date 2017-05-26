const express = require('express')
const router = express.Router()

const addTask= require('./handlers/addTask')
const getAllTasks = require('./handlers/getAllTasks')
const listTask = require('./handlers/listTask')

router.get('/', listTask)
router.get('/', getAllTasks)
router.post('/', addTask)

module.exports = router

    
