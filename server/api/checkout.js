const router = require('express').Router()
const { Order, OrderProduct, User, Product } = require('../db/models')
const Promise = require('bluebird');
module.exports = router;
/* eslint-disable guard-for-in*/

router.post('/', (req, res, next) => {
  return Order.create(req.body)
    .tap(order => {
      if (!req.user) {
        req.user = { id: null };
      }
      return order.setUser(req.user.id); //this returns a promise?
    })
    .then((order) => {
      const productIdArr = Object.keys(req.session.cart);
      return Promise.map(productIdArr, productId => {
        return Product.findById(productId)
      })
        .then(products => {
          return Promise.map(products, product => {
            return order.addProduct(product, {
              through: {
                quantity: req.session.cart[product.id]
              }
            })
          })
          .then(() => {
            req.session.cart = {};
            res.json(order);
          })
        })
    })
    .catch(next);
})
