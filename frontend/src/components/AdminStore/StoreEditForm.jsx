import React, { Component } from "react";
import { Col, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateStore } from "../_actions/storeActions";

class StoreEditForm extends Component {
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
      formErrors: {},
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

  componentDidUpdate(prevProps) {
    if (
      this.props.storeState &&
      this.props.storeState !== prevProps.storeState
    ) {
      if (this.props.storeState.responseStatus === 200) {
        this.setState({
          text: "Store Updated",
          formErrors: {},
        });
      }
    }
    if (this.props.errors !== prevProps.errors) {
      console.log("errors are" + this.props.errors);
      if (this.props.errors) {
        this.setState({
          text: "",
          formErrors: {},
          errors: this.props.errors.message,
        });
      }
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  validate = () => {
    var letters = /^[0-9a-zA-Z]+$/;

    var zipExp = /^\d{5}(-\d{4})?$/;

    let storeNameError = "";
    let streetDetailsError = "";
    let cityNameError = "";
    let stateNameError = "";
    let zipCodeError = "";

    if (!this.state.storeName) {
      storeNameError = "Please enter Store Name";
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
      zipCodeError = "The US zip code must contain 5 digits";
    }

    if (
      storeNameError ||
      streetDetailsError ||
      cityNameError ||
      stateNameError ||
      zipCodeError
    ) {
      this.setState((prevState) => ({
        formErrors: {
          // object that we want to update
          ...prevState.formErrors, // keep all other key-value pairs
          storeNameError: storeNameError, // update the value of specific key
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

  handleSubmit = (e) => {
    //prevent page from refresh
    e.preventDefault();
    this.setState({
      text: "",
      errors: "",
    });

    const isValid = this.validate();
    if (isValid) {
      const data = {
        name: this.props.store.name,
        street: this.state.streetDetails,
        city: this.state.cityName,
        state: this.state.stateName,
        zip: this.state.zipCode,
      };
      console.log("Data for updating store is" + data);
      this.props.updateStore(data);
    }
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
              {this.state.formErrors.storeNameError ? (
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.formErrors.storeNameError}
                </div>
              ) : null}
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
                defaultValue={address.city}
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
                defaultValue={address.state}
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
                name="zipCode"
                defaultValue={address.zip}
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

StoreEditForm.propTypes = {
  storeState: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  storeState: state.storeState,
  errors: state.errorState,
});
export default connect(mapStateToProps, { updateStore })(StoreEditForm);
