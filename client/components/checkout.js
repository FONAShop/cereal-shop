import React, { Component } from 'react';
import { connect } from 'react-redux';
//Are we simulating checkout or using stripe?

const checkout = (props) => {
  const { handleSubmit } = props;
  return (
    <div>
      <form onSubmit={handleSubmit} name="checkout">
        <div>
          <label htmlFor="shipping-address"><small>Shipping Address</small></label>
          <input name="shipping-address" type="text" />
        </div>
        <div>
          <label htmlFor="email"><small>Email</small></label>
          <input name="email" type="text" />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    //cart: state.cart
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault();
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(checkout);
