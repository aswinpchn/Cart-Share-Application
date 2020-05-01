import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Cart extends Component {
  state = {
    cartprice: null,
    authFlag: "",
  };

  render() {
    return (
      <div>
        <div className="container d-flex justify-content-center align-items-center form-group">
          <ul className="list-group">
            <h4 className="justify-content-center">Review Order</h4>
            <div>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <span style={{ marginLeft: "50px" }}>ItemName::</span>
                <span
                  style={{ marginLeft: "50px" }}
                  className="badge badge-primary badge-pill"
                >
                  Qty::
                </span>
                <span style={{ marginLeft: "50px" }}>Price::</span>
              </li>
            </div>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Total Price
              <span className="badge badge-primary badge-pill"></span>
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
              Place order
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
