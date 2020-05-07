import React, { Component } from "react";
import Modal from "react-responsive-modal";
import swal from "sweetalert";
import Qrcode from "./Qrcode";
import {
  Col,
  Form,
  Container,
  Row,
  Card,
  Accordion,
  Button,
} from "react-bootstrap";
import { getPickupOrders, markPickedUp } from "../_actions/pickupActions";

import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import PropTypes from "prop-types";
import { properties } from "../../properties";
import axios from "axios";
const backendurl = properties.backendhost;

class PickupOrders extends Component {
  state = {
    orders: [],
    groupOrders: [],
    GroupedById: {},
    numberOfOrders: "",
    open: false,
    blockScroll: true,
    showButton: true,
    scanned: false,
  };

  componentDidMount() {
    // axios post call, with delivery pooler id to get all the orders mapping with status assigned.
    this.props.getPickupOrders();
  }

  onOpenModal = () => {
    this.setState({ open: true, blockScroll: false, scanned: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  handleSubmit = (groupId) => {
    console.log("in handle submit the group id is" + groupId);
    this.props.markPickedUp(groupId);
  };

  render() {
    const { open, showButton, scanned } = this.state;
    const { orders, loading } = this.props.pickupState;
    let spinner;
    if (loading) {
      spinner = <Spinner />;
    }

    if (!Array.isArray(orders) || !orders.length) {
      // array does not exist, is not an array, or is empty
      return (
        <div style={{ height: "75vh" }} className="container valign-wrapper">
          <div className="row">
            <div className="col s12 center-align background blue">
              <h2 className="text-center text-white font-italic font-family-sans-serif">
                Cart
              </h2>
            </div>
          </div>
          <Container>
            <Row>
              <Col md={{ span: 10, offset: 4 }}>
                <Card style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Title>There are no orders to pickup!</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      );
    } else {
      //Accepts the array and key
      const groupBy = (orders, groupId) => {
        // Return the end result
        return orders.reduce((result, currentValue) => {
          // If an array already present for key, push it to the array. Else create an array and push the object
          (result[currentValue[groupId]] =
            result[currentValue[groupId]] || []).push(currentValue);
          // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
          return result;
        }, {}); // empty object is the initial value for result object
      };
      const GroupedById = groupBy(orders, "groupId");

      let rows = [];
      let property;
      for (property in GroupedById) {
        let obj = GroupedById[property];
        obj.property = property;
        rows.push(obj);
      }

      return (
        <div style={{ height: "75vh" }} className="container valign-wrapper">
          <div className="row">
            <div className="col s12 center-align background blue">
              <h2 className="text-center text-white font-italic font-family-sans-serif">
                Pickup Orders
              </h2>
            </div>
          </div>

          <Container>
            <Row>
              <Col md={{ span: 10, offset: 1 }}>
                <Accordion defaultActiveKey="0">
                  <Card>
                    {rows &&
                      rows.map((obj, rowIndex) => {
                        console.log("group id is" + obj.property);
                        return (
                          <div key={rowIndex}>
                            <Card.Header>
                              <Accordion.Toggle
                                as={Button}
                                variant="link"
                                eventKey={rowIndex}
                              >
                                <span>
                                  <span style={{ marginLeft: "2px" }}>
                                    SNO : {rowIndex + 1}
                                  </span>

                                  <span style={{ marginLeft: "40px" }}>
                                    Click here to view list of orders that can
                                    be picked up!{" "}
                                  </span>
                                </span>
                              </Accordion.Toggle>
                              <span style={{ marginLeft: "70px" }}>
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                  onClick={this.onOpenModal}
                                >
                                  Scan QR Code
                                </button>

                                <div className="overflow-auto">
                                  <Modal
                                    open={open}
                                    onClose={this.onCloseModal}
                                    center
                                  >
                                    <h4 className="text-center tex-secondary">
                                      Scan Qrcode
                                    </h4>
                                    <Qrcode rowIndex={rowIndex} />
                                  </Modal>
                                </div>
                              </span>
                              <span>
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                  onClick={() =>
                                    this.handleSubmit(obj.property)
                                  }
                                  disabled={!scanned}
                                >
                                  Pickedup
                                </button>
                                {spinner}
                              </span>
                            </Card.Header>

                            {obj &&
                              obj.map((element, i) => {
                                console.log("elements are" + element.orderId);
                                return (
                                  <div key={i}>
                                    <Accordion.Collapse eventKey={rowIndex}>
                                      <Card.Body>
                                        {" "}
                                        <span>
                                          <span style={{ marginLeft: "30px" }}>
                                            <b> Store Name : </b>{" "}
                                            {element.storeName}
                                          </span>
                                          <span style={{ marginLeft: "30px" }}>
                                            <b> OrderId: </b>
                                            {element.id}
                                          </span>
                                        </span>
                                      </Card.Body>
                                    </Accordion.Collapse>
                                  </div>
                                );
                              })}
                          </div>
                        );
                      })}
                  </Card>
                </Accordion>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
  }
}

PickupOrders.propTypes = {
  errors: PropTypes.object.isRequired,
  orders: PropTypes.array,
};
const mapStateToProps = (state) => ({
  pickupState: state.pickupState,
  errors: state.errorState,
});

export default connect(mapStateToProps, { getPickupOrders, markPickedUp })(
  PickupOrders
);
