import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Cart extends Component {
  state = {
    cartprice: null,
    authFlag: "",
    cart: [],
  };

  componentDidMount() {
    console.log("values from local storage" + localStorage.getItem("cart"));
    let currentCart = JSON.parse(localStorage.getItem("cart"));
    console.log("printing currentCart" + currentCart);
    this.setState({
      cart: currentCart,
    });

    if (currentCart) {
      var price = 0;
      var totalprice = () => {
        var calc = currentCart.map((item, i) => {
          price = eval("price + item.price * item.quantity");
        });
        console.log("number " + Number(price));
        return Number(price);
      };
      this.setState({
        cartprice: totalprice(),
      });
    }
  }

  render() {
    const { cart, cartprice } = this.state;
    return (
      <div>
        <div className="container d-flex justify-content-center align-items-center form-group">
          <ul className="list-group">
            <h4 className="justify-content-center">Review Order</h4>
            {cart &&
              cart.map((item, i) => {
                return (
                  <div key={i}>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span style={{ marginLeft: "50px" }}>
                        ItemName::{item.name}
                      </span>
                      <span
                        style={{ marginLeft: "50px" }}
                        className="badge badge-primary badge-pill"
                      >
                        Qty::{item.quantity}
                      </span>
                      <span style={{ marginLeft: "50px" }}>
                        Price::{item.price}
                      </span>
                    </li>
                  </div>
                );
              })}
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Total Price
              <span className="badge badge-primary badge-pill">
                {" "}
                {cartprice}
              </span>
            </li>

            <br />
          </ul>
          <br />
          <br />

          <div className="btn btn-group">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.handleSubmit}
            >
              Check Out
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Cart.propTypes = {
  errors: PropTypes.object,
};

const mapStateToProps = (state) => ({
  errors: state.errorState,
});
export default connect(mapStateToProps)(Cart);
