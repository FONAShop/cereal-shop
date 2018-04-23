import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProductReviews } from '../store';

class Reviews extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadReviews(this.props.productId);
  }

  render() {
    const { reviews, isLoggedIn } = this.props;
    // console.log(reviews);
    return (
      <div>
        <p>Reviews</p>
        {reviews.map(review => {
          return (
            <div key={review.id}>
              <div>User: {review.user.id}</div>
              <div>Rating: {review.rating}</div>
              <div>Content: {review.content}</div>
              <hr/>
            </div>
          )
        })}
        {isLoggedIn ? (
          <form name="productReview">
            <label>Rating: </label>
            <input type="number" min="0" max="5" />
            <label>Content</label>
            <textarea name="reviewContent" cols="70" rows="7" />
            <button type="submit">Submit</button>
          </form>
        ) : <div /> }
      </div>
    )
  }
}

const mapState = state => {
  return {
    reviews: state.reviews,
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    loadReviews(productId) {
      dispatch(fetchProductReviews(productId));
    }
  };
};

export default connect(mapState, mapDispatch)(Reviews);
