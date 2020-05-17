import React, { Component } from "react";
import { Col, Form, Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { connect } from "react-redux";
import axios from "axios";
import { properties } from "../../properties";
import { Redirect } from "react-router-dom";
import swal from "sweetalert";
import firebase from "firebase";
import Spinner from "react-bootstrap/Spinner";

class UserDetailsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenName: "",
      nickName: "",
      streetDetails: "",
      cityName: "",
      stateName: "CA",
      zipCode: "",
      errors: "",
      profileUpdated: false,
      loading: false,
      formErrors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onLogoutClick = (e) => {
    e.preventDefault();
    // logout logic
    firebase
      .auth()
      .signOut()
      .then(function () {
        // Sign-out successful.
        localStorage.clear(); //for localStorage
        window.location.href = "/";
      })
      .catch(function (error) {
        // An error happened.
        console.log("Error occurred while logging out");
      });
  };

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  validate = () => {
    var letters = /^[0-9a-zA-Z]+$/;

    var zipExp = /^\d{5}(-\d{4})?$/;

    let screenNameError = "";
    let nickNameError = "";
    let streetDetailsError = "";
    let cityNameError = "";
    let stateNameError = "";
    let zipCodeError = "";

    if (!this.state.screenName) {
      screenNameError = "Please enter Screen Name";
    } else if (!this.state.screenName.match(letters)) {
      screenNameError = "Please input alphanumeric characters only";
    }

    if (!this.state.nickName) {
      nickNameError = "Please enter Nick Name";
    }

    if (!this.state.streetDetails) {
      streetDetailsError = "Please enter Address";
    }

    if (!this.state.cityName) {
      cityNameError = "Please enter City";
    }

    if (!this.state.stateName) {
      stateNameError = "Please enter State";
    }

    if (!this.state.zipCode) {
      zipCodeError = "Please enter Zipcode";
    } else if (!this.state.zipCode.match(zipExp)) {
      zipCodeError =
        "The US zip code must contain 5 digits. Allowed formats are 12345 or 12345-1234";
    }

    if (
      screenNameError ||
      nickNameError ||
      streetDetailsError ||
      cityNameError ||
      stateNameError ||
      zipCodeError
    ) {
      this.setState((prevState) => ({
        formErrors: {
          // object that we want to update
          ...prevState.formErrors, // keep all other key-value pairs
          screenNameError: screenNameError, // update the value of specific key
          nickNameError: nickNameError,
          streetDetailsError: streetDetailsError,
          cityNameError: cityNameError,
          stateNameError: stateNameError,
          zipCodeError: zipCodeError,
        },
      }));
      return false;
    }
    return true;
  };

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      errors: "",
    });

    const isValid = this.validate();

    if (isValid) {
      this.setState({
        loading: true,
      });

      const data = {
        email: localStorage.getItem("email"),
        screenName: this.state.screenName,
        nickName: this.state.nickName,
        street: this.state.streetDetails,
        city: this.state.cityName,
        state: this.state.stateName,
        zip: this.state.zipCode,
      };
      console.log("data is in handle submit step 2..", data);

      this.setState({
        loading: true,
      });

      // axios call to set profile
      const backendurl = properties.backendhost + "user/updateProfile";
      axios
        .post(backendurl, data)
        .then((response) => {
          swal(
            "Thank you for registering. Please verify your email address to use the cartpool"
          );
          this.setState({
            profileUpdated: true,
            loading: false,
          });
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            formErrors: {},
            errors: "Screen Name or Nick name already exists",
            loading: false,
          });
        });

      //this.props.registerUser(data, this.props.history);
    }
  }
  render() {
    const { errors, loading } = this.state;
    const { email, password } = this.props.auth.user;
    let redirectVar = null;
    if (this.state.profileUpdated) {
      redirectVar = <Redirect to="/main/home" />;
    }

    let spinner;
    if (loading) {
      spinner = <Spinner animation="border" variant="primary" />;
    }

    var logoutButton;

    logoutButton = (
      <div className="collapse navbar-collapse navbar-right" id="navbarNav">
        <Nav className="mr-auto"></Nav>
        <Link
          className="nav-link text-dark t-font-size-14"
          to="/"
          onClick={this.onLogoutClick}
        >
          <i className="fas fa-sign-out-alt pr-2"></i>Logout
        </Link>
      </div>
    );

    console.log(this.state);
    return (
      <div>
        {redirectVar}

        <Navbar bg="light" expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Nav.Link>{logoutButton}</Nav.Link>
          </Navbar.Collapse>
        </Navbar>
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
                <div></div>
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
                      {this.state.formErrors.screenNameError ? (
                        <div style={{ fontSize: 12, color: "red" }}>
                          {this.state.formErrors.screenNameError}
                        </div>
                      ) : null}
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
                      {this.state.formErrors.nickNameError ? (
                        <div style={{ fontSize: 12, color: "red" }}>
                          {this.state.formErrors.nickNameError}
                        </div>
                      ) : null}
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
                    {this.state.formErrors.streetDetailsError ? (
                      <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.formErrors.streetDetailsError}
                      </div>
                    ) : null}
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
                      {this.state.formErrors.cityNameError ? (
                        <div style={{ fontSize: 12, color: "red" }}>
                          {this.state.formErrors.cityNameError}
                        </div>
                      ) : null}
                    </Form.Group>

                    <Form.Group as={Col} controlId="stateName">
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        as="select"
                        name="stateName"
                        value={this.state.stateName}
                        onChange={this.handleChange}
                      >
                        <option>CA</option>
                        <option>TX</option>
                        <option>VA</option>
                      </Form.Control>
                      {this.state.formErrors.stateNameError ? (
                        <div style={{ fontSize: 12, color: "red" }}>
                          {this.state.formErrors.stateNameError}
                        </div>
                      ) : null}
                    </Form.Group>

                    <Form.Group as={Col} controlId="zipCode">
                      <Form.Label>Zip</Form.Label>
                      <Form.Control
                        type="text"
                        name="zipCode"
                        value={this.state.zipCode}
                        onChange={this.handleChange}
                      />
                      {this.state.formErrors.zipCodeError ? (
                        <div style={{ fontSize: 12, color: "red" }}>
                          {this.state.formErrors.zipCodeError}
                        </div>
                      ) : null}
                    </Form.Group>
                  </Form.Row>

                  <Button
                    className="btn btn-success"
                    type="submit"
                    onClick={this.handleSubmit}
                    // disabled={!this.state.screenName || !this.state.nickName}
                  >
                    Proceed
                  </Button>
                  {spinner}
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
