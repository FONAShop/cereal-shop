const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  content: {
    type: Sequelize.TEXT,
    validate: {
      len: [50, 300]
    }
  },
  rating: {
    type: Sequelize.INTEGER
  }
})

module.exports = Review
