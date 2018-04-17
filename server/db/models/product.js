const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
    title: {
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
    }
})

module.exports = Product;
