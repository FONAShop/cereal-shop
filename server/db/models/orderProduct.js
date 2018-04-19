const Sequelize = require("sequelize");
const db = require("../db");

const OrderProduct = db.define("order_product", {
  quantity: {
    type: Sequelize.INTEGER
  }
});

module.exports = OrderProduct;
