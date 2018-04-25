/* global describe beforeEach it */
const Promise = require('bluebird');
const expect = require('chai').expect;
const db = require('../index');
const Product = db.model('product');
const Review = db.model('review');

describe('The `Product` model |', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('productModelDefinition |', () => {
    let frostedFlakes, cheerios;

    beforeEach(function() {
      frostedFlakes = Product.build({
        name: 'Frosted Flakes',
        description: 'The most popular and my personal choise.',
        price: 6,
        quantity: 21
      });

      cheerios = Product.build({
        name: 'Cheerios',
        description: 'This is N1 in the `Top-50` list.',
        price: Math.round(6 * 100),
        quantity: 30
      });
    });

    // afterEach(function() {
    //   return Product.truncate({ cascade: true });
    // });

    afterEach(function() {
      return Promise.all([
        Product.truncate({ cascade: true }),
        Review.truncate({ cascade: true })
      ]);
    });

    describe('definition of Product attributes |', () => {
      
      it('includes `name`, `description`, `price`, `quantity`, `imgUrl` and `categories` fields', function () {
        return frostedFlakes.save().then(function (savedFrostedFlakes) {
          const price = Math.round(6 * 100).toString().trim();
          const realPrice = price.slice(0, -2) + '.' + price.slice(-2);
          const resultPrice = parseFloat(realPrice).toFixed(2);

          expect(savedFrostedFlakes.name).to.equal('Frosted Flakes');
          expect(savedFrostedFlakes.description).to.equal(
            'The most popular and my personal choise.'
          );
          expect(savedFrostedFlakes.price).to.eql(resultPrice);
          expect(savedFrostedFlakes.quantity).to.eql(21);
        });
      });

      it('requires `name`', function() {
        frostedFlakes.name = null;
        return frostedFlakes.validate().then(
          function() {
            throw new Error('validation should fail when name is null');
          },
          function(result) {
            expect(result).to.be.an.instanceOf(Error);
          }
        );
      });

      it('`name` can not be an empty string', function() {
        frostedFlakes.name = '';
        return frostedFlakes.validate().then(
          function() {
            throw new Error(
              'validation should fail when name is an empty string'
            );
          },
          function(result) {
            expect(result).to.be.an.instanceOf(Error);
          }
        );
      });

    }); // end describe('definition of Product attributes |')

    //=================================================================================================================================//

    describe('Associations', function () {
      it('A Product has many rewiews', function () {
        return Promise.all(['Cool product! zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz',
          'Great product! yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy',
          'Outstanding product! xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'].map(review => {
          return Review.create({ content: review, rating: 5 });
          }))
          .then(reviews => {
            return Promise.all([frostedFlakes.save(), cheerios.save()])
              .then(prods => {
                // console.log('======= reviews: ', reviews);
                return Promise.all([
                  reviews[0].setProduct(prods[0]),
                  reviews[1].setProduct(prods[0]),
                  reviews[2].setProduct(prods[0]),
                  prods[0].addReview(reviews[0]),
                  prods[0].addReview(reviews[1]),
                  prods[0].addReview(reviews[2]),
                ]);
              })
          })
          .then(() => {
            return Product.findOne({
              where: {
                name: 'Frosted Flakes'
              },
              include: [Review]
            })
              .then(product => {
                expect(product.reviews).to.be.instanceOf(Array);
                expect(product.reviews.length).to.equal(3);
              });
          });
      });
    });// end describe('Associations')
  }); // end describe('productModelDefinition |')
}); // end describe('The `Product` model |')
