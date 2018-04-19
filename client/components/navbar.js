import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../store';

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <div className="navbar-container-outer">
      <div className="navbar-container">
      <NavLink to="/" ><h1 className="h1">LORDS OF THE CEREALS</h1></NavLink>
        <nav>
          {isLoggedIn ? (
            <div className="navbar-div">
              {/* The navbar will show these links after you log in */}
              <Link to="/home" activeClassName="selected">Home</Link>
              <a href="#" onClick={handleClick}>Logout</a>
            </div>
          ) : (
            <div className="navbar-div">
              {/* The navbar will show these links before you log in */}
              <NavLink to="/login" activeClassName="selected">Login</NavLink>
              <NavLink to="/signup" activeClassName="selected">Sign Up</NavLink>
            </div>
          )}
        </nav>
      </div>
      <div className="filter-products-container">
        <div>Filter:</div>
        <input className="filter-products" />
      </div>
    </div>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
