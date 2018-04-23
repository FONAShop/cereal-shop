import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCart, addProductToCart, minusFromCart, deleteProductFromCart } from '../store';
import { Link } from 'react-router-dom';

class Cart extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadCart();
  }

  render() {
    const { cart, cartProducts, handleClickAdd, handleClickMinus, handleClickDelete } = this.props;
    if (!cartProducts) {
      return <div />;
    } else if (cartProducts.length < 1) {
      return <p>Your cart is empty.</p>
    } else {
      return (
        <div>
          { cartProducts.map(product => (
              <div key={product.id}>
                <Link to={`product/${product.id}`}>
                  <img src={product.imgUrl} alt={product.name} />
                </Link>
                <Link to={`product/${product.id}`}>{product.name}</Link>
                <span>{' Price: $' + product.price}</span>
                <span> Quantity: </span>
                <button name={product.id} onClick={handleClickMinus}>-</button>
                <span>{cart[product.id]}</span>
                <button name={product.id} onClick={handleClickAdd}>+</button>
                <span>{' Subtotal: $' + (product.price * cart[product.id]).toFixed(2)}</span>
                <button name={product.id} onClick={handleClickDelete}>x</button>
              </div>
            ))

          }
          <hr />
          <p>Total: ${this.getTotal(cartProducts, cart)}</p>
          <Link to={'checkout'}>Checkout</Link>
        </div>
      );
    }
  }

  getTotal(cartProducts, cart) {
    return (cartProducts.reduce((subtotal, product) => subtotal + product.price * cart[product.id],0)).toFixed(2);
  }
}

const mapState = ({ cart, product }) => {
  const cartProducts = product.allProducts.filter(pt => cart.hasOwnProperty(pt.id));
  return { cart, cartProducts };
};

const mapDispatch = dispatch => {
  return {
    loadCart() {
      dispatch(fetchCart());
    },
    handleClickAdd(event) {
      const productId = { productId: event.target.name };
      dispatch(addProductToCart(productId));
    },
    handleClickMinus(event) {
      const productId = { productId: event.target.name };
      dispatch(minusFromCart(productId));
    },
    handleClickDelete(event) {
      const productId = { productId: event.target.name };
      dispatch(deleteProductFromCart(productId));
    }
  };
};

export default connect(mapState, mapDispatch)(Cart);
