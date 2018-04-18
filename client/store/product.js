import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
const GET_PRODUCT = 'GET_PRODUCT';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

/**
 * INITIAL STATE
 */
const allProducts = [];

/**
 * ACTION CREATORS
 */
const getAllProducts = products => ({
  type: GET_ALL_PRODUCTS,
  products
});
const getProduct = product => ({
  type: GET_PRODUCT,
  product
});
// Next line might be wrong !!!! NEEDS TO REFACTOR !!!
const removeProduct = allRemainingProducts => ({
  type: REMOVE_PRODUCT,
  allRemainingProducts
});

/**
 * THUNK CREATORS
 */
export const fetchProducts = () => dispatch => {
//   console.log('====== getting products: ');
  return axios
    .get('/api/products')
    .then(res => res.data)
    .then(products => {
    //   console.log('====== products: ', products);
      dispatch(getAllProducts(products));
    })
    .catch(err => console.log(err));
};

export const fetchProduct = productId => dispatch => {
  return axios
    .get(`/api/products/${productId}`)
    .then(res => res.data)
    .then(product => dispatch(getProduct(product)))
    .catch(err => console.log(err));
};

/**
 * ????? This thunk needs to be refactored !!!!
 */
export const deleteProduct = productId => dispatch => {
  return axios
    .delete(`/api/products/${productId}`)
    .then(res => res.data)
    .then(allRemainingProducts => dispatch(removeProduct(allRemainingProducts)))
    .catch(err => console.log(err));
};

/**
 * REDUCER
 */
export default function(state = allProducts, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products;

    case GET_PRODUCT:
      return [...state, action.product];

    // ??? MIGHT BE WRONG !!! REFACTOR !!!
    case REMOVE_PRODUCT:
      return action.allRemainingProducts;

    default:
      return state;
  }
}
