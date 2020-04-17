import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import classnames from "classnames";
import { Redirect } from "react-router-dom";

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
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem("jwtToken") != null) {
      this.setState({
        isLogin: true,
      });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleClick(event) {
    console.log("inside handleclick");

    const data = {
      screenName: this.state.screenName,
      nickName: this.state.nickName,
      email: this.state.email,
      password: this.state.password,
    };
    console.log("data is..", data);

    this.props.registerUser(data, this.props.history);
  }

  render() {
    const { errors } = this.state;
    let redirectVar = null;
    if (localStorage.getItem("jwtToken") != null)
      redirectVar = <Redirect to="/welcomePage" />;
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
                  <Form.Group controlId="screenName">
                    <Form.Label style={style1}>Screen Name</Form.Label>
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
                      <div className="invalid-feedback">
                        {errors.screenName}
                      </div>
                    )}
                  </Form.Group>
                  <Form.Group controlId="nickName">
                    <Form.Label style={style1}>Nick Name</Form.Label>
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
                    <Form.Label style={style1}>Email ID</Form.Label>
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
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </Form.Group>
                  <br />

                  <Button
                    style={style2}
                    onClick={(event) => this.handleClick(event)}
                  >
                    Submit
                  </Button>
                </Form>
                <br />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const style1 = {
  fontSize: 20,
  fontFamily: "Gotham Narrow SSm",
};

const style2 = {
  backgroundColor: "#00acee",
  color: "white",
  fontSize: 20,
  fontFamily: "Gotham Narrow SSm",
  paddingLeft: 170,
  paddingRight: 170,
  paddingTop: 5,
  paddingBottom: 5,
  borderRadius: 100,
};

export default Register;
