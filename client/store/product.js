import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
const GET_PRODUCT = 'GET_PRODUCT';
const GOT_NEW_SEARCH_ENTRY = 'GOT_NEW_SEARCH_ENTRY';

/**
 * INITIAL STATE
 */
const initialState = {
  allProducts: [],
  selectedProduct: {},
  searchEntry: ''
};

/**
 * ACTION CREATORS
 */
const getAllProducts = allProducts => ({
  type: GET_ALL_PRODUCTS,
  allProducts
});

const getProduct = selectedProduct => ({
  type: GET_PRODUCT,
  selectedProduct
});

export const gotNewSearchEntry = searchEntry => ({
  type: GOT_NEW_SEARCH_ENTRY,
  searchEntry
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

/**
 * REDUCER
 */
export default function (state = initialState, action) {

  switch (action.type) {

    case GET_ALL_PRODUCTS:
      return { ...state, allProducts: action.allProducts };

    case GET_PRODUCT:
      return { ...state, selectedProduct: action.selectedProduct };

    case GOT_NEW_SEARCH_ENTRY:
      return { ...state, searchEntry: action.searchEntry };

    default:
      return state;
  }
}
