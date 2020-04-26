import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import ProductList from "../AdminStore/ProductList";
import Search from "../AppEntry/Search";
import UserDetailsForm from "../AppEntry/UserDetailsForm";

class Main extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container"></div>
        <BrowserRouter>
          <Switch>
            <Route path="/main/userDetailsForm" component={UserDetailsForm} />
            <Route path="/main/home" component={Home} />
            <Route path="/main/productList" component={ProductList} />
            <Route path="/main/admin/search" component={Search} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default Main;
