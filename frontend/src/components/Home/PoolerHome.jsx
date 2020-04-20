import React, { Component } from "react";

class PoolerHome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h2>
              Welcome
            </h2>
            <h3><p>
              Home Page for Pooler...
            </p></h3>
          </div>
        </div>
      </div>
    );
  }
}

export default PoolerHome;