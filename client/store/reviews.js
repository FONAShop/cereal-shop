import axios from 'axios'

//ACTION TYPES
const GET_REVIEWS = 'GET_REVIEWS'
// const REMOVE_USER = 'REMOVE_USER'

//INITIAL STATE { }
const initialState = [];

//ACTION CREATORS
const getProductReviews = reviews => ({type: GET_REVIEWS, reviews})
// const removeUser = () => ({type: REMOVE_USER})

//THUNK CREATORS
export const fetchProductReviews = productId => dispatch =>
    axios.get(`/api/reviews/products/${productId}`)
      .then(res =>
        dispatch(getProductReviews(res.data)))
      .catch(err => console.log(err))

//REDUCER
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_REVIEWS:
      return action.reviews
    // case REMOVE_USER:
    //   return defaultUser
    default:
      return state
  }
}
