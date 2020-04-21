import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Route, withRouter } from 'react-router-dom';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import decode from 'jwt-decode';

class Navigationbar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onLogoutClick = e => {
        e.preventDefault();
        // logout logic
    };

    render() {
        let isAuthenticated = false;
        let username;
        let token = sessionStorage.getItem('token');
        let decodedtoken = '';
        if (token) {
            isAuthenticated = true;
            decodedtoken = decode(token);
        } 

        var loginButton, logoutButton, menuButtons, orders, profile;

        loginButton = (
            <div className="collapse navbar-collapse navbar-right" id="navbarNav">
                <Nav className="mr-auto">
                </Nav>
                <Link to="/login" className="nav-link text-dark t-font-size-14"><i className="fas fa-user"></i>&nbsp;Login</Link>
            </div>
        );

        logoutButton = (
            <div className="collapse navbar-collapse navbar-right" id="navbarNav">
                <Nav className="mr-auto">
                </Nav>
                <Link className="nav-link text-dark t-font-size-14" to="/" onClick={this.onLogoutClick}><i className="fas fa-sign-out-alt pr-2"></i>Logout</Link>
            </div>
        );

        profile = (
            <Link className="nav-link text-dark t-font-size-14" to="/profile"><i className="fas fa-id-card"></i> Profile</Link>
        );

        if (isAuthenticated && decodedtoken.data.role === 'pooler') {
            username = (
                <Dropdown>
                    <Dropdown.Toggle variant="link" className="nav-link text-dark t-font-size-14" id="dropdown-basic">
                        <i className="fas fa-user" /> Hi, {decodedtoken.data.name}!
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>{profile}</Dropdown.Item>
                        <Dropdown.Item>{logoutButton}</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            );

            menuButtons = (
                <div className="collapse navbar-collapse navbar-right" id="navbarNav">
                    <Nav className="mr-auto">
                    </Nav>
                    <Nav.Link>{orders}</Nav.Link>
                    <Nav.Link>{username}</Nav.Link>
                </div>
            );
        }
        else if (isAuthenticated && decodedtoken.data.role === 'admin') {
            menuButtons = (
                <div className="collapse navbar-collapse navbar-right" id="navbarNav">
                    <Nav className="mr-auto">
                    </Nav>
                    <Nav.Link>Test</Nav.Link>
                    <Nav.Link>{logoutButton}</Nav.Link>
                </div>
            );;
        }
        else {
            menuButtons = loginButton;
        }

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-white border">
                    <Navbar.Brand>
                        <Link to='/home' className="nav-link" href="#">
                        </Link>
                    </Navbar.Brand>
                    {menuButtons}
                </nav>
            </div>
        );
    }
}

export default withRouter(Navigationbar);