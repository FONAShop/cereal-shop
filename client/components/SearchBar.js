import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { filterProducts, findItem } from '../store';

const SearchBar = ({ handleChange, handleSubmit }) => (
  <form className="filter-products-container" onSubmit={handleSubmit}>
    <div>Filter:</div>
    <input
      className="filter-products"
      name="filter"
      onChange={handleChange}
      type="text"
    />
    <button className="navbar-div" type="submit">
      Go!
    </button>
  </form>
);

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    allProducts: state.product.allProducts,
    filteredProducts: state.product.filteredProducts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleChange(ev) {
      const newEntry = ev.target.value;
      dispatch(filterProducts(newEntry));
    },
    handleSubmit(ev) {
      ev.preventDefault();
      const found = ev.target.filter.value;
      dispatch(findItem(found));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
