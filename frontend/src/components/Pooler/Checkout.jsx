import React, {Component} from "react";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import { properties } from "../../properties";
import axios from 'axios';

class Checkout extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount = async () => {

    let cart = JSON.parse(localStorage.getItem("cart"));
    //console.log("values from local storage, Cart" + cart);
    //console.log("values from local storage, StoreId" + localStorage.getItem("cart_store_id"));

    let storeResponse = await axios.get(properties.backendhost + 'store/' + localStorage.getItem("cart_store_id"));
    //console.log(storeResponse.data);
    let store = storeResponse.data;

    console.log(cart);
    console.log(store);

    if(cart && cart.length > 0) {

      let totalBasePrice = 0;
      for(let i = 0; i < cart.length; i++) {
        totalBasePrice += cart[i].amount;
      }
      //console.log(totalBasePrice);

      let tax = totalBasePrice*0.0925;
      //console.log(tax);

      let convenienceFee = totalBasePrice*0.005;
      //console.log(convenienceFee);

      let finalOrderTotal = totalBasePrice + tax + convenienceFee;
      //console.log(finalOrderTotal);

      let order = {};
      order.totalBasePrice = totalBasePrice;
      order.tax = tax;
      order.convenienceFee = convenienceFee;
      order.finalOrderTotal = finalOrderTotal;
      //console.log(order);

      this.setState({
        cart: cart,
        store: store,
        order: order
      });
    }

  }

  render () {
    const {cart, store, order} = this.state;
    console.log(this.state);
    if(cart && store && order) {
      return (
        <div style={{ height: "75vh" }} className="container valign-wrapper">
          <div className="row">
            <div className="col s12 center-align background blue">
              <h2 className="text-center text-white font-italic font-family-sans-serif">
                Checkout - You are ordering from {store.name}
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
                        Item Name
                      </th>
                      <th
                        className="text-center  font-weight-bold"
                        scope="col"
                      >
                        Quanity
                      </th>
                      <th
                        className="text-center  font-weight-bold"
                        scope="col"
                      >
                        Price
                      </th>
                      <th
                        className="text-center  font-weight-bold"
                        scope="col"
                      >
                        Amount
                      </th>
                    </tr>
                    </thead>
                    <tbody>

                      {cart &&
                      cart.map((item, rowIndex) => {
                        return (
                          <tr key={rowIndex}>
                            <td className="text-center" scope="row">
                              {item.name}
                            </td>
                            <td className="text-center" scope="row">
                              {item.quantity}
                            </td>
                            <td className="text-center" scope="row">
                              {item.price}
                            </td>
                            <td className="text-center" scope="row">
                              {item.amount}
                            </td>
                          </tr>
                        );
                      })}

                      <tr>
                        <td className="text-center" colSpan="3">
                          <h5> Total Base Price </h5>
                        </td>

                        <td className="text-center">
                              <span className="badge badge-primary badge-pill">
                                <h5> ${order.totalBasePrice} </h5>
                              </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-center" colSpan="3">
                          <h5> Tax </h5>
                        </td>

                        <td className="text-center">
                              <span className="badge badge-primary badge-pill">
                                <h5> ${order.tax} </h5>
                              </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-center" colSpan="3">
                          <h5> Convenience Fee </h5>
                        </td>

                        <td className="text-center">
                              <span className="badge badge-primary badge-pill">
                                <h5> ${order.convenienceFee} </h5>
                              </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-center" colSpan="3">
                          <h5> Final Order Total </h5>
                        </td>

                        <td className="text-center">
                              <span className="badge badge-primary badge-pill">
                                <h5> ${order.finalOrderTotal} </h5>
                              </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 10, offset: 1 }}>
                <Button>
                  Self pickup
                </Button>
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 10, offset: 1 }}>
                <Button>
                  Defer pickup
                </Button>
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
                Check-out
              </h2>
            </div>
          </div>
          <Container>
            <Row>
              <Col md={{ span: 10, offset: 4 }}>
                <Card style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Title>
                      There is nothing in the cart at the moment, You can't checkout anything!
                    </Card.Title>
                    <Card.Text>Please add items to Cart!</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
  }
}

export default Checkout;