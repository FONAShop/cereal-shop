const User = require("./user");
const Product = require("./product");
const Review = require("./review");
const Order = require("./order");
const OrderProduct = require("./orderProduct");
const db = require("../db");
const Sequelize = require("sequelize");

//Associations
Order.belongsToMany(Product, { through: OrderProduct });
Product.belongsToMany(Order, { through: OrderProduct });

Order.belongsTo(User);
User.hasMany(Order);

Review.belongsTo(User);
User.hasMany(Review);

Review.belongsTo(Product);
Product.hasMany(Review);

module.exports = {
  User,
  Product,
  Review,
  Order,
  OrderProduct
};
