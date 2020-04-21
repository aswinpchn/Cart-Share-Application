import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import StoreInfoForm from "../AdminStore/StoreInfoForm";
class AdminHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      blockScroll: true,
      errors: "",
    };
  }

  onOpenModal = () => {
    this.setState({ open: true, blockScroll: false });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h2>Welcome</h2>
            <h3>
              <p>Home Page for Admin...</p>
            </h3>
          </div>
        </div>

        <li className="list-group-item border border-white">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.onOpenModal}
          >
            Create Store
          </button>
          <div className="overflow-auto border">
            <Modal open={open} onClose={this.onCloseModal} center>
              <h4 className="text-center tex-secondary">Enter Store Details</h4>
              <StoreInfoForm />
            </Modal>
          </div>
        </li>
      </div>
    );
  }
}

export default AdminHome;
