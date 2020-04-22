import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import PoolerHome from "./PoolerHome";
import AdminHome from "./AdminHome";
import decode from "jwt-decode";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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
    return <div>{homeComponent}</div>;
  }
}

export default Home;
