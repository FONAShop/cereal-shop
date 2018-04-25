import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCart, addProductToCart, minusFromCart, deleteProductFromCart } from '../store';
import { Link } from 'react-router-dom';
import { Header, Button, Item, Image as ImageComponent } from 'semantic-ui-react';

class Cart extends Component {
  componentDidMount() {
    this.props.loadCart();
  }

  render() {
    const { cart, cartProducts, handleClickAdd, handleClickMinus, handleClickDelete } = this.props;
    if (!cartProducts) {
      return <div />;
    } else if (cartProducts.length < 1) {
      return <Header>Your cart is empty.</Header>
    } else {
      return (
        <div>
          <Item.Group divided>
            { cartProducts.map(product => (
                <Item key={product.id}>
                  <Item.Image href={`product/${product.id}`} src={product.imgUrl} alt={product.name} style={{ marginRight: '3em'}} />
                  <Item.Content>
                    <Item.Header as="a" href={`product/${product.id}`}>{product.name}</Item.Header>
                    <Item.Meta>
                      <span>{'$' + product.price}</span>
                    </Item.Meta>
                    <span> Quantity: </span>
                    <Button size="mini" circular name={product.id} onClick={handleClickMinus} style={{ padding: '0.4em 0.6em 0.6em', margin: '0em 0.3em'}}>-</Button>
                    <span>{cart[product.id]}</span>
                    <Button size="mini" circular name={product.id} onClick={handleClickAdd} style={{ padding: '0.4em 0.6em 0.6em', margin: '0em 0.3em'}}>+</Button>
                    <p>{' Subtotal: $' + (product.price * cart[product.id]).toFixed(2)}</p>
                    <Button size="mini" circular name={product.id} onClick={handleClickDelete} style={{ padding: '0.4em 0.6em 0.6em', margin: '0em 0.3em'}}>Delete</Button>
                  </Item.Content>
                </Item>
              ))

            }
          </Item.Group>
          <Header>Total: ${this.getTotal()}</Header>
          <Link to={'/checkout'}><Button>Checkout</Button></Link>
        </div>
      );
    }
  }

  getTotal () {
    const { cartProducts, cart } = this.props;
    return (cartProducts.reduce((subtotal, product) => subtotal + product.price * cart[product.id], 0)).toFixed(2);
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
