import React, { Component } from 'react';
import { connect } from 'react-redux';
import Product from './Product';
import { addProductToCart } from '../store';

class AllProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // let products = this.props.filteredProducts;
    const all = this.props.allProducts;
    const filtered = this.props.filteredProducts;
    let products = filtered.length ? filtered : null;

    console.log("======== items:", products);

    const { addButtonClick } = this.props;
    return (
      <div className="all-products">
        {products &&
          products.map(product => {
            return (
              <div className="product" key={product.id}>
                <Product product={product} />
                <button name={product.id} onClick={e => addButtonClick(e)}>
                  Add to cart
                </button>
              </div>
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const filtered = state.product.filteredProducts.length ?
    state.product.filteredProducts : state.product.allProducts;
  return { 
    allProducts: state.product.allProducts,
    // filteredProducts: state.product.filteredProducts,
    filteredProducts: filtered
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addButtonClick(event) {
      const productId = { productId: event.target.name };
      dispatch(addProductToCart(productId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
