const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
        notEmpty: true,
        min: 0
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
        notEmpty: true,
        min: 0
    }
  },
  imgUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
        isUrl: true
    }
  },
  categories: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: [],
    set: function (categories) {

        categories = categories || [];

        if (typeof categories === 'string') {
            categories = categories.split(',').map(function (str) {
                return str.trim();
            });
        }

        this.setDataValue('categories', categories);

    }
  }
})

module.exports = Product;
