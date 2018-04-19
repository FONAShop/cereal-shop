import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export function AllProducts(props) {
  // console.log('====== all props: ', props);
  const products = props.allProducts;
  return (
    <div className="all-products">
      {products &&
        products.map(product => (
          <div className="product" key={product.id}>
            <img src={product.imgUrl} />
            <div>{'Title: ' + product.name}</div>
            <div>{'Price: ' + product.price}</div>
            <div>{'Amount: ' + product.quantity}</div>
            <div>{'Desc: ' + product.description}</div>
          </div>
        ))}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    allProducts: state.product
  };
};

export default connect(mapStateToProps)(AllProducts);
