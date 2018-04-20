import React, { Component } from 'react';
import { connect } from 'react-redux';
import Product from './Product';
import { addProductToCart } from '../store';

class AllProducts extends Component{
  constructor (props) {
    super(props)
    this.state = {}
  }

  render(){
    const products = this.props.allProducts;
    const { addButtonClick } = this.props;
    return (
      <div className="all-products">

        {products.map(product => (
            <div className="product" key={product.id}>
              <Product product={product} />
              <button name={product.id} onClick={(e) => addButtonClick(e)}>Add to cart</button>
            </div>
          ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    allProducts: state.product.allProducts
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addButtonClick (event) {
      const productId = {productId: event.target.name};
      dispatch(addProductToCart(productId));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
