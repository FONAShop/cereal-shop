import React from 'react'
import { connect } from 'react-redux';
import { addProductToCart } from '../store';
import { Card, Image, Button, Icon, Label } from 'semantic-ui-react';

const Product = ({ product, addButtonClick }) => (
  <Card href={`product/${product.id}`} color="green" style={{ margin: '2em'}}>
    <Image rounded height="300" src={product.imgUrl} />
    <Card.Content>
    <Card.Header>{product.name}</Card.Header>
    <Label tag color="green" style={{ marginTop: '0.5em'}}>{'$' + product.price}</Label>
    <Button icon name={product.id} onClick={addButtonClick} floated="right" size="small">
      <Icon name="add to cart" />
    </Button>
    </Card.Content>
  </Card>
)


const mapDispatch = dispatch => {
  return {
    addButtonClick(event) {
      const productId = { productId: event.target.name };
      dispatch(addProductToCart(productId));
    }
  };
};

export default connect(null, mapDispatch)(Product);
