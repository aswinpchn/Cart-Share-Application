import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, Col, Row, Button } from "react-bootstrap";
import Modal from "react-responsive-modal";
import StoreEditForm from "./StoreEditForm";

class StoreCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      blockScroll: true,
      quantity: 0,
    };
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }

  onOpenModal = () => {
    this.setState({ open: true, blockScroll: false });
  };
  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { store } = this.props;
    const { open } = this.state;
    return (
      <Card bg="white" style={{ width: "15rem", margin: "1rem" }}>
        <Card.Body>
          {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
          <Row>
            <Col sm={10}>
              <Link
                to={{
                  pathname: "/main/productList",
                  state: {
                    storeID: store.id,
                    storeName: store.name,
                  },
                  target: "_blank",
                }}
              >
                <Card.Title>{store.name}</Card.Title>
              </Link>
            </Col>
          </Row>
          <Row>
            <Col sm={20}>
              <Button
                onClick={this.onOpenModal}
                type="button"
                className="btn btn-light mr-1"
              >
                <i className="text-secondary fa fa-edit" />
              </Button>

              <Modal open={open} onClose={this.onCloseModal} center>
                <p className="text-left tex-secondary  font-weight-bold">
                  Edit Store Details
                </p>
                <StoreEditForm store={store} />
              </Modal>
            </Col>
            <Col sm={20}>
              <Button
                onClick={this.deleteStore}
                type="button"
                className="btn btn-light mr-1"
              >
                <i className="text-secondary fa fa-trash" />
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

export default StoreCard;
