const router = require('express').Router()
const User = require('../db/models/user')
const { Cart, Product, CartProduct } = require('../db/models')
module.exports = router

router.post('/login', (req, res, next) => {
  User.findOne({where: {email: req.body.email}})
    .then(user => {
      if (!user) {
        console.log('No such user found:', req.body.email)
        res.status(401).send('Wrong username and/or password')
      } else if (!user.correctPassword(req.body.password)) {
        console.log('Incorrect password for user:', req.body.email)
        res.status(401).send('Wrong username and/or password')
      } else {
        req.login(user, err => (err ? next(err) : res.json(user)))
      }
    })
    .catch(next)
})

router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      req.login(user, err => (err ? next(err) : res.json(user)))
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists')
      } else {
        next(err)
      }
    })
})

router.post('/logout', (req, res, next) => {
  const logOutAndDeleteSession = function(){
    req.logout()
    req.session.destroy()
    res.redirect('/')
  }
  let sessionCart = req.session.cart
  let productsToUpdate = [];
  Cart.findOrCreate({where: { userId: req.user.id}})
  .then(([newCart]) => {
    return newCart.setUser(req.user.id)
  })
  .then( newCart => {
    CartProduct.destroy({where: { cartId: newCart.id }})
    .then(removedRows => console.log('removedRows', removedRows))
    .then(() => {
      for (let productId in sessionCart){
        productsToUpdate.push(Product.findById(productId))
      }

      Promise.all(productsToUpdate)
      .then(productInStock => { //finds the correct product instance
        productInStock.map(eachProduct => {
          newCart.addProducts(eachProduct, { //adds a row to through table
            through: { //updates attribute on through table
              quantity: sessionCart[eachProduct.id]
            }
          })
        })
      })

    })
    .then(() => logOutAndDeleteSession())
    .catch(next)
  })
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
