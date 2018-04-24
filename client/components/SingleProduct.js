import React, { Component } from 'react';
import Reviews from './Reviews';
import { connect } from 'react-redux'
import { addProductToCart } from '../store'
import { Container, Header, Label, Button, Icon, Grid, Segment, Image } from 'semantic-ui-react';


class SingleProduct extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    const productDetails = this.props.selectedProduct
    const { addButtonClick } = this.props;
    return (
      <Container>
        { productDetails && (
            <div key={productDetails.id}>
            <Segment style={{ padding: '5em 0em' }}>
              <Grid container stackable>
              <Grid.Row>
              <Grid.Column width={6}>
              <Image src={productDetails.imgUrl} rounded size="large" />
              </Grid.Column>
              <Grid.Column floated="right" width={8}>
              <Header as="h1">{productDetails.name}</Header>
              <Header as="h2">{'$' + productDetails.price}</Header>
              <p style={{ fontSize: '1.33em' }}>{'Description: ' + productDetails.description}</p>
              <Button name={productDetails.id} onClick={addButtonClick}>Add to cart</Button>
              </Grid.Column>
              </Grid.Row>
              </Grid>
              </Segment>
            <Reviews productId={productDetails.id} />
            </div>
          )
        }
      </Container>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const paramId = Number(ownProps.match.params.id);
  const selectedProduct = state.product.allProducts.find(
    product => product.id === paramId
  );
  return {
    selectedProduct,
    allProducts: state.allProducts,
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    addButtonClick (event) {
      const productId = {productId: event.target.name};
      dispatch(addProductToCart(productId));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
