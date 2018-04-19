import React from "react";
import { connect } from "react-redux";

function Cart(props) {
  return (
    <div>
      <div>
        {props.cartItems &&
          props.cartItems.map(items => {
            return (
              <div>
                <div>
                  <img src="" placeholder="#" />
                  <span>{items.descript}</span>
                </div>
                <div>
                  <label>Price per unit</label>
                  <label>Quantity</label>
                  <label>Total price</label>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    cartItems: state.cartItems
  };
}

export default connect(mapStateToProps)(Cart);
