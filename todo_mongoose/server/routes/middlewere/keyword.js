function apiKey (req, res, next) {

    const { keyword } = req.query

    if (keyword === "12345") {
        next()

    } else {
        res.send('you are not alowed')
    }
}

module.exports = apiKey
