const router = require('express').Router()
const { Cart, CartProduct } = require('../db/models')

router.get('/', (req, res, next) => {
  if (req.user !== undefined){ // if user is logged in
    Cart.findOne({ where: { userId: req.user.id }})
    .then(cartInDB => {
      if (cartInDB) { //if a previous cart was saved in DB
        CartProduct.findAll({where: {cartId: cartInDB.id }})
        .then(foundProductsInDB => { //previous cart had contents
          foundProductsInDB.forEach(productInCart => { // add previous content into current session.cart
            req.session.cart[productInCart.productId] = productInCart.quantity
          })
        })
        .catch(next)
      } else {
        res.json(req.session.cart)
      }
    })
    .catch(next)
  } else {
    res.json(req.session.cart);
  }
});

router.put('/add', (req, res, next) => {
  let cart = req.session.cart, { productId } = req.body;
  cart[productId] = (cart[productId] || 0) + 1;
  res.json({ [productId]: cart[productId] });
});

router.put('/minus', (req, res, next) => {
  let cart = req.session.cart, { productId } = req.body;
  if (!cart[productId]) {
    res.status(404).json('Product Not in Cart');
  } else {
    cart[productId] = (cart[productId] > 1) ? cart[productId] - 1 : 1;
    res.json({ [productId]: cart[productId] });
  }
});

router.put('/delete', (req, res, next) => {
  let cart = req.session.cart, { productId } = req.body;
  if (!cart[productId]) {
    res.status(404).json('Product Not in Cart');
  } else {
    delete cart[productId];
    res.json(cart);
  }
});

module.exports = router;
