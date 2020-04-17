import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Login from "./Login";

class LandingPage extends Component {
  render() {
    return (
      <div>
        <Login />
      </div>
    );
  }
}

var button = {
  textAlign: "center",
};

var style = {
  fontWeight: "bold",
  fontSize: 35,

  fontFamily: "Gotham Narrow SSm",
  padding: 10,

  margin: 10,
  display: "inline-block",
};

var style1 = {
  fontWeight: "bold",
  fontSize: 25,
  textAlign: "center",
  fontFamily: "Gotham Narrow SSm",
  color: "blue",
  padding: 10,
  margin: 10,
  display: "inline-block",
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
const style3 = {
  backgroundColor: "#00acee",
  color: "white",
  fontSize: 20,
  fontFamily: "Gotham Narrow SSm",
  paddingLeft: 160,
  paddingRight: 160,
  paddingTop: 5,
  paddingBottom: 5,
  borderRadius: 100,
};

export default LandingPage;
