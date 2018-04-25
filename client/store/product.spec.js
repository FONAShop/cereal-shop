/* global describe beforeEach afterEach it */

const chai = require('chai');
const expect = chai.expect;
import reducer, {
  GET_ALL_PRODUCTS,
  GET_PRODUCT,
  getAllProducts,
  getProduct
} from './product';
// const db = require('../../server/db');
// const Product = db.model('product');

//======================================================================================================//

describe('Products Store |', () => {
  let frostedFlakes, cheerios, products;

  beforeEach(function() {
    frostedFlakes = {
      name: 'Frosted Flakes',
      description:
        'The most popular and my personal choise. xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.',
      price: 6,
      quantity: 21
    };

    cheerios = {
      name: 'Cheerios',
      description:
        'This is N1 in the `Top-50` list. xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.',
      price: Math.round(6 * 100),
      quantity: 30
    };

    products = [frostedFlakes, cheerios];
  });

  describe('action creators |', () => {
    describe('`getAllProducts` action creator', () => {
      it('returns an Object', () => {
        const getAllProductsAction = getAllProducts(products);
        expect(typeof getAllProductsAction).to.equal('object');
        expect(Object.getPrototypeOf(getAllProductsAction)).to.equal(
          Object.prototype
        );
      });

      it('creates an object with `type` and `allProducts`', () => {
        const getAllProductsAction = getAllProducts(products);
        expect(getAllProductsAction.type).to.equal(GET_ALL_PRODUCTS);
        // expect(Array.isArray(getAllProductsAction.allProducts)).to.be.true;
        expect(getAllProductsAction.allProducts[0].name).to.equal(
          'Frosted Flakes'
        );
      });
    });

    //=======================================================================================================//

    describe('`getProduct` action creator', () => {
      it('returns an Object', () => {
        const getProductAction = getProduct(products[1]);
        expect(typeof getProductAction).to.equal('object');
        expect(Object.getPrototypeOf(getProductAction)).to.equal(
          Object.prototype
        );
      });

      it('creates an object with `type` and `selectedProduct`', () => {
        const getProductAction = getProduct(products[1]);
        expect(getProductAction.type).to.equal(GET_PRODUCT);
        expect(getProductAction.selectedProduct.name).to.equal('Cheerios');
      });
    });
  }); // end of 'action creators'.

  //=======================================================================================================//

  describe('reducer', () => {
    const initialState = {
      allProducts: [],
      selectedProduct: {},
      searchEntry: ''
    };

    const product = {
      name: 'Frosted Flakes',
      description:
        'The most popular and my personal choise. xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.',
      price: 6,
      quantity: 21
    };

    const newState = reducer(initialState, {
      type: GET_PRODUCT,
      selectedProduct: product
    });

    it('returns a new state with the new product', () => {
      expect(newState.selectedProduct).to.equal(product);
    });

    it('does not modify the previous state', () => {
      expect(initialState).to.deep.equal({
        allProducts: [],
        selectedProduct: {},
        searchEntry: ''
      });
    });
  }); // end of 'reducer'.
}); // end of 'Products Store |'.
