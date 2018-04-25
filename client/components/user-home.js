import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { fetchCart } from '../store';

/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  componentDidMount () {
    this.props.loadCart();
  }

  render () {
    const { email } = this.props;
    return (
      <div>
        <h3>Welcome, {email}</h3>
      </div>
    )
  }

}

/**
 * CONTAINER
 */
const mapStateToProps = (state) => {
  return {
    email: state.user.email
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadCart () {
      dispatch(fetchCart());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
