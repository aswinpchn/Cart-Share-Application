import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Route, withRouter } from "react-router-dom";
import {
  Navbar,
  Nav,
  Dropdown,
  Button,
  Label,
  Container,
  Row,
  Card,
  Col,
} from "react-bootstrap";
import firebase from "firebase";
import DropdownButton from "react-bootstrap/DropdownButton";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserProfile } from "../_actions/profileActions";

class Navigationbar extends Component {
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
    let displayMessage;
    let role;
    let uid = localStorage.getItem("uid");
    if (uid) {
      role = localStorage.getItem("role");
    }
    let { verified, screenName } = this.props.profileState.user;
    console.log("the verified status in navbar" + verified);

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

    // if (!verified) {
    //   displayMessage = (
    //     <div>
    //       <Container>
    //         <Row>
    //           <Col md={{ span: 10, offset: 4 }}>
    //             <Card style={{ width: "18rem" }}>
    //               <Card.Body>
    //                 <Card.Title>Please verify your account</Card.Title>
    //                 <Card.Text>
    //                   Check your email and click the verify link!
    //                 </Card.Text>
    //               </Card.Body>
    //             </Card>
    //           </Col>
    //         </Row>
    //       </Container>
    //       ;
    //     </div>
    //   );
    // }

    if (role === "pooler" && verified) {
      menuButtons = (
        <div className="collapse navbar-collapse navbar-right" id="navbarNav">
          <Nav className="mr-auto">
            <Navbar.Brand className="active" href="#">
              <img
                alt="CartPool"
                src={require("../common/images/shoppingcart.png")}
                width={40}
              />
            </Navbar.Brand>

            <Nav.Item>
              <h5 className="text-center text-bold font-">Hi {screenName}</h5>
            </Nav.Item>
          </Nav>

          <Nav.Link href="/main/home">Home</Nav.Link>

          <Nav.Link href="/main/pooler/search">Search Products</Nav.Link>

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

          <DropdownButton id="dropdown-basic-button" title="Account">
            <Dropdown.Item href="/main/pooler/account">
              My Account
            </Dropdown.Item>
            <Dropdown.Item href="/main/pooler/orders">My Orders</Dropdown.Item>
            <Dropdown.Item href="/main/pooler/pickup">
              Pickup Orders
            </Dropdown.Item>
            <Dropdown.Item href="/main/pooler/deliveryTasks">
              Your Delivery Tasks
            </Dropdown.Item>
            <Dropdown.Item href="/main/pooler/sendMessage">
              Message Others
            </Dropdown.Item>
          </DropdownButton>

          <Nav.Link href="/main/cart">
            <Button>
              {" "}
              <i className="fa fa-shopping-cart" aria-hidden="true">
                Cart{" "}
              </i>
            </Button>
          </Nav.Link>
        </div>
      );
    } else if (role === "admin" && verified) {
      menuButtons = (
        <div className="collapse navbar-collapse navbar-right" id="navbarNav">
          <Nav className="mr-auto">
            <Navbar.Brand className="active" href="#">
              <img
                alt="CartPool"
                src={require("../common/images/shoppingcart.png")}
                width={40}
              />
            </Navbar.Brand>

            <Nav.Item>
              <h5 className="text-center text-bold font-">Hi {screenName}</h5>
            </Nav.Item>
          </Nav>

          <Nav className="mr-auto"></Nav>
          <Nav.Link href="/main/home">Home</Nav.Link>
          <Nav.Link href="/main/admin/search">Search</Nav.Link>
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

          <Nav.Link>{logoutButton}</Nav.Link>
        </nav>
        {displayMessage}
      </div>
    );
  }
}

Navigationbar.propTypes = {
  profileState: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profileState: state.profileState,
  errors: state.errorState,
});
export default connect(mapStateToProps, { getUserProfile })(Navigationbar);
