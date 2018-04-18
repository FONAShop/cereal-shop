const User = require('./user')
const Product = require('./product')
const Review = require('./review')
const Order = require('./order')
const db = require('../db')
const Sequelize = require('sequelize')

const OrderProduct = db.define('order_product', {
  quantity: {
    type: Sequelize.INTEGER
  }
});

//Associations
Order.belongsToMany(Product, { through: OrderProduct});
Product.belongsToMany(Order, { through: OrderProduct});

Order.belongsTo(User);
// User.hasMany(Order) ?

Review.belongsTo(User); // other direction?
Review.belongsTo(Product); // ""

module.exports = {
  User,
  Product,
  Review,
  Order
}
