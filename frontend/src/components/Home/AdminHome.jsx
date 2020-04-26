import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import StoreInfoForm from "../AdminStore/StoreInfoForm";
import StoreCard from "../AdminStore/StoreCard";
import { properties } from "../../properties";
import axios from "axios";
const backendurl = properties.backendhost;

class AdminHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storeID: "",
      name: "",
      storeImage: "",
      stores: [],
      open: false,
      blockScroll: true,
      errors: "",
    };
  }
  componentDidMount() {
    this.getStores();
  }

  getStores = async () => {
    let response = await axios.get(backendurl + "store/all");
    console.log("the response is " + response.data);
    this.setState({
      stores: response.data,
    });
  };

  onOpenModal = () => {
    this.setState({ open: true, blockScroll: false });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    let stores = [];
    const { open } = this.state;

    if (this.state.stores.length) {
      stores = this.state.stores.map((store, storeIndex) => {
        return (
          <Col key={storeIndex} sm={3}>
            <StoreCard store={store} />
          </Col>
        );
      });
    }

    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align background light-blue">
            <h2 className="text-center text-white font-italic font-family-sans-serif">
              Welcome Admin
            </h2>
          </div>
        </div>

        <li className="list-group-item border border-white">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.onOpenModal}
          >
            Create New Store
          </button>
          <div className="overflow-auto border">
            <Modal open={open} onClose={this.onCloseModal} center>
              <h4 className="text-center tex-secondary">Enter Store Details</h4>
              <StoreInfoForm />
            </Modal>
          </div>
        </li>

        <div className=" container">
          <div className="container">
            <div>
              <Row>{stores}</Row>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminHome;
