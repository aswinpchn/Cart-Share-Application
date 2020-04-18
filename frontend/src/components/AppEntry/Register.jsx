import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import classnames from "classnames";
import Login from "./Login";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenName: "",
      nickName: "",
      password: "",
      email: "",
      isLogin: false,
      signup: false,
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
      screenName: this.state.screenName,
      nickName: this.state.nickName,
      email: this.state.email,
      password: this.state.password,
    };
    console.log("data is..", data);

    //this.props.registerUser(data, this.props.history);
  }
  render() {
    const { errors, onSignIn } = this.state;
    return onSignIn === "True" ? (
      <Login />
    ) : (
      <Form>
        <Form.Group controlId="screenName">
          <Form.Label>Screen Name</Form.Label>
          <Form.Control
            type="text"
            className={classnames({
              "is-invalid": errors.screenName,
            })}
            placeholder="Enter Screen Name"
            name="screenName"
            value={this.state.screenName}
            onChange={this.handleChange}
          />
          {errors.screenName && (
            <div className="invalid-feedback">{errors.screenName}</div>
          )}
        </Form.Group>
        <Form.Group controlId="nickName">
          <Form.Label>Nick Name</Form.Label>
          <Form.Control
            type="text"
            className={classnames({
              "is-invalid": errors.nickName,
            })}
            placeholder="Enter your Nick name"
            name="nickName"
            value={this.state.nickName}
            onChange={this.handleChange}
          />
          {errors.nickName && (
            <div className="invalid-feedback">{errors.nickName}</div>
          )}
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email ID</Form.Label>
          <Form.Control
            type="email"
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
    );
  }
}
export default Register;
