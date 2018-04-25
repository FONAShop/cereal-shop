/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Product = db.model('product');

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('/api/products/', () => {
    const cerName = 'Frosted Flakes';

    beforeEach(() => {
      return Product.create({
        name: cerName,
        description:
          'more than 50: qqqqqqqqqqqqwwwwwwwwwweeeeeeeeeerrrrrrrrrrrttttttttttyyyyyyyyyyetyu',
        price: 7,
        quantity: 1000,
        category: '',
        imgUrl: 'https://c1.staticflickr.com/1/525/20123314076_fd18b5ede6_b.jpg'
      });
    });

    it('GET /api/products', () => {
      return request(app)
        .get('/api/products')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].name).to.be.equal(cerName);
        });
    });
  }); // end describe('/api/products')
}); // end describe('Product routes')
