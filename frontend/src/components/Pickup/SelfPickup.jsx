import React, { Component } from "react";
import { Col, Row, Form, Container, Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import swal from "sweetalert";
import axios from "axios";
import { properties } from "../../properties";
import Spinner from "react-bootstrap/Spinner";
const backendurl = properties.backendhost;

class SelfPickup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfOrders: "",
      orderList: [],
      noOfOrdersToPickUp: "",
      orderListToShow: [],
      errors: "",
      text: null,
      showConfirmOrder: false,
      loading: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let userId = localStorage.getItem("userId");
    axios
      .get(backendurl + "orders/fellowpoolers/" + userId)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          this.setState({
            numberOfOrders: response.data.length,
            orderList: response.data,
            errors: "",
          });
        }
      })
      .catch((error) => {
        console.log(
          "Error in getting fellow pooler orders",
          error,
          error.response
        );
        this.setState({
          errors: error,
        });
      });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      "Number of orders to pick up-->",
      this.state.noOfOrdersToPickUp
    );
    if (
      this.state.noOfOrdersToPickUp < 0 ||
      this.state.noOfOrdersToPickUp > this.state.numberOfOrders
    ) {
      this.setState({
        errors: `Please input value from range 0 - ${this.state.numberOfOrders}`,
        orderListToShow: [],
        showConfirmOrder: false,
      });
    } else {
      this.setState({
        orderListToShow: this.state.orderList.slice(
          0,
          this.state.noOfOrdersToPickUp
        ),
        showConfirmOrder: true,
        errors: "",
      });
    }
  };

  handleCreateOrder = async () => {
    console.log("create order");

    this.setState({
      loading: true,
    });

    try {
      let userResponse = await axios.get(
        properties.backendhost + "user/?email=" + localStorage.getItem("email")
      );
      //console.log(userResponse.data);

      this.setState({
        loading: true
      });

      let data = {};
      data.poolerId = localStorage.getItem("userId");
      data.price = localStorage.getItem("finalOrderTotal");
      data.poolId = userResponse.data.poolId;
      data.storeId = localStorage.getItem("cart_store_id");
      data.items = [];
      let cart = JSON.parse(localStorage.getItem("cart"));
      for (let i = 0; i < cart.length; i++) {
        let item = {};
        item.productId = cart[i].id;
        item.quantity = cart[i].quantity;
        item.price = cart[i].price;
        data.items.push(item);
      }

      data.fellowPoolersOrders = [];
      for (let i = 0; i < this.state.orderListToShow.length; i++) {
        data.fellowPoolersOrders.push(this.state.orderListToShow[i].id);
      }
      console.log("data-->", data);

      let orderResponse = await axios.post(
        properties.backendhost + "order/self",
        data
      );
      console.log(orderResponse.data);

      if (orderResponse.data.pooler.creditScore <= -6) {
        swal({
          title: "Order placed!",
          text:
            "Your contribution credit is: " +
            orderResponse.data.pooler.creditScore +
            " You are in red zone, continue picking up some more orders",
          icon: "error",
        });
        this.setState({
          loading: false,
        });
      } else if (orderResponse.data.pooler.creditScore <= -4) {
        swal({
          title: "Order placed!",
          text:
            "Your contribution credit is: " +
            orderResponse.data.pooler.creditScore +
            " You are in yellow zone, continue picking up some more orders",
          icon: "warning",
        });
        this.setState({
          loading: false,
        });
      } else {
        swal({
          title: "Order placed!",
          text:
            "Your contribution credit is: " +
            orderResponse.data.pooler.creditScore +
            " You are in green zone",
          icon: "success",
        });
        this.setState({
          loading: false,
        });
      }

      localStorage.removeItem("cart");
      localStorage.removeItem("cart_store_id");
      localStorage.removeItem("finalOrderTotal");
      const { history } = this.props;
      history.push("/main/home");
    } catch (e) {
      console.log(e, e.response);
      this.setState({
        loading: false
      });
      // swal(e.response.data.message);
    }
  };

  render() {
    const { text, errors, orderListToShow, showConfirmOrder, loading } = this.state;
    let spinner;

    if(loading) {
      spinner = <Spinner animation="border" variant="primary" />;
    }

    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align background blue">
            <h2 className="text-center text-white font-italic font-family-sans-serif">
              Self Pick-Up
            </h2>
          </div>
        </div>
        <div>
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="poolId">
                <Form.Label>
                  Total number of orders available from fellow poolers:
                </Form.Label>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="poolId">
                <Form.Label>{this.state.numberOfOrders}</Form.Label>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="poolId">
                <Form.Label>
                  How many number of orders you want to pick up for your fellow
                  poolers:
                </Form.Label>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="name">
                <Form.Control
                  type="number"
                  placeholder="Number of orders to pick up"
                  name="noOfOrdersToPickUp"
                  value={this.state.noOfOrdersToPickUp}
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>
            </Form.Row>
            <Button
              className="btn btn-primary"
              type="submit"
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
            <br />
            <p className="text-danger"> {errors}</p>
            <p className="text-success"> {text}</p>
            <br />
          </Form>
          <Container>
            <Row>
              <Col md={{ span: 10, offset: 1 }}>
                <table className="table table-bordered table-hover">
                  {orderListToShow && orderListToShow.length > 0 ? (
                    <thead className="thead">
                      <tr>
                        <th
                          className="text-center  font-weight-bold"
                          scope="col"
                        >
                          Store Name
                        </th>
                        <th
                          className="text-center font-weight-bold"
                          scope="col"
                          width={"50%"}
                        >
                          Order Details
                        </th>
                      </tr>
                    </thead>
                  ) : (
                    ""
                  )}
                  {orderListToShow &&
                    orderListToShow.length > 0 &&
                    orderListToShow.map((order, rowIndex) => {
                      return (
                        <tr key={rowIndex}>
                          <td className="text-center">
                            <span className="badge badge-primary badge-pill">
                              <h5> ${order.storeName} </h5>
                            </span>
                          </td>
                          <table>
                            <thead className="thead">
                              <tr>
                                <th
                                  className="text-center font-weight-bold"
                                  scope="col"
                                  colSpan="4"
                                  width={"70%"}
                                >
                                  Item Name
                                </th>
                                <th
                                  className="text-center  font-weight-bold"
                                  scope="col"
                                  colSpan="4"
                                  width={"20%"}
                                >
                                  Unit
                                </th>
                                <th
                                  className="text-center  font-weight-bold"
                                  scope="col"
                                  colSpan="4"
                                  width={"10%"}
                                >
                                  Quantity
                                </th>
                              </tr>
                            </thead>
                            {order.orderDetails.map((orderDetail, rowIndex) => {
                              return (
                                <tr key={rowIndex}>
                                  <td
                                    className="text-center"
                                    colSpan="4"
                                    width={"70%"}
                                  >
                                    {orderDetail.product.name}
                                  </td>
                                  <td
                                    className="text-center"
                                    colSpan="4"
                                    width={"20%"}
                                  >
                                    {orderDetail.product.unit}
                                  </td>
                                  <td
                                    className="text-center"
                                    colSpan="4"
                                    width={"10%"}
                                  >
                                    {orderDetail.quantity}
                                  </td>
                                  {/* <td className="text-center" scope="row">
														<Card.Img variant="top" src={orderDetail.product.imageURL} />
													</td> */}
                                </tr>
                              );
                            })}
                          </table>
                        </tr>
                      );
                    })}
                </table>
              </Col>
            </Row>
          </Container>
        </div>
        <div>
          {showConfirmOrder && <button
            type="button"
            className="btn btn-primary"
            onClick={this.handleCreateOrder}
          >Confirm order and pickup</button>}
          {spinner}
        </div>
      </div>
    );
  }
}

export default SelfPickup;
