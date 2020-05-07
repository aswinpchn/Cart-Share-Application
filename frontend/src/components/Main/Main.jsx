import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserProfile } from "../_actions/profileActions";
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import ProductList from "../AdminStore/ProductList";
import Search from "../AppEntry/Search";
import CurrentPool from "../Pooler/CurrentPool";
import CreatePool from "../Pooler/CreatePool";
import PoolRequests from "../Pooler/PoolRequests";
import Cart from "../Cart/cart";
import Checkout from "../Pooler/Checkout";
import PickupOrders from "../Pickup/PickupOrders";
import Profile from "../Profile/Profile";
import MyOrders from "../Orders/MyOrders";
import deliveryTasks from "../deliveryTasks/deliveryTasks";
import SelfPickup from "../Pickup/SelfPickup";
import PoolerProductSearch from "../Pooler/PoolerProductSearch";
import SendMessage from "../Message/Message";

class Main extends Component {
  componentDidMount() {
    this.props.getUserProfile();
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container"></div>
        <BrowserRouter>
          <Switch>
            <Route path="/main/home" component={Home} />
            <Route path="/main/productList/:storeId" component={ProductList} />
            <Route path="/main/admin/search" component={Search} />
            <Route path="/main/pooler/currentPool" component={CurrentPool} />
            <Route path="/main/pooler/createPool" component={CreatePool} />
            <Route path="/main/pooler/poolRequests" component={PoolRequests} />
            <Route path="/main/pooler/search" component={PoolerProductSearch} />
            <Route path="/main/cart" component={Cart} />
            <Route path="/main/checkout" component={Checkout} />
            <Route path="/main/pooler/account" component={Profile} />
            <Route path="/main/pooler/orders" component={MyOrders} />
            <Route path="/main/pooler/pickup" component={PickupOrders} />
            <Route
              path="/main/pooler/deliveryTasks"
              component={deliveryTasks}
            />
            <Route path="/main/pooler/sendMessage" component={SendMessage} />
            <Route path="/main/selfPickup" component={SelfPickup} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

Main.propTypes = {
  profileState: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profileState: state.profileState,
  errors: state.errorState,
});
export default connect(mapStateToProps, { getUserProfile })(Main);
