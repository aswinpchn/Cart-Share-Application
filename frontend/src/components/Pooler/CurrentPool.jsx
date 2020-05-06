import React, { Component } from "react";
import axios from "axios";
import { properties } from "../../properties";
import PoolSearch from "./PoolSearch";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import swal from "sweetalert";
import { connect } from "react-redux";
import { getUser } from "../_actions/userActions";

class CurrentPool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      poolName: null,
      poolLeader: null,
      poolId: null,
      deletePoolFailure: null,
      leavePoolFailure: null,
    };
  }

  async componentDidMount() {
    console.log("In Current Pool page ----------------");
    // await this.props.getUser(); Redux Get user
    await this.pageLoad();
  }

  pageLoad = async () => {
    try {
      axios.defaults.withCredentials = true;
      let backendurl =
        properties.backendhost + "user/?email=" + localStorage.getItem("email");
      //console.log(backendurl);
      let userResponse = await axios.get(backendurl);
      //console.log(userResponse);

      if (userResponse.data.poolId) {
        backendurl =
          properties.backendhost + "pool/?poolId=" + userResponse.data.poolId;
        let poolResponse = await axios.get(backendurl);
        //console.log(poolResponse);

        if (poolResponse.data) {
          this.setState({
            poolName: poolResponse.data.name,
            poolLeader: poolResponse.data.leaderId,
            poolId: poolResponse.data.poolId,
          });
        } else {
          console.log("Error while retrieving response");
        }
      } else {
        this.setState({
          poolName: null,
          poolLeader: null,
          poolId: null,
          deletePoolFailure: null,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleDeletePool = async (e) => {
    console.log("Delete button clicked.");

    try {
      axios.defaults.withCredentials = true;
      let backendurl =
        properties.backendhost + "pool/delete/" + this.state.poolId;
      //console.log(backendurl);

      let deleteResponse = await axios.delete(backendurl);
      //console.log(deleteResponse);

      if (deleteResponse.status == 200) {
        swal("Pool Deleted", "success");

        await this.pageLoad();
      }
    } catch (e) {
      //console.log(e.response);
      if (e.response.status == 404) {
        swal("Pool Not found", "failure");
        this.setState({
          deletePoolFailure: "failure - Pool Not found",
        });
      } else if (e.response.status == 409) {
        swal("Inconsistent data", "failure");
        this.setState({
          deletePoolFailure: "failure - Inconsistent data",
        });
      } else if (e.response.status == 406) {
        swal(
          "Pool cannot be deleted because of the associated poolers",
          "failure"
        );
        this.setState({
          deletePoolFailure:
            "failure - Pool cannot be deleted because of the associated poolers",
        });
      } else {
        swal("Pool cannot be deleted", "failure");
        this.setState({
          deletePoolFailure:
            "failure - Pool cannot be deleted, internal server error",
        });
      }
    }
  };


  handleLeavePool = async (e) => {
    try {
      axios.defaults.withCredentials = true;
      let backendurl = properties.backendhost + "pool/leave/" + this.state.poolId + localStorage.getItem("userId");
      let response = await axios.post(backendurl);
      if (response.status == 200) {
        swal("Pool left", "success");
        await this.pageLoad();
      }
    } catch (e) {
      if (e.response.status == 404) {
        swal("Pool or User Not found", "failure");
        this.setState({
          leavePoolFailure: "failure - Pool or User Not found",
        });
      } else if (e.response.status == 406) {
        swal(
          "Pool cannot be left because of the pending orders or delivery tasks",
          "failure"
        );
        this.setState({
          leavePoolFailure:
            "failure - Pool cannot be left because of the pending orders or delivery tasks",
        });
      } else {
        swal("Failed to leave pool", "failure");
        this.setState({
          leavePoolFailure:
            "failure - Pool cannot be left, internal server error",
        });
      }
    }
  };

  render() {
    const { user, loading } = this.props.userState;
    let poolStatus;

    if (this.state.poolName) {
      let actionButton;

      // console.log(localStorage.getItem("userId"));
      // console.log(this.state.poolLeader);
      if (localStorage.getItem("userId") == this.state.poolLeader) {
        actionButton = (
          <Button
            className="btn btn-danger"
            onClick={this.handleDeletePool}
            type="submit"
          >
            Delete Pool
          </Button>
        );
      } else {
        actionButton = (
          <Button
            className="btn btn-danger"
            onClick={this.handleLeavePool}
            type="submit"
          >
            Leave Pool
          </Button>
        );
      }
      poolStatus = (
        <div>
          <div style={{ height: "35vh" }} className="container valign-wrapper">
            <div className="jumbotron">
              <h3>Current Pool</h3>
              <p class="lead text-bold">
                You are part of {this.state.poolName}!.
              </p>
              {actionButton}
            </div>
          </div>
        </div>
      );
    } else {
      poolStatus = (
        <div className="jumbotron">
          <h3>Current Pool</h3>
          <p class="lead text-bold">
            You are not part of any Pool, Type in below to search for current
            pools!
          </p>
        </div>
      );
    }

    return (
      <div className={"container"}>
        {poolStatus}
        <br />
        <div>
          <PoolSearch user={{ poolName: this.state.poolName }} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userState: state.userState,
});

export default connect(mapStateToProps, { getUser })(CurrentPool);
