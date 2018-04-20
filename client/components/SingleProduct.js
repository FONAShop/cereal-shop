import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProduct } from '../store/product';

class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const productDetails = this.props.selectedProduct;
    return (
      <div>
        {productDetails && (
          <div key={productDetails.id}>
            <img src={productDetails.imgUrl} />
            <div>{'Title: ' + productDetails.name}</div>
            <div>{'Price: ' + productDetails.price}</div>
            <div>{'Desc: ' + productDetails.description}</div>
          </div>
        )}
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
    selectedProduct: selectedProduct,
    allProducts: state.product.allProducts
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    loadSingleProduct: function() {
      let productId = ownProps.match.params.id;
      dispatch(fetchProduct(productId));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
