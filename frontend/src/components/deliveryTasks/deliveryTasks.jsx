import React, { Component } from "react";
import { Col, Row, Container, Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import swal from "sweetalert";
import axios from "axios";
import { properties } from "../../properties";
import Spinner from "../common/Spinner";
const backendurl = properties.backendhost;

class DeliveryTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ordersList: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.getOrders();
  }

  getOrders = async () => {
    try {
      let orders = await axios.get(
        backendurl + "orders/" + localStorage.getItem("userId") + "/pickedUp"
      );
      //console.log(orders.data);

      this.setState({
        ordersList: orders.data,
      });
    } catch (e) {
      console.log(e, e.response);
    }
  };

  transformDateTime(data) {
    if (data > 0) {
      let date = new Date(data);
      return date.toUTCString();
    }
    return 0;
  }

  markOrderDelivered = async (orderId) => {
    this.setState({
      loading: true,
    });
    try {
      let orderResponse = await axios.post(
        backendurl + "order/markdelivered/" + orderId
      );
      if (orderResponse.status === 200) {
        swal({
          title: "Order marked as delivered!",
          text: "An email notification has been sent to the delivery pooler",
          icon: "success",
        });
        this.setState({
          loading: false,
        });
        this.getOrders();
      }
    } catch (e) {
      console.log(e, e.response);
      swal({
        title: "Order cannot be marked as delivered!",
        text: e.response.message,
        icon: "error",
      });
    }
  };

  render() {
    const { ordersList, loading } = this.state;
    let spinner;
    if (loading) {
      spinner = <Spinner />;
    }
    console.log(ordersList);
    if (!Array.isArray(ordersList) || !ordersList.length) {
      // array does not exist, is not an array, or is empty
      return (
        <div style={{ height: "75vh" }} className="container valign-wrapper">
          <div className="row">
            <div className="col s12 center-align background blue">
              <h2 className="text-center text-white font-italic font-family-sans-serif">
                Delivery Tasks
              </h2>
            </div>
          </div>
          <Container>
            <Row>
              <Col md={{ span: 10, offset: 4 }}>
                <Card style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Title>
                      There are no orders you have picked up!
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      );
    } else {
      return (
        <div style={{ height: "75vh" }} className="container valign-wrapper">
          <div className="row">
            <div className="col s12 center-align background blue">
              <h2 className="text-center text-white font-italic font-family-sans-serif">
                Delivery Tasks!
              </h2>
            </div>
          </div>
          <Container>
            <Row>
              <Col md={{ span: 10, offset: 1 }}>
                <div>
                  <table className="table table-bordered table-hover">
                    <thead className="thead">
                      <tr>
                        <th
                          className="text-center  font-weight-bold"
                          scope="col"
                        >
                          Order Date
                        </th>
                        <th
                          className="text-center  font-weight-bold"
                          scope="col"
                        >
                          Store Name
                        </th>
                        <th
                          className="text-center  font-weight-bold"
                          scope="col"
                        >
                          Pooler Name
                        </th>
                        <th
                          className="text-center  font-weight-bold"
                          scope="col"
                        >
                          Amount
                        </th>
                        <th
                          className="text-center  font-weight-bold"
                          scope="col"
                        >
                          Status
                        </th>
                        <th
                          className="text-center  font-weight-bold"
                          scope="col"
                          colSpan={2}
                        >
                          Address
                        </th>
                        <th
                          className="text-center  font-weight-bold"
                          scope="col"
                        >
                          Mark as delivered
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {ordersList.length > 0 &&
                        ordersList.map((order, rowIndex) => {
                          return (
                            <tr key={rowIndex}>
                              <th className="text-center" scope="row">
                                {this.transformDateTime(order.date)}
                              </th>
                              <td className="text-center">{order.storeName}</td>
                              <td className="text-center">
                                {order.pooler && order.pooler.nickName}
                              </td>
                              <td className="text-center">{order.price}</td>
                              <td className="text-center">{order.status}</td>
                              <td className="text-center" colSpan={2}>
                                {order.pooler &&
                                  "Street - " +
                                    order.pooler.address.street +
                                    "," +
                                    "City - " +
                                    order.pooler.address.city +
                                    "," +
                                    "State -" +
                                    order.pooler.address.state +
                                    "," +
                                    "Zip - " +
                                    order.pooler.address.zip}
                              </td>
                              <td className="text-center">
                                {order.status === "Picked up" ||
                                order.status === "Delivery not received" ? (
                                  <Button
                                    onClick={() =>
                                      this.markOrderDelivered(order.id)
                                    }
                                    type="button"
                                    className="btn btn-light mr-1"
                                  >
                                    <i className="text-secondary fa fa-check" />
                                  </Button>
                                ) : (
                                  " "
                                )}
                                {spinner}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
  }
}

export default DeliveryTasks;
