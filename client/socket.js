import io from 'socket.io-client';
import store, { getReview } from './store';

const socket = process.env.NODE_ENV === 'test' ? { on: function(){}, emit: function(){} } : io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!');

  socket.on('new-review', review => {
    store.dispatch(getReview(review));
  });
})

export default socket
