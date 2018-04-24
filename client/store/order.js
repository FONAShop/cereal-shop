import axios from 'axios';
import { fetchCart } from './cart';

//ACTION TYPES
const GET_ORDERS = 'GET_ORDERS';
const ADD_TO_ORDERS = 'ADD_TO_ORDERS';

const initialState = [];

// ACTION CREATORS
export function getOrders (orders) {
  return {
    type: GET_ORDERS,
    orders
  }
}

export function addToOrders (order) {
  return {
    type: ADD_TO_ORDERS,
    order
  }
}

//THUNK CREATORS
export function fetchOrders () {
  return function thunk (dispatch) {
    return axios.get('/api/checkout')
      .then(res => res.data)
      .then(orders => {
        dispatch(getOrders(orders))
      })
      .catch(err => console.error(`Fetch orders unsuccessful`, err));
  }
}

export function addOrder (order, history) {
  return function thunk (dispatch) {
    return axios.post('/api/checkout', order)
      .then(res => res.data)
      .then(addedOrder => {
        //dispatch(addToOrders(addedOrder));
        history.push(`/home`);
        dispatch(fetchCart());
      })
      .catch(err => console.error(`Add to orders unsuccessful`, err));
  }
}

// //REDUCER
// export default function reducer (state = initialState, action) {
//   switch (action.type) {
//     case GET_CART:
//       return action.cart;

//     case ADD_TO_CART:
//       return {
//         ...state,
//         ...action.product
//       }

//     case MINUS_FROM_CART:
//       return {
//         ...state,
//         ...action.product
//       }

//     case DELETE_PRODUCT_FROM_CART:
//       return action.cart;

//     default:
//       return state;
//   }
// }
