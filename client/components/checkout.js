import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCart, addOrder } from '../store';
import { Link } from 'react-router-dom';
/*eslint-disable react/prefer-stateless-function */

class checkout extends Component {
  componentDidMount () {
    this.props.loadCart();
  }

  render () {
    const { handleSubmit, cart, cartProducts, user } = this.props;
    if (!cartProducts) {
      return <div />;
    } else if (cartProducts.length < 1) {
      return <p>Your cart is empty.</p>
    } else {
      return (
        <div>
          <form onSubmit={handleSubmit} name={user.id}>
            <div>
              <label htmlFor="shippingAddress"><small>Shipping Address</small></label>
              <input name="shippingAddress" type="text" />
            </div>
            <div>
              <label htmlFor="email"><small>Email</small></label>
              <input name="email" type="text" />
            </div>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
          <div>
            {
              cartProducts.map(product => (
                <div key={product.id}>
                  <Link to={`product/${product.id}`}>
                    <img src={product.imgUrl} alt={product.name} />
                  </Link>
                  <Link to={`product/${product.id}`}>{product.name}</Link>
                  <span>{' Price: $' + product.price}</span>
                  <span> Quantity: </span>
                  <span>{cart[product.id]}</span>
                  <span>{' Subtotal: $' + product.price * cart[product.id].toFixed(2)}</span>
                </div>
              ))
            }
          <hr />
          <p>Total: ${this.getTotal()}</p>
          </div>
        </div>
      );
    }
  }

  getTotal () {
    const { cartProducts, cart } = this.props;
    return (cartProducts.reduce((subtotal, product) => subtotal + product.price * cart[product.id], 0)).toFixed(2);
  }
}


const mapStateToProps = ({ cart, product, user }) => {
  const cartProducts = product.allProducts.filter(pt => cart.hasOwnProperty(pt.id));
  return { cart, cartProducts, user };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadCart() {
      dispatch(fetchCart());
    },
    handleSubmit (evt) {
      evt.preventDefault();
      const objPayload = {
        status: 'Submitted',
        shippingAddress: evt.target.shippingAddress.value,
        email: evt.target.email.value,
      };
      dispatch(addOrder(objPayload, ownProps.history));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(checkout);
