const toDo = require('../../../models/toDo')

function listTask(req, res) {
    toDo
        .find((err, tasks) => {
        	res.render('index.pug', { tasks })
        })
        .catch(err => {
            res.json(err)
        })
}
module.exports = listTask