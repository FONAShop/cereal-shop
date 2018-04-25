import React from 'react';
import { connect } from 'react-redux';
import { gotNewSearchEntry } from '../store';
import { Input, Menu } from 'semantic-ui-react';

const SearchBar = ({ handleChange }) => (
  <Menu.Item position="right">
    <Input
      icon="search"
      name="filter"
      onChange={handleChange}
      placeholder="Search products..."
    />
  </Menu.Item>
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
