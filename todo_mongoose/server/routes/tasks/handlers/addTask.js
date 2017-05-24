const toDo = require('../../../models/toDo')

function addTask (req, res) {
    const { task, dateOfUpdate, completed } = req.body
    const newToDo = new toDo({ task, dateOfUpdate: +new Date(), completed })
    newToDo.save()
        .then(msg => {
            res.json(msg)
            console.log('all was')
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports = addTask