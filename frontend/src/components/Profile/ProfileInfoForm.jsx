import React, { Component } from "react";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

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
      profileUpdated: false,
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

  handleSubmit(e) {
    e.preventDefault();

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
        window.alert("Thank you! your profile is updated.");
        this.setState({
          profileUpdated: true,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          errors: "Error while updating profile" + error,
        });
      });

    //this.props.registerUser(data, this.props.history);
  }
  render() {
    let msg;
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
            />
          </div>
          <div className="form-row form-group">
            <label htmlFor="city">City</label>
            <input
              onChange={this.handleChange}
              type="text"
              className="form-control"
              id="city"
              defaultValue={city}
            />
          </div>
          <div className="form-row form-group">
            <div className="col-md-6 mb-3">
              <label htmlFor="state">State</label>
              {/* <input
                onChange={this.state}
                type="text"
                className="form-control"
                id="state"
                defaultValue={state}
              /> */}
              <select
                class="custom-select"
                id="state"
                defaultValue={state}
                onChange={this.handleChange}
              >
                <option value="1">CA</option>
                <option value="2">TX</option>
                <option value="3">VA</option>
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="zip">Zip</label>
              <input
                onChange={this.handleChange}
                type="text"
                className="form-control"
                id="zip"
                defaultValue={zip}
              />
            </div>
          </div>
          <div className="form-row">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default ProfileInfoForm;
