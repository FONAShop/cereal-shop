const Sequelize = require('sequelize')
const db = require('../db')

const order = db.define('order', {
  status: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = order;
