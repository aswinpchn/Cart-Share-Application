import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Route, withRouter } from "react-router-dom";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import decode from "jwt-decode";
import firebase from "firebase";
import DropdownButton from "react-bootstrap/DropdownButton";

class Navigationbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onLogoutClick = (e) => {
    e.preventDefault();
    // logout logic
    firebase
      .auth()
      .signOut()
      .then(function () {
        // Sign-out successful.
        localStorage.clear(); //for localStorage
        window.location.href = "/";
      })
      .catch(function (error) {
        // An error happened.
        console.log("Error occurred while logging out");
      });
  };

  onSearchClick = (e) => {
    e.preventDefault();

    window.location.href = "/main/admin/search";
  };

  render() {
    let role;
    let uid = localStorage.getItem("uid");
    if (uid) {
      role = localStorage.getItem("role");
    }

    var logoutButton, menuButtons, profile, searchButton;

    logoutButton = (
      <div className="collapse navbar-collapse navbar-right" id="navbarNav">
        <Nav className="mr-auto"></Nav>
        <Link
          className="nav-link text-dark t-font-size-14"
          to="/"
          onClick={this.onLogoutClick}
        >
          <i className="fas fa-sign-out-alt pr-2"></i>Logout
        </Link>
      </div>
    );

    searchButton = (
      <div className="collapse navbar-collapse navbar-right" id="navbarNav">
        <Nav className="mr-auto"></Nav>
        <Link
          className="nav-link text-dark t-font-size-14"
          to="/"
          onClick={this.onSearchClick}
        >
          Search
        </Link>
      </div>
    );

    if (role === "pooler") {
      menuButtons = (
        <div className="collapse navbar-collapse navbar-right" id="navbarNav">
          <Nav className="mr-auto"></Nav>
          <Nav.Link>Test</Nav.Link>
          <Nav.Link href="/main/home">Home</Nav.Link>
          <DropdownButton id="dropdown-basic-button" title="Pool">
            <Dropdown.Item href="/main/pooler/currentPool">
              Current Pool
            </Dropdown.Item>
            <Dropdown.Item href="/main/pooler/createPool">
              Create Pool
            </Dropdown.Item>
            <Dropdown.Item href="/main/pooler/poolRequests">
              Review Pool Requests
            </Dropdown.Item>
          </DropdownButton>
          <Nav.Link>{logoutButton}</Nav.Link>
        </div>
      );
    } else if (role === "admin") {
      menuButtons = (
        <div className="collapse navbar-collapse navbar-right" id="navbarNav">
          <Nav className="mr-auto"></Nav>
          <Nav.Link href="/main/home">Home</Nav.Link>
          <Nav.Link href="/main/admin/search">Search</Nav.Link>
          <Nav.Link>{logoutButton}</Nav.Link>
        </div>
      );
    }

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-white border">
          <Navbar.Brand>
            <Link to="/home" className="nav-link" href="#"></Link>
          </Navbar.Brand>
          {menuButtons}
        </nav>
      </div>
    );
  }
}

export default withRouter(Navigationbar);
