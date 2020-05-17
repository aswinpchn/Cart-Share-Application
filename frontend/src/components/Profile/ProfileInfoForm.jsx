import React, { Component } from "react";
import { Col, Form } from "react-bootstrap";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import swal from "sweetalert";
import axios from "axios";
import { properties } from "../../properties";

class ProfileInfoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      screenName: "",
      nickName: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      errors: "",
      profileUpdated: "",
      formErrors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  componentDidMount() {
    const {
      email,
      screenName,
      nickName,
      street,
      city,
      state,
      zip,
    } = this.props;
    this.setState({
      email: email,
      screenName: screenName,
      nickName: nickName,
      street: street,
      city: city,
      state: state,
      zip: zip,
    });
  }

  validate = () => {
    console.log("the city sent is " + this.state.city);

    console.log("the state sent is " + this.state.state);
    var letters = /^[0-9a-zA-Z]+$/;

    var zipExp = /^\d{5}(-\d{4})?$/;

    let nickNameError = "";
    let streetDetailsError = "";
    let cityNameError = "";
    let stateNameError = "";
    let zipCodeError = "";

    if (!this.state.nickName) {
      nickNameError = "Please enter Nick Name";
    }

    if (!this.state.street) {
      streetDetailsError = "Please enter Address";
    }

    if (!this.state.city) {
      cityNameError = "Please enter City";
    }

    if (!this.state.state) {
      stateNameError = "Please enter State";
    }

    if (!this.state.zip) {
      zipCodeError = "Please enter Zipcode";
    } else if (!this.state.zip.match(zipExp)) {
      zipCodeError =
        "The US zip code must contain 5 digits. Allowed formats are 12345 or 12345-1234";
    }

    if (
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
          // update the value of specific key
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
      const data = {
        email: this.state.email,
        screenName: this.state.screenName,
        nickName: this.state.nickName,
        street: this.state.street,
        city: this.state.city,
        state: this.state.state,
        zip: this.state.zip,
      };
      console.log("data is in handle submit step 2..", data);

      // axios call to set profile
      const backendurl = properties.backendhost + "user/setProfile";
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      axios
        .put(backendurl, data, config)
        .then((response) => {
          let message = "Thank you! Your profile is updated.\n";
          let info =
            "Please refresh Account Information page to see the changes";
          swal(message, info);
          this.setState({
            profileUpdated: true,
            formErrors: {},
          });
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            profileUpdated: false,
            errors: "Error while updating profile" + error,
            formErrors: {},
          });
        });

      //this.props.registerUser(data, this.props.history);
    }
  }
  render() {
    let msg;
    const { profileUpdated } = this.state;
    if (profileUpdated === true) {
      msg = <p className="text-success">Updated Profile successfully</p>;
    } else if (profileUpdated === false) {
      msg = <p className="text-danger">Profile update failed.</p>;
    }
    const {
      email,
      screenName,
      nickName,
      street,
      city,
      state,
      zip,
      errors,
    } = this.state;

    console.log("values being sent " + JSON.stringify(this.state));
    return (
      <form
        className="needs-validation container novalidate content-form-padding"
        onSubmit={this.handleSubmit}
      >
        <div>
          <div className="form-row"></div>
          <div className="form-row form-group">
            <div className="col-md-6 mb-3">
              <label htmlFor="screenName">Screen name</label>

              <input
                type="text"
                className="form-control"
                id="screenName"
                defaultValue={screenName}
                disabled
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="nickName">Nick name</label>
              <input
                onChange={this.handleChange}
                type="text"
                className="form-control"
                id="nickName"
                placeholder="Nick name"
                defaultValue={nickName}
                required
              />
              <div className="invalid-feedback">Nick Name is Required.</div>
              {this.state.formErrors.nickNameError ? (
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.formErrors.nickNameError}
                </div>
              ) : null}
            </div>
          </div>

          <div className="form-row form-group">
            <label htmlFor="street">Street</label>
            <input
              onChange={this.handleChange}
              type="text"
              className="form-control"
              id="street"
              defaultValue={street}
              required
            />
            {this.state.formErrors.streetDetailsError ? (
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.formErrors.streetDetailsError}
              </div>
            ) : null}
          </div>
          <div className="form-row form-group">
            <label htmlFor="city">City</label>
            <input
              onChange={this.handleChange}
              type="text"
              className="form-control"
              id="city"
              defaultValue={city}
              required
            />
            {this.state.formErrors.cityNameError ? (
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.formErrors.cityNameError}
              </div>
            ) : null}
          </div>
          <div className="form-row form-group">
            <div className="col-md-6 mb-3">
              <label htmlFor="state">State</label>
              <select
                class="custom-select"
                id="state"
                defaultValue={state}
                onChange={this.handleChange}
                required
              >
                <option>{state}</option>
                <option>CA</option>
                <option>TX</option>
                <option>VA</option>
              </select>
              {this.state.formErrors.stateNameError ? (
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.formErrors.stateNameError}
                </div>
              ) : null}
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="zip">Zip</label>
              <input
                onChange={this.handleChange}
                type="text"
                className="form-control"
                id="zip"
                defaultValue={zip}
                required
              />
              {this.state.formErrors.zipCodeError ? (
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.formErrors.zipCodeError}
                </div>
              ) : null}
            </div>
          </div>
          <div className="form-row">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            {msg}
          </div>
        </div>
      </form>
    );
  }
}

export default ProfileInfoForm;
