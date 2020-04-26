import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import classnames from "classnames";
import { Redirect } from "react-router-dom";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import axios from "axios";
import { properties } from "../../properties";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: "",
      loggedIn: false,
      onSignUp: false,
      uid: "",
      isSignedIn: false,
    };
    this.uiConfig = {
      signInFlow: "popup",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccess: () => false,
      },
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentWillMount() {
    // var that = this
    // firebase.auth().onAuthStateChanged(user => {
    //   console.log("user-->", user)
    //   if (user) {
    //     localStorage.setItem('email', user.email)
    //     localStorage.setItem('uid', user.uid)
    //     this.setState({ isSocialSignedIn: true })
    //   } else {
    //     this.setState({
    //       onSignUp : false
    //     })
    //   }
    // })
  }

  componentDidMount() {
    var that = this;
    firebase.auth().onAuthStateChanged((user) => {
      console.log("user-->", user);
      if (user) {
        console.log("setting local storage");
        localStorage.setItem("email", user.email);
        localStorage.setItem("uid", user.uid);
        var data = { email: user.email, uid: user.uid };
        // make a axios call for checking if user existence
        const backendurl = properties.backendhost + "user/register";

        axios
          .post(backendurl, data)
          .then((response) => {
            console.log(response.data);

            localStorage.setItem("role", response.data.role);
            this.setState({ isSignedIn: true });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
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
    console.log(
      "localStorage.getItem('email')-->",
      localStorage.getItem("email")
    );
    if (
      localStorage.getItem("email") &&
      localStorage.getItem("uid") &&
      this.state.isSignedIn
    ) {
      redirectVar = <Redirect to="/main/home" />;
    }
    return (
      <div>
        {redirectVar}
        <Form>
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
          <br />
          <br />
        </Form>
      </div>
    );
  }
}

export default Login;
