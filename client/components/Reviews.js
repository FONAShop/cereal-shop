import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProductReviews, writeReview, postReview } from '../store';
import { Rating, Header, Button, Divider, Form } from 'semantic-ui-react';

class Reviews extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadReviews(this.props.productId);
  }

  render() {
    const { reviews, newReviewEntry, isLoggedIn, handleContent, handleRate, handleSubmit, userId, productId } = this.props;
    return (
      <div>
        <Header as="h1">Reviews</Header>
        {reviews.map(review => {
          return (
            <div key={review.id}>
              <Header as="h2" style={{ fontSize: '1.33em' }}>User: {review.userId}</Header>
              <Rating icon="star" defaultRating={review.rating} maxRating={5} />
              <p style={{ fontSize: '1.2em' }}>{review.content}</p>
              <Divider />
            </div>
          )
        })}
        {isLoggedIn ? (
          <Form name="productReview" onSubmit={evt => handleSubmit(userId, productId, newReviewEntry, evt)}>
            <Form.Field>
              <label>Rating: </label>
              <Rating
                icon="star" maxRating={5}
                name="rating"
                defaultRating={newReviewEntry.rating}
                onRate={handleRate} />
            </Form.Field>
            <Form.Field>
            <label style={{ fontWeight: 'bold' }}>Comments</label>
            <textarea
              name="content"
              cols="70" rows="7"
              value={newReviewEntry.content}
              onChange={handleContent}
              placeholder="Write your review here..." />
            </Form.Field>
            <Button type="submit">Submit</Button>
          </Form>
        ) : <div /> }
      </div>
    )
  }
}

const mapState = state => {
  return {
    reviews: state.reviews.allReviews,
    newReviewEntry: state.reviews.newReviewEntry,
    isLoggedIn: !!state.user.id,
    userId: state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    loadReviews(productId) {
      dispatch(fetchProductReviews(productId));
    },
    handleRate (evt, { rating }) {
      dispatch(writeReview({ rating }));
    },
    handleContent (evt) {
      dispatch(writeReview({ content: evt.target.value}));
    },
    handleSubmit (uid, pid, review, evt) {
      evt.preventDefault();
      dispatch(postReview({ ...review, userId: uid, productId: pid }));
      dispatch(writeReview({ rating: 0, content: '' }));
    }
  };
};

export default connect(mapState, mapDispatch)(Reviews);
