const router = require('express').Router();
const { Review, User } = require('../db/models');
module.exports = router;

router.get('/products/:id', (req, res, next) => {
  Review.findAll({
    where: {
      productId: req.params.id
    }
  })
    .then(reviews => res.json(reviews))
    .catch(next)
});

router.post('/', (req, res, next) => {
  Review.create(req.body)
    .then(review => res.json(review))
    .catch(next)
})
