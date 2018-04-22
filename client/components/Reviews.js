import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchReviews } from '../store';

class Reviews extends Component {
  componentDidMount() {
    // this.props.loadReviews();
  }

  render() {
    return <div>Reviews</div>
  }
}

const mapState = ({ reviews }) => {
  return { reviews };
};

const mapDispatch = dispatch => {
  return {
    loadReviews() {
      dispatch(fetchReviews());
    }
  };
};

export default connect(mapState, mapDispatch)(Reviews);
