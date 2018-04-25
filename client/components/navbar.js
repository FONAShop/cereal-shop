import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../store';
import SearchBar from './SearchBar';
import { Container, Icon, Menu, Segment, Label } from 'semantic-ui-react';

const Navbar = ({ handleClick, isLoggedIn, numOfItems }) => (
  <Segment>
    <Menu fixed="top" inverted color="green">
      <Container>
        <Menu.Item as={NavLink} to="/" header>
          <Icon name="lightning" size="large" style={{ marginRight: '0.7em' }} />
          LORDS OF CEREAL
        </Menu.Item>

        <Menu.Item as={NavLink} to="/cart">
          <Icon name="cart" size="large" />
          <Label circular color="brown">{numOfItems}</Label>
        </Menu.Item>

        <Menu.Menu position="right">
          <SearchBar />
          {isLoggedIn ? (
            <Menu.Menu position="right">
              {/* The navbar will show these links after you log in */}
              <Menu.Item as={NavLink} to="/home">
                My Account
              </Menu.Item>
              <Menu.Item as={NavLink} to="#" onClick={handleClick}>
                Logout
              </Menu.Item>
            </Menu.Menu>
          ) : (
            <Menu.Menu position="right">
              {/* The navbar will show these links before you log in */}
              <Menu.Item as={NavLink} to="/login">
                Login
              </Menu.Item>
              <Menu.Item as={NavLink} to="/signup">
                Sign Up
              </Menu.Item>
            </Menu.Menu>
          )}
        </Menu.Menu>
      </Container>
    </Menu>
  </Segment>
);

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    numOfItems: Object.values(state.cart).reduce((total, quantity) => total + quantity, 0)
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
