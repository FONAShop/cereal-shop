import React from 'react'
import { Link } from 'react-router-dom';

export default function Product({product}){
  return (

      <Link to={`product/${product.id}`}>
        <img src={product.imgUrl} />
        <div>{'Title: ' + product.name}</div>
        <div>{'Price: ' + product.price}</div>
        <div>{'Amount: ' + product.quantity}</div>
        <div>{'Desc: ' + product.description}</div>
      </Link>

  )
}
