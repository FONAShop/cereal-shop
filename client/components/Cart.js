import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCart, addProductToCart, minusFromCart, deleteProductFromCart } from '../store';

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
                <img src={product.imgUrl} alt={product.name}/>
                <span>{product.name}</span>
                <span>{' Price: $' + product.price}</span>
                <span> Quantity: </span>
                <button name={product.id} onClick={handleClickMinus}>-</button>
                <span>{cart[product.id]}</span>
                <button name={product.id} onClick={handleClickAdd}>+</button>
                <span>{' Subtotal: $' + product.price * cart[product.id]}</span>
                <button name={product.id} onClick={handleClickDelete}>x</button>
              </div>
            ))

          }
        </div>
      );
    }
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
