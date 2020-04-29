import React, { Component } from "react";
import { Col, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { connect } from "react-redux";
// import classnames from "classnames";
// import Login from "./Login";
import constants from "../../utils/constants";
import axios from "axios";
import { properties } from "../../properties";
import { Redirect } from "react-router-dom";

class UserDetailsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenName: "",
      nickName: "",
      streetDetails: "",
      aptDetails: "",
      cityName: "",
      stateName: "",
      zipCode: "",
      errors: "",
      profileUpdated: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const data = {
      email: localStorage.getItem("email"),
      screenName: this.state.screenName,
      nickName: this.state.nickName,
      street: this.state.streetDetails + this.aptDetails,
      city: this.state.cityName,
      state: this.state.stateName,
      zip: this.state.zipCode,
    };
    console.log("data is in handle submit step 2..", data);

    // axios call to set profile
    const backendurl = properties.backendhost + "user/updateProfile";
    axios
      .post(backendurl, data)
      .then((response) => {
        console.log(response.data);
        console.log("the screen name of user is " + response.data.screenName);
        localStorage.setItem("screenName", response.data.screenName);
        localStorage.setItem("nickName", response.data.nickName);
        this.setState({
          profileUpdated: true,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          errors: "Screen Name or Nick name already exists",
        });
      });

    //this.props.registerUser(data, this.props.history);
  }
  render() {
    const { errors } = this.state;
    const { email, password } = this.props.auth.user;
    let redirectVar = null;
    if (this.state.profileUpdated) {
      redirectVar = <Redirect to="/main/home" />;
    }
    console.log(this.state);
    return (
      <div>
        {redirectVar}
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
                <div>
                  <h5> Email: {email} </h5>
                  <br />
                </div>
                <Form>
                  <Form.Row>
                    <Form.Group as={Col} controlId="screenName">
                      <Form.Label>Screen Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Screen Name"
                        name="screenName"
                        value={this.state.screenName}
                        onChange={this.handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="nickName">
                      <Form.Label>Nick Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Nick Name"
                        name="nickName"
                        value={this.state.nickName}
                        onChange={this.handleChange}
                        required
                      />
                    </Form.Group>
                  </Form.Row>

                  <Form.Group controlId="streetDetails">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="streetDetails"
                      value={this.state.streetDetails}
                      placeholder="1234 Main St"
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="aptDetails">
                    <Form.Label>Address 2</Form.Label>
                    <Form.Control
                      type="text"
                      name="aptDetails"
                      value={this.state.aptDetails}
                      placeholder="Apartment, studio, or floor"
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Row>
                    <Form.Group as={Col} controlId="cityName">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        name="cityName"
                        value={this.state.cityName}
                        onChange={this.handleChange}
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="stateName">
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        type="text"
                        name="stateName"
                        value={this.state.stateName}
                        onChange={this.handleChange}
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="zipCode">
                      <Form.Label>Zip</Form.Label>
                      <Form.Control
                        type="text"
                        name="zipCode"
                        value={this.state.zipCode}
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                  </Form.Row>

                  <Button
                    className="btn btn-success"
                    type="submit"
                    onClick={this.handleSubmit}
                    disabled={!this.state.screenName || !this.state.nickName}
                  >
                    Proceed
                  </Button>
                  <br />
                  <p className="text-danger"> {errors}</p>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapState)(UserDetailsForm);
