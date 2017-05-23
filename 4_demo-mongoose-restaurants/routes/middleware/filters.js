function filters (req, res, next) {
  const { show, hide, page = 1, limit = 20 } = req.query // GET http://localhost:3000/restaurant/5922c079e1f5f9e8a6ad0f99?show=name,cuisine,borough&hide=_id → {show: 'name,cuisine,borough', hide: '_id'}
  let projection = {}

  if (show) {
    const fieldsToShow = show.split(',') // var show = ['name','cuisine', 'borough']
    fieldsToShow.forEach(field => projection[field] = 1) // var projection = {name: 1, cuisine: 1, borough: 1}
  }

  if (hide) {
    const fieldsToShow = hide.split(',') // var hide = ['_id']
    fieldsToShow.forEach(field => projection[field] = 0) // var projection = {_id: 0}
  }

    // Save 'projection', 'limit' and 'skip' in the request for have access in the endpoints
  req.projection = projection
  req.limit = +limit
  req.skip = limit * (page - 1)

  next()
}

module.exports = filters
