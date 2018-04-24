const Sequelize = require('sequelize');
const db = require('../db');

const CartProduct = db.define('cart_product', {
  quantity: {
    type: Sequelize.INTEGER
  }
});

module.exports = CartProduct;
