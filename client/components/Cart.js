import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCart, addProductToCart, minusFromCart, deleteProductFromCart } from '../store';

class Cart extends Component {
  componentDidMount() {
    this.props.loadCart();
  }

  render() {
    const { cart } = this.props;
    console.log(cart);
    if (!cart) {
      return <div />;
    } else if (Object.keys(cart).length === 0 && cart.constructor === Object) {
      return <p>Your cart is empty.</p>
    } else {
      return (
        <div>
        </div>
      );
    }
  }
}

const mapState = ({ cart, product }, ownProps) => {
  const { allproducts } = product;
  console.log(product);
  return { allproducts };
};

const mapDispatch = dispatch => {
  return {
    loadCart() {
      dispatch(fetchCart());
    }
  };
};

export default connect(mapState, mapDispatch)(Cart);
