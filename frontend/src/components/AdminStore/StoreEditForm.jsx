import React, { Component } from "react";
import { Col, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { properties } from "../../properties";
const backendurl = properties.backendhost;

class StoreInfoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storeName: "",
      streetDetails: "",
      aptDetails: "",
      cityName: "",
      stateName: "",
      zipCode: "",
      errors: "",
      text: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    let { store } = this.props;
    this.setState({
      storeName: store.name,
      streetDetails: store.address.street,
      aptDetails: store.address.street,
      cityName: store.address.city,
      stateName: store.address.state,
      zipCode: store.address.zip,
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit = (e) => {
    //prevent page from refresh
    e.preventDefault();
    this.setState({
      text: "",
      errors: "",
    });
    //const errors = this.validate();
    //console.log("errors -" + errors);
    //if (errors) return;
    const data = {
      name: this.props.store.name,
      street: this.state.streetDetails + "," + this.state.aptDetails,
      city: this.state.cityName,
      state: this.state.stateName,
      zip: this.state.zipCode,
    };

    console.log("Data for updating store is" + data);
    axios
      .post(backendurl + "/store/updateStore", data)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            text: "Store Updated",
          });
        }
      })
      .catch((error) => {
        console.log("Error occured while updating store " + error);
        this.setState({
          errors: "Update failed: " + error,
        });
      });
  };

  render() {
    const { text, errors } = this.state;
    const { store } = this.props;
    const { address } = store;
    return (
      <div>
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="storeName">
              <Form.Label>Store Name</Form.Label>
              <Form.Control
                type="text"
                name="storeName"
                value={store.name}
                disabled="true"
              />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="streetDetails">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="streetDetails"
              defaultValue={address.street}
              placeholder="1234 Main St"
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="aptDetails">
            <Form.Label>Address 2</Form.Label>
            <Form.Control
              type="text"
              name="aptDetails"
              defaultValue={address.street}
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
                defaultValue={address.city}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="stateName">
              <Form.Label>State</Form.Label>
              <Form.Control
                as="select"
                defaultValue="Choose..."
                onChange={this.handleChange}
              >
                <option>CA</option>
                <option>TX</option>
                <option>VA</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="zipCode">
              <Form.Label>Zip</Form.Label>
              <Form.Control
                name="zipCode"
                defaultValue={address.zip}
                onChange={this.handleChange}
              />
            </Form.Group>
          </Form.Row>

          <Button
            className="btn btn-primary"
            onClick={this.handleSubmit}
            type="submit"
          >
            Update
          </Button>
          <br />
          <p className="text-danger"> {errors}</p>
          <p className="text-success"> {text}</p>
          <br />
        </Form>
      </div>
    );
  }
}

export default StoreInfoForm;
