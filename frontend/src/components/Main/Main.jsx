import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import ProductList from "../AdminStore/ProductList";

class Main extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container"></div>
        <BrowserRouter>
          <Switch>
            <Route path="/main/home" component={Home} />
            <Route path="/main/productList" component={ProductList} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default Main;
