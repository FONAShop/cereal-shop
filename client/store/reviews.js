import axios from 'axios';
import socket from '../socket';

//ACTION TYPES
const GET_REVIEWS = 'GET_REVIEWS';
const GET_REVIEW = 'GET_REVIEW';
const WRITE_REVIEW = 'WRITE_REVIEW';

//INITIAL STATE { }
const initialState = {
  allReviews: [],
  newReviewEntry: { rating: 0, content: '' }
};

//ACTION CREATORS
const getProductReviews = reviews => ({type: GET_REVIEWS, reviews});
export const getReview = review => ({type: GET_REVIEW, review});
export const writeReview = review => ({type: WRITE_REVIEW, review});

//THUNK CREATORS
export const fetchProductReviews = productId => dispatch =>
    axios.get(`/api/reviews/products/${productId}`)
      .then(res =>
        dispatch(getProductReviews(res.data)))
      .catch(err => console.log(err))

export const postReview = review => dispatch =>
    axios.post('/api/reviews', review)
      .then(res => res.data)
      .then(newReview => {
        dispatch(getReview(newReview));
        socket.emit('new-review', newReview);
      })
      .catch(err => console.log(err))

//REDUCER
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_REVIEWS:
      return { ...state, allReviews: action.reviews };
    case GET_REVIEW:
      return { ...state, allReviews: [...state.allReviews, action.review] };
    case WRITE_REVIEW:
      return { ...state, newReviewEntry: { ...state.newReviewEntry, ...action.review } };
    default:
      return state
  }
}
