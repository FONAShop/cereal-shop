import React, { Component } from 'react';
import Reviews from './Reviews';
import { connect } from 'react-redux'
import { addProductToCart } from '../store'
import { Container, Header, Button, Grid, Segment, Image } from 'semantic-ui-react';

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
            <Segment style={{ padding: '5em 3em' }}>
              <Grid container stackable>
                <Grid.Row>
                <Grid.Column width={6}>
                <Image src={productDetails.imgUrl} rounded size="large" />
                </Grid.Column>

                <Grid.Column floated="right" width={8}>
                <Header as="h1">{productDetails.name}</Header>
                <Header as="h2">{'$' + productDetails.price}</Header>
                { productDetails.categories.map((category, idx) => {
                  return (
                    <Button basic color="brown" size="mini" key={idx} style={{ padding: '0.4em 0.6em 0.6em', margin: '0em 0.3em'}}>{category}</Button>
                  );
                })}
                <p style={{ fontSize: '1.33em', margin: '7em 0em' }}>{'Description: ' + productDetails.description}</p>
                <Button style={{ position: 'absolute', bottom: '0' }} color="green" name={productDetails.id} onClick={addButtonClick}>Add to cart</Button>
                </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>

            <Segment style={{ padding: '3em' }}>
              <Reviews productId={productDetails.id} />
            </Segment>
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
