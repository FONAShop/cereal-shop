import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Product from './Product'


class AllProducts extends Component{
  constructor (props) {
    super(props)
    this.state = {}
    this.addToCart = this.addToCart.bind(this);
  }

  addToCart(){
    /* to incorporate action creators and thunks from cart */
  }

  render(){
    const products = this.props.allProducts;
    return (
      <div className="all-products">
        {products.map(product => (
            <div className="product" key={product.id}>
              <Product product={product} />
              <button onClick={this.addToCart}>Add to cart</button>
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

export default connect(mapStateToProps)(AllProducts);
