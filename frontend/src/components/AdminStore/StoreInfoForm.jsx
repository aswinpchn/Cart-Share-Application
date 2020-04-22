import React, { Component } from "react";
import { Col, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";

class StoreInfoForm extends Component {
  componentDidMount() {
    this.setState({
      storeName: "",
      streetDetails: "",
      aptDetails: "",
      cityName: "",
      stateName: "",
      zipCode: "",
      errors: "",
    });
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit = (e) => {
    //prevent page from refresh
    e.preventDefault();
    //const errors = this.validate();
    //console.log("errors -" + errors);
    //if (errors) return;
    const data = {
      storeName: this.state.storeName,
      streetDetails: this.state.streetDetails,
      aptDetails: this.state.aptDetails,
      cityName: this.state.cityName,
      stateName: this.state.stateName,
      zipCode: this.state.zipCode,
    };

    //console.log("Data for creating store is" + data);
    //this.createStore();
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId="storeName">
              <Form.Label>Store Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Store Name"
                onChange={this.handleChange}
              />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="streetDetails">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="1234 Main St"
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="aptDetails">
            <Form.Label>Address 2</Form.Label>
            <Form.Control
              type="text"
              placeholder="Apartment, studio, or floor"
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="cityName">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" onChange={this.handleChange} />
            </Form.Group>

            <Form.Group as={Col} controlId="stateName">
              <Form.Label>State</Form.Label>
              <Form.Control
                as="select"
                value="Choose..."
                onChange={this.handleChange}
              >
                <option>CA</option>
                <option>TX</option>
                <option>VA</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="zipCode">
              <Form.Label>Zip</Form.Label>
              <Form.Control onChange={this.handleChange} />
            </Form.Group>
          </Form.Row>

          <Button className="btn btn-primary" type="submit">
            Proceed
          </Button>
        </Form>
      </div>
    );
  }
}

export default StoreInfoForm;
