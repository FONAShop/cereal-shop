import React, { Component } from 'react';
import Reviews from './Reviews';

import { connect } from 'react-redux'
import { addProductToCart } from '../store'

class SingleProduct extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    const productDetails = this.props.selectedProduct
    const { addButtonClick } = this.props;
    return (
      <div>
        { productDetails && (
            <div key={productDetails.id}>
              <img src={productDetails.imgUrl} />
              <div>{'Title: ' + productDetails.name}</div>
              <div>{'Price: ' + productDetails.price}</div>
              <div>{'Desc: ' + productDetails.description}</div>
              <button name={productDetails.id} onClick={(e) => addButtonClick(e)}>Add to cart</button>
            <Reviews productId={productDetails.id} />
            </div>
          )
        }
      </div>
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
