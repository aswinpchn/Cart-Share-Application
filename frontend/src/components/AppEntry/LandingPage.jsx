import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";
import classnames from "classnames";
import Login from "./Login";
import SignUp from "./Register";

class LandingPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="d-md-flex h-md-100 align-items-center">
        <div className="col-md-6 p-0 bg-indigo h-md-100">
          <div className="text-white d-md-flex align-items-center h-100 p-7 text-center justify-content-center">
            <div className="logoarea pt-5 pb-5">
              <div className="container">
                <img
                  src={require("../common/images/grocerydelivery.svg")}
                  alt="avatar"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 p-0 bg-white h-md-100 loginarea">
          <div className="d-md-flex align-items-right h-md-100 p-5 justify-content-center">
            <div className="container border rounded p-5">
              <div className="container">
                <span>
                  <img
                    className="rounded float-left"
                    src={require("../common/images/shoppingcart.png")}
                    alt="avatar"
                    width="80"
                    align="center"
                  />
                  <br />
                  <div>
                    <h4 className="text-center text-success">Cart Pool</h4>
                  </div>
                </span>
              </div>
              <br />
              <br />
              <Login />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
