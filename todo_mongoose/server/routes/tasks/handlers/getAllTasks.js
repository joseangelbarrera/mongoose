const toDo = require('../../../models/toDo')

function getAllTasks(req, res) {

    toDo.find()
        .then(toDos => {
            res.json(toDos)
        })
}

module.exports = getAllTasks
