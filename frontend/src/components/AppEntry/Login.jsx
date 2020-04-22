import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import classnames from "classnames";
import Register from "./Register";
import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: "",
      loggedIn: false,
      onSignUp: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleLogin(e) {
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    console.log(data);
    //this.props.loginUser(data);
    this.setState({
      loggedIn: true,
    });
  }

  handleClick() {
    this.setState({
      onSignUp: true,
    });
  }

  render() {
    const { errors, onSignUp, loggedIn } = this.state;
    let redirectVar = null;
    if (loggedIn) {
      redirectVar = <Redirect to="/main/home" />;
    }
    return (
      <div>
        {onSignUp ? (
          <Register />
        ) : (
          <div>
            {redirectVar}
            <Form>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  required
                  className={classnames({
                    "is-invalid": errors.email,
                  })}
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
              <br></br>
              <Button className="btn btn-success" onClick={this.handleLogin}>
                LogIn
              </Button>
              <br />
              <br />
              <div className="form-group"> OR </div>
              <div>
                Don't have an account ?
                <a className="text-info" onClick={this.handleClick}>
                  <div>
                    {" "}
                    <h4>Sign Up</h4>
                  </div>
                </a>
              </div>
            </Form>
          </div>
        )}
      </div>
    );
  }
}

export default Login;
