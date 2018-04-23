import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCart, addOrder } from '../store';
import { Link } from 'react-router-dom';
/*eslint-disable react/prefer-stateless-function */

class checkout extends Component {
  constructor (props) {
    super(props);
  }

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
                  <span>{' Subtotal: $' + product.price * cart[product.id]}</span>
                </div>
              ))

            }
          </div>
        </div>
      );
    }
  }
}


const mapStateToProps = ({ cart, product, user }) => {
  const cartProducts = product.allProducts.filter(pt => cart.hasOwnProperty(pt.id));
  return { cart, cartProducts, user };
};

const mapDispatchToProps = dispatch => {
  return {
    loadCart() {
      dispatch(fetchCart());
    },
    handleSubmit (evt) {
      evt.preventDefault();
      const objPayload = {
        shippingAddress: evt.target.shippingAddress.value,
        email: evt.target.email.value,
        userId: evt.target.name
      };
      dispatch(addOrder(objPayload));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(checkout);
