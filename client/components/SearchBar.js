import React from 'react';
import { connect } from 'react-redux';
import { gotNewSearchEntry } from '../store';

const SearchBar = ({ handleChange }) => (
  <form className="filter-products-container">
    <div>Filter:</div>
    <input
      className="filter-products"
      name="filter"
      onChange={handleChange}
      type="text"
    />
  </form>
);

const mapDispatchToProps = dispatch => {
  return {
    handleChange(ev) {
      const newEntry = ev.target.value;
      dispatch(gotNewSearchEntry(newEntry));
    }
  };
};

export default connect(null, mapDispatchToProps)(SearchBar);
