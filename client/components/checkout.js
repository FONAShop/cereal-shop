import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCart, addOrder } from '../store';
import { Header, Button, Item, Image as ImageComponent, Segment, Form } from 'semantic-ui-react';

/*eslint-disable react/prefer-stateless-function */

class Checkout extends Component {
  componentDidMount () {
    this.props.loadCart();
  }

  render () {
    const { handleSubmit, cart, cartProducts, user, isLoggedIn } = this.props;
    if (!cartProducts) {
      return <div />;
    } else if (cartProducts.length < 1) {
      return <Header>Your cart is empty.</Header>
    } else {
      return (
        <div>
          <Item.Group divided>
            {
              cartProducts.map(product => (
                <Item key={product.id}>
                  <Item.Image href={`product/${product.id}`} src={product.imgUrl} alt={product.name} style={{ marginRight: '3em'}} />
                  <Item.Content>
                  <Item.Header as="a" href={`product/${product.id}`}>{product.name}</Item.Header>
                  <Item.Meta>
                    <span>{' Price: $' + product.price}</span>
                  </Item.Meta>
                  <span> Quantity: </span>
                  <span>{cart[product.id]}</span>
                  <p>{' Subtotal: $' + product.price * cart[product.id].toFixed(2)}</p>
                  </Item.Content>
                </Item>
              ))
            }
          </Item.Group>
          <Header>Total: ${this.getTotal()}</Header>

          <Segment style={{ width: '70%', margin: '3em auto 8em' }}>
          <Form onSubmit={handleSubmit} name={user.id}>
            <Form.Field>
              <label htmlFor="shippingAddress"><small>Shipping Address</small></label>
              <input name="shippingAddress" type="text" />
            </Form.Field>
            <Form.Field>
              <label htmlFor="email"><small>Email</small></label>
              { isLoggedIn ? <input name="email" type="text" value={user.email} /> : <input name="email" type="text" />}
            </Form.Field>
              <Button type="submit">Submit</Button>
          </Form>
          </Segment>
        </div>
      );
    }
  }

  getTotal () {
    const { cartProducts, cart } = this.props;
    return (cartProducts.reduce((subtotal, product) => subtotal + product.price * cart[product.id], 0)).toFixed(2);
  }
}


const mapState = ({ cart, product, user }) => {
  const cartProducts = product.allProducts.filter(pt => cart.hasOwnProperty(pt.id));
  const isLoggedIn = !!user.id;
  return { cart, cartProducts, user, isLoggedIn };
};

const mapDispatch = (dispatch, ownProps) => {
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

export default connect(mapState, mapDispatch)(Checkout);
