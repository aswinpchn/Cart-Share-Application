import React, { Component } from "react";
import Modal from "react-responsive-modal";
import { Col, Form, ListGroup } from "react-bootstrap";
import axios from "axios";
import ProfileInfoForm from "../Profile/ProfileInfoForm";
import { properties } from "../../properties";
const backendurl = properties.backendhost;

class Profile extends Component {
  state = {
    screenName: "",
    nickName: "",
    email: "",
    poolId: "",
    contributionCredit: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    open: false,
    blockScroll: true,
  };

  onOpenModal = () => {
    this.setState({ open: true, blockScroll: false });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    let email = localStorage.getItem("email");
    axios
      .get(backendurl + "/user?email=" + email)
      .then((response) => {
        console.log("the response data is" + response.data);
        this.setState({
          screenName: response.data.screenName,
          nickName: response.data.nickName,
          email: response.data.email,
          poolId: response.data.poolId,
          contributionCredit: response.data.creditScore,
          street: response.data.address.street,
          city: response.data.address.city,
          state: response.data.address.state,
          zip: response.data.address.zip,
        });
      })
      .catch((error) => {
        console.log("Error while retreiving response");
      });
  }

  render() {
    const {
      screenName,
      nickName,
      email,
      poolId,
      contributionCredit,
      street,
      city,
      state,
      zip,
      open,
    } = this.state;
    return (
      <div>
        <div style={{ height: "75vh" }} className="container valign-wrapper">
          <div className="row">
            <div className="col s12 center-align background blue">
              <h2 className="text-center text-white font-italic font-family-sans-serif">
                Account Information
              </h2>
            </div>
          </div>

          <form>
            <div className="form-group">
              <ul className="list-group border">
                <li className="list-group-item border border-white">
                  <label className="text-primary">Screen Name : </label>
                  <span className="text-secondary text-center">
                    {screenName}
                  </span>
                </li>
                <li className="list-group-item border border-white">
                  <label className="text-primary">Nick Name : </label>
                  <span className="text-secondary text-center">{nickName}</span>
                </li>
                <li className="list-group-item border border-white">
                  <label className="text-primary">Email: </label>
                  <span className="text-secondary text-center">{email}</span>
                </li>
                <li className="list-group-item border border-white">
                  <label className="text-primary">Pool ID: </label>
                  <span className="text-secondary text-center">{poolId}</span>
                </li>
                <li className="list-group-item border border-white">
                  <label className="text-primary">Contribution Credit: </label>
                  <span className="text-secondary text-center">
                    {contributionCredit}
                  </span>
                </li>
                <li className="list-group-item border border-white">
                  <label className="text-primary">Address: </label>
                  <br />
                  <span className="text-secondary text-center">
                    Street: {street}
                  </span>
                  <br />
                  <span className="text-secondary text-center">
                    City: {city}
                  </span>
                  <br />
                  <span className="text-secondary text-center">
                    State: {state}
                  </span>
                  <br />
                  <span className="text-secondary text-center">Zip: {zip}</span>
                </li>
                <li className="list-group-item border border-white">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.onOpenModal}
                  >
                    Update
                  </button>
                </li>
                <div className="overflow-auto">
                  <Modal open={open} onClose={this.onCloseModal} center>
                    <h4 className="text-center tex-secondary">
                      Update Your Profile Details
                    </h4>
                    <ProfileInfoForm
                      email={email}
                      screenName={screenName}
                      nickName={nickName}
                      street={street}
                      city={city}
                      state={state}
                      zip={zip}
                    />
                  </Modal>
                </div>
              </ul>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Profile;
