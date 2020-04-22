import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import classnames from "classnames";
import Login from "./Login";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { onSignup } from "../_actions/authActions";
import { Redirect } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirm_password: "",
      errors: {},
      onSignIn: "False",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleClick() {
    this.setState({
      onSignIn: "True",
    });
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    const data = {
      email: this.state.email,
      password: this.state.password,
      confirm_password: this.state.confirm_password,
    };
    console.log("data is..", data);
    this.props.onSignup(data);
  }
  render() {
    const { errors, onSignIn } = this.state;
    const { email, password } = this.props.auth.user;
    let userDetailsForm = false;
    if (email && password) {
      userDetailsForm = <Redirect to="/UserDetailsForm" />;
    }
    return onSignIn === "True" ? (
      <Login />
    ) : (
      <div>
        {userDetailsForm}
        <Form>
          <Form.Group controlId="email">
            <Form.Label>Email ID</Form.Label>
            <Form.Control
              type="email"
              required
              className={classnames({ "is-invalid": errors.email })}
              placeholder="Enter email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              className={classnames({
                "is-invalid": errors.password,
              })}
              placeholder="Password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </Form.Group>
          <Form.Group controlId="confirm_password">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="confirm_password"
              required
              className={classnames({
                "is-invalid": errors.confirm_password,
              })}
              placeholder="Confirm Password"
              name="confirm_password"
              value={this.state.confirm_password}
              onChange={this.handleChange}
            />
            {errors.confirm_password && (
              <div className="invalid-feedback">{errors.confirm_password}</div>
            )}
          </Form.Group>
          <br />

          <Button className="btn btn-success" onClick={this.handleSubmit}>
            Submit
          </Button>
          <br />
          <br />
          <div className="form-group"> OR </div>
          <div>
            Already have an account ?
            <a className="text-info" onClick={this.handleClick}>
              {" "}
              <h4>Sign In</h4>
            </a>
          </div>
        </Form>
      </div>
    );
  }
}

Register.propTypes = {
  auth: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { onSignup })(Register);
