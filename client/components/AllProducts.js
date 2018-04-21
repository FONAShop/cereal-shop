import React from 'react';
import { connect } from 'react-redux';
import Product from './Product';
import { addProductToCart } from '../store';

//================================= DUMB COMPONENT ===========================//

function AllProducts({ products, addButtonClick }) {
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

//============================== CONTAINER COMPONENT ===========================//

const mapStateToProps = state => {
  const allProducts = state.product.allProducts;
  const entry = state.product.searchEntry;
  const filteredProducts = allProducts.filter(
    product => product.name.toUpperCase().indexOf(entry.toUpperCase()) != -1
  );
  return {
    products: filteredProducts
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
