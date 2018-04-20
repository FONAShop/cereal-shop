import axios from 'axios';
import store from '.';

/**
 * ACTION TYPES
 */
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
const GET_PRODUCT = 'GET_PRODUCT';
const FILTER_PRODUCTS = 'FILTER_PRODUCTS';
const FIND_PRODUCT = 'FIND_PRODUCT';

/**
 * INITIAL STATE
 */
const initialState = {
  allProducts: [],
  selectedProduct: {},
  filteredProducts: [],
  foundProduct: {}
};

/**
 * ACTION CREATORS
 */
const filterProducts_ActionCreator = filteredProducts => ({
  type: FILTER_PRODUCTS,
  filteredProducts
});

const findProduct_ActionCreator = foundProduct => ({
  type: FIND_PRODUCT,
  foundProduct
});

const getAllProducts = allProducts => ({
  type: GET_ALL_PRODUCTS,
  allProducts
});

const getProduct = selectedProduct => ({
  type: GET_PRODUCT,
  selectedProduct
});

/**
 * THUNK CREATORS
 */
export const fetchProducts = () => dispatch => {
  return axios
    .get('/api/products')
    .then(res => res.data)
    .then(allProducts => {
      dispatch(getAllProducts(allProducts));
    })
    .catch(err => console.log(err));
};

export const fetchProduct = productId => dispatch => {
  return axios
    .get(`/api/products/${productId}`)
    .then(res => res.data)
    .then(selectedProduct => dispatch(getProduct(selectedProduct)))
    .catch(err => console.log(err));
};

export const filterProducts = entry => {
  return function thunk(dispatch) {
    const allProducts = store.getState().product.allProducts;

    const filteredProducts = allProducts.filter(product => {
      if (product.name.toUpperCase().indexOf(entry.toUpperCase()) != -1) return true;
    });

    dispatch(filterProducts_ActionCreator(filteredProducts));
  };
};

export const findItem = title => {
  return function thunk(dispatch) {
    const allProducts = store.getState().product.allProducts;
    const foundProduct = allProducts.find(product => product.name === title);
    dispatch(findProduct_ActionCreator(foundProduct));
  };
};

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case FIND_PRODUCT:
      return { ...state, foundProduct: action.foundProduct };

    case FILTER_PRODUCTS:
      return { ...state, filteredProducts: action.filteredProducts };

    case GET_ALL_PRODUCTS:
      return { ...state, allProducts: action.allProducts };

    case GET_PRODUCT:
      return Object.assign({}, state, {selectedProduct: action.selectedProduct });
    default:
      return state;
  }
}
