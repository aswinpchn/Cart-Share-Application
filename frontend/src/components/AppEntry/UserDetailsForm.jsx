import React, { Component } from "react";
import { Col, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import classnames from "classnames";
import Login from "./Login";

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
    const data = {
      screenName: this.state.screenName,
      nickName: this.state.nickName,
      streetDetails: this.state.streetDetails,
      aptDetails: this.state.aptDetails,
      cityName: this.state.cityName,
      stateName: this.state.stateName,
      zipCode: this.state.zipCode,
    };
    console.log("data is..", data);

    //this.props.registerUser(data, this.props.history);
  }
  render() {
    const { errors } = this.state;
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
              <Form>
                <Form.Row>
                  <Form.Group as={Col} controlId="screenName">
                    <Form.Label>Screen Name</Form.Label>
                    <Form.Control type="name" placeholder="Enter Screen Name" />
                  </Form.Group>

                  <Form.Group as={Col} controlId="nickName">
                    <Form.Label>Nick Name</Form.Label>
                    <Form.Control type="name" placeholder="Enter Nick Name" />
                  </Form.Group>
                </Form.Row>

                <Form.Group controlId="streetDetails">
                  <Form.Label>Address</Form.Label>
                  <Form.Control placeholder="1234 Main St" />
                </Form.Group>

                <Form.Group controlId="aptDetails">
                  <Form.Label>Address 2</Form.Label>
                  <Form.Control placeholder="Apartment, studio, or floor" />
                </Form.Group>

                <Form.Row>
                  <Form.Group as={Col} controlId="cityName">
                    <Form.Label>City</Form.Label>
                    <Form.Control />
                  </Form.Group>

                  <Form.Group as={Col} controlId="stateName">
                    <Form.Label>State</Form.Label>
                    <Form.Control as="select" value="Choose...">
                      <option>CA</option>
                      <option>TX</option>
                      <option>VA</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group as={Col} controlId="zipCode">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control />
                  </Form.Group>
                </Form.Row>

                <Button className="btn btn-success" type="submit">
                  Proceed
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default UserDetailsForm;
