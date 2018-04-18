const Sequelize = require('sequelize')
const db = require('../db')

const order = db.define('order', { // const Order
  status: { // separate table?
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = order;
