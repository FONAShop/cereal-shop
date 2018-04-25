import React from 'react';
import { connect } from 'react-redux';
import Product from './Product';
import { Card } from 'semantic-ui-react';

//================================= DUMB COMPONENT ===========================//

function AllProducts({ products }) {
  return (
    <Card.Group itemsPerRow={3}>
      {products &&
        products.map(product => {
          return (
            <div key={product.id}>
              <Product product={product} />
            </div>
          );
        })}
    </Card.Group>
  );
}

//============================== CONTAINER COMPONENT ===========================//

const mapState = state => {
  const allProducts = state.product.allProducts;
  const entry = state.product.searchEntry;
  const filteredProducts = allProducts.filter(
    product => product.name.toUpperCase().indexOf(entry.toUpperCase()) !== -1
  );
  return {
    products: filteredProducts
  };
};

export default connect(mapState)(AllProducts);
