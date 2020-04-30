import React, { Component } from "react";
import axios from "axios";
import { properties } from "../../properties";
import PoolSearch from "./PoolSearch";

class CurrentPool extends Component {

  constructor(props) {
    super(props);
    this.state = {
      poolName: null
    }
  }

  async componentDidMount() {
    console.log("In Current Pool page ----------------");

    try {
      axios.defaults.withCredentials = true;
      let backendurl =
        properties.backendhost + "user/?email=" + localStorage.getItem("email");
      //console.log(backendurl);
      let userResponse = await axios.get(backendurl);
      console.log(userResponse);

      if(userResponse.data.poolId) {
        backendurl = properties.backendhost + "pool/?poolId=" + userResponse.data.poolId;
        let poolResponse = await axios.get(backendurl);
        console.log(poolResponse);

        if (poolResponse.data) {
          this.setState({
            poolName: poolResponse.data.name
          });
        } else {
          console.log("Error while retrieving response");
        }
      } else {

      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {

    let poolStatus;

    if(this.state.poolName) {
      poolStatus = (
        <div>
          <h1>Current Pool</h1>
          <h3>You are part of {this.state.poolName}!</h3>
        </div>
      );
    } else {
      poolStatus = (
        <div>
          <h1>Current Pool</h1>
          <h3>You are not part of any Pool, Type in below to search for current pools!</h3>
        </div>
      );
    }

    return (
      <div>
        {poolStatus}
        <PoolSearch user={{ poolName: this.state.poolName}} />
      </div>
    );
  }
}

export default CurrentPool;
