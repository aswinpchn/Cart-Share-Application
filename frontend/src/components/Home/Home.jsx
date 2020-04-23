import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import PoolerHome from "./PoolerHome";
import AdminHome from "./AdminHome";
import decode from "jwt-decode";
// import firebase from 'firebase';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // logout = () => {
  //   console.log("inside onclick")
  //   var that = this
  //   firebase.auth().signOut().then(function() {
  //     console.log("Logging out")
  //     localStorage.removeItem("email")
  //     localStorage.removeItem("uid")
  //     localStorage.removeItem("firebaseui::rememberedAccounts")
  //     // that.props.history.push("/Test");
  //     window.location.href = "/"
  //     // Sign-out successful.
  //   }, function(error) {
  //     console.log("error in logging out")
  //     // An error happened.
  //   });
  // }

  render() {
    var homeComponent;
    let token = sessionStorage.getItem("token");
    if (!token) {
      this.props.history.push("/");
    }
    if (token) {
      let decodedtoken = decode(token);
      if (decodedtoken.data.role === "admin") {
        homeComponent = <AdminHome />;
      } else if (decodedtoken.data.role === "pooler") {
        homeComponent = <PoolerHome />;
      } else {
        this.props.history.push("/");
      }
    }
  // return <div><button onClick={this.logout}>Logout</button></div>
    return <div>{homeComponent}</div>;
  }
}

export default Home;
