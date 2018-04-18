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
  price: { // think about just storing cents as an int
    // and using virtual getter / setter for conversion
    type: Sequelize.FLOAT,
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
    defaultValue: 'https://c1.staticflickr.com/1/525/20123314076_fd18b5ede6_b.jpg'
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
