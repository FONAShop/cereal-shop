import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const sampleProducts = [
  {
    id: 1,
    name: 'product 1',
    description: 'Some....thing'
  },
  {
    id: 2,
    name: 'product 2',
    description: 'Great product 2 '
  },
  {
    id: 3,
    name: 'product 3',
    description: 'Cool product 3 '
  },
  {
    id: 4,
    name: 'product 4',
    description: 'Some....thing'
  },
  {
    id: 5,
    name: 'product 5',
    description: 'Great product 2 '
  },
  {
    id: 6,
    name: 'product 6',
    description: 'Cool product 3 '
  }
];

//===============================================//

export default function AllProducts() {
  return (
    <div className="all-products">
      {sampleProducts.map(product => (
        <div className="product" key={product.id}>
          <span>{product.name}</span>
          <span>{product.description}</span>
        </div>
      ))}
    </div>
  );
}
