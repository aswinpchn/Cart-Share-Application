import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import ProductList from "../AdminStore/ProductList";
import Search from "../AppEntry/Search";
import UserDetailsForm from "../AppEntry/UserDetailsForm";
import CurrentPool from "../Pooler/CurrentPool";
import CreatePool from "../Pooler/CreatePool";
import PoolRequests from "../Pooler/PoolRequests";
import Cart from "../Cart/cart";
import Checkout from "../Pooler/Checkout";

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
            <Route path="/main/productList/:storeId" component={ProductList} />
            <Route path="/main/admin/search" component={Search} />
            <Route path="/main/pooler/currentPool" component={CurrentPool} />
            <Route path="/main/pooler/createPool" component={CreatePool} />
            <Route path="/main/pooler/poolRequests" component={PoolRequests} />
            <Route path="/main/cart" component={Cart} />
            <Route path="/main/checkout" component={Checkout} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default Main;
