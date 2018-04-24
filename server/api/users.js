const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  if (req.user !== undefined && req.user.isAdmin){
    User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    .then(users => res.json(users))
    .catch(next)
  } else {
    res.status(404).send('Admin privileges are required to view this information.')
  }
})
