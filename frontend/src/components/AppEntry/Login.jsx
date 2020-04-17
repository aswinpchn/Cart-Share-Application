import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { Redirect } from "react-router-dom";
import classnames from "classnames";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      console.log("Login done");
      let user_details = nextProps.auth.user;
      console.log("user details are....", user_details);
      localStorage.setItem("username", user_details.username);
      localStorage.setItem("user_id", user_details.id);
      this.props.history.push("/welcomePage");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleLogin(e) {
    e.preventDefault();

    const data = {
      username: this.state.username,
      password: this.state.password,
    };

    console.log(data);
    this.props.loginUser(data);
  }

  render() {
    const { errors } = this.state;
    let redirectVar = null;
    if (localStorage.getItem("jwtToken") != null) {
      redirectVar = <Redirect to="/welcomePage" />;
    }
    return (
      <div>
        {redirectVar}
        <table>
          <tbody>
            <tr>
              <td width="50%">
                <img
                  src={require("../common/images/grocerydelivery.svg")}
                  width={770}
                  className="rounded"
                  alt="avatar"
                />
              </td>
              <td width="33%">
                <Form>
                  <Form.Group controlId="username">
                    <Form.Label style={style1}>Email</Form.Label>
                    <Form.Control
                      type="text"
                      className={classnames({
                        "is-invalid": errors.username,
                      })}
                      placeholder="Enter email"
                      name="username"
                      value={this.state.username}
                      onChange={this.handleChange}
                      required
                    />
                    {errors.username && (
                      <div className="invalid-feedback">{errors.username}</div>
                    )}
                  </Form.Group>

                  <Form.Group controlId="password">
                    <Form.Label style={style1}>Password</Form.Label>
                    <Form.Control
                      type="password"
                      className={classnames({
                        "is-invalid": errors.password,
                      })}
                      placeholder="Password"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                      required
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </Form.Group>

                  <br></br>

                  <a href="../welcomePage">
                    <Button style={style2} onClick={this.handleLogin}>
                      LogIn
                    </Button>
                  </a>
                </Form>

                <br />
                <p style={para}>
                  Don't have an account ? <a href="./register">Sign Up</a>
                </p>
              </td>
              <td width="10%"></td>
            </tr>
          </tbody>
        </table>
        <br />
        <br />
      </div>
    );
  }
}
var style1 = {
  fontSize: 25,
  fontFamily: "Gotham Narrow SSm",
};

const style2 = {
  backgroundColor: "#4ee44e",
  color: "white",
  fontSize: 20,
  fontFamily: "Gotham Narrow SSm",
  paddingLeft: 170,
  paddingRight: 170,
  paddingTop: 5,
  paddingBottom: 5,
  borderRadius: 100,
};

const style3 = {
  color: "#424242",
  fontWeight: "bold",
};

const para = {
  fontfamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
};

export default Login;
