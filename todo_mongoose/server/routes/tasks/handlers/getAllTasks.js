const toDo = require('../../../models/toDo')

function getAllTasks(req, res) {

    toDo.find()
        .then(toDos => {
            // res.json(toDos)
            res.render('index.pug', { toDos })

        })
}

module.exports = getAllTasks
