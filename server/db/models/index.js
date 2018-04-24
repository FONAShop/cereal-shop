const User = require('./user');
const Product = require('./product');
const Review = require('./review');
const Order = require('./order');
const OrderProduct = require('./orderProduct');
const Cart = require('./cart')
const CartProduct = require('./cartProduct')
const db = require('../db');
const Sequelize = require('sequelize');

//Associations
Order.belongsToMany(Product, { through: OrderProduct });
Product.belongsToMany(Order, { through: OrderProduct });

Order.belongsTo(User);
User.hasMany(Order);

Review.belongsTo(User);
User.hasMany(Review);

Review.belongsTo(Product);
Product.hasMany(Review);

Cart.belongsTo(User)
Product.belongsToMany(Cart, { through: CartProduct })
Cart.belongsToMany(Product, { through: CartProduct })

module.exports = {
  User,
  Product,
  Review,
  Order,
  OrderProduct,
  Cart,
  CartProduct
};
