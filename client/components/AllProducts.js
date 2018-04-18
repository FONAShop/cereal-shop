import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

//===============================================//

/**
 * DUMB COMPONENT
 */
export function AllProducts({ products}) {
  return (
    <div className="all-products">
      {products &&
        products.map(product => (
          <div className="product" key={product.id}>
            <div>{'Title: ' + product.name}</div>
            <div>{'Price: ' + product.price}</div>
            <div>{'Amount: ' + product.quantity}</div>
            <div>{'Desc: ' + product.description}</div>
          </div>
        ))}
    </div>
  );
}

//================================================//

/**
 * MAP STATE TO PROPS
 */
const mapStateToProps = state => {
  // console.log('====== state: ', state);
  return {
    products: state.products
  };
};

// const mapDispatchToProps = { fetchProducts };

//================================================//

/**
 * CONTAINER
 */

// class AllProductsContainer extends React.Component {
//   componentDidMount () {
//     this.props.fetchProducts()
//   }

//   render () {
//     return <AllProducts {...this.props} />
//   }
// }

export default connect(mapStateToProps)(AllProductsContainer);
