import axios from 'axios';
import { fetchCart } from './cart';
import toastr from 'toastr';

//THUNK CREATORS
export function addOrder (order, history) {
  return function thunk (dispatch) {
    return axios.post('/api/checkout', order)
      .then(res => res.data)
      .then(addedOrder => {
        history.push(`/home`);
        toastr.success('Order Placed Successfully', 'SUCCESS', { closeButton: true, closeDuration: 700, positionClass: 'toast-top-middle'});
        dispatch(fetchCart());
      })
      .catch(err => console.error(`Add to orders unsuccessful`, err));
  }
}

