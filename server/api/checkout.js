const router = require('express').Router()
const { Order, OrderProduct, User, Product } = require('../db/models')
module.exports = router;
/* eslint-disable guard-for-in*/

router.get('/', (req, res, next) => {

});

router.post('/add', (req, res, next) => {
  return Order.create({
    status: 'Submitted'
  })
    .then(order => {
      if (!req.user) {
        req.user = { id: null };
      }
      order.setUser(req.user.id);
      for (let productId in req.session.cart) {
        Product.findById(productId)
          .then(product => {
            order.addProduct(product, {
              through: {
                quantity: req.session.cart[productId]
              }
            });
          })
          .catch(next);
      }
      res.json(order);
    })
    .catch(next);
});
