const toDo = require('../../../models/toDo')

function getAllTasks(req, res) {
    toDo.find()
        .then(toDos => {
            res.render('index.pug', { toDos })
                // res.json(toDos)
        })
}

module.exports = getAllTasks
