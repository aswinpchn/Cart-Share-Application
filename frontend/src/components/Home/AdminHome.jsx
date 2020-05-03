import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import StoreInfoForm from "../AdminStore/StoreInfoForm";
import StoreCard from "../AdminStore/StoreCard";
import { getStores } from "../_actions/storeActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import ProductInfoForm from "../AdminStore/ProductInfoForm";

class AdminHome extends Component {
  state = {
    storeID: "",
    name: "",
    storeImage: "",
    stores: [],
    openStore: false,
    openProduct: false,
    blockScroll: true,
    errors: "",
  };

  componentDidMount() {
    this.props.getStores();
  }
  onOpenStoreModal = () => {
    this.setState({ openStore: true, blockScroll: false });
  };

  onCloseStoreModal = () => {
    this.setState({ openStore: false });
  };

  onOpenProductModal = () => {
    this.setState({ openProduct: true, blockScroll: false });
  };

  onCloseProductModal = () => {
    this.setState({ openProduct: false });
  };

  render() {
    const { openStore, openProduct } = this.state;
    const { stores, loading } = this.props.storeState;
    let storeContent;

    if (stores === null || loading) {
      storeContent = <Spinner />;
    } else {
      storeContent = stores.map((store, storeIndex) => {
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
          <div className="col s12 center-align background blue">
            <h2 className="text-center text-white font-italic font-family-sans-serif">
              Welcome Admin
            </h2>
          </div>
        </div>

        <li key="1" className="list-group-item border border-white">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.onOpenStoreModal}
          >
            Create New Store
          </button>
          <div className="overflow-auto border">
            <Modal open={openStore} onClose={this.onCloseStoreModal} center>
              <h4 className="text-center tex-secondary">Enter Store Details</h4>
              <StoreInfoForm />
            </Modal>
          </div>
        </li>

        <li key="2" className="list-group-item border border-white">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.onOpenProductModal}
          >
            Create New Product
          </button>
          <div className="overflow-auto border">
            <Modal open={openProduct} onClose={this.onCloseProductModal} center>
              <h4 className="text-center tex-secondary">
                Enter Product Details
              </h4>
              <ProductInfoForm stores={stores} />
            </Modal>
          </div>
        </li>

        <div className=" container">
          <div className="container">
            <div>
              <Row>{storeContent}</Row>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AdminHome.propTypes = {
  errors: PropTypes.object.isRequired,
  stores: PropTypes.array,
};
const mapStateToProps = (state) => ({
  storeState: state.storeState,
  errors: state.errorState,
});
export default connect(mapStateToProps, { getStores })(AdminHome);
