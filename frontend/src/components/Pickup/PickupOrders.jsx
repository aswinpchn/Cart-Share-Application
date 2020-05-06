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
  };

  componentDidMount() {
    // axios post call, with delivery pooler id to get all the orders mapping with status assigned.

    let userId = localStorage.getItem("userId");

    axios
      .get(backendurl + "pickuporders/" + userId)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          this.setState({
            numberOfOrders: response.data.length,
            orders: response.data,
            errors: "",
          });
        }
      })
      .catch((error) => {
        console.log("Error in getting orders", error, error.response);
        this.setState({
          errors: error,
        });
      });
  }

  onOpenModal = () => {
    this.setState({ open: true, blockScroll: false });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  handleSubmit = (groupId) => {
    console.log("in handle submit the group id is" + groupId);
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    axios
      .post(backendurl + `pickuporders/markpickedup/${groupId}`, config)
      .then((response) => {
        if (response.status === 200) {
          swal("Status Updated");
          this.setState({
            showButton: false,
          });
        }
      })
      .catch((error) => {
        swal("Status Update Failed.Please try again");
      });
  };

  render() {
    const { orders, open, showButton } = this.state;

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
      const GroupedById = groupBy(this.state.orders, "groupId");

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
                                      disabled={!showButton}
                                    >
                                      Pickedup
                                    </button>
                                  </span>
                                </span>
                              </Accordion.Toggle>
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

export default PickupOrders;
