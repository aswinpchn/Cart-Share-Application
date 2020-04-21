import React, { Component } from "react";
import { Col, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axios from "axios";

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
  }

  render() {
    return (
      <div>
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="storeName">
              <Form.Label>Store Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Store Name" />
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

          <Button className="btn btn-primary" type="submit">
            Proceed
          </Button>
        </Form>
      </div>
    );
  }
}

export default StoreInfoForm;
