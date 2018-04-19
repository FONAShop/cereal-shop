import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { fetchProduct } from '../store/product'

//get data for single product

//render a view for product information
//render a view for reviews

class SingleProduct extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  componentDidMount(){
    this.props.loadSingleProduct()
  }


  render(){
    return (
      <div>Render something</div>
    )
  }
}

function mapStateToProps(state){
  return {
    selectedProduct: state.selectedProduct
  }
}

function mapDispatchToProps(dispatch, ownProps){
  return {
    loadSingleProduct: function(){
      let productId = ownProps.match.params.id
      dispatch(fetchProduct(productId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)

