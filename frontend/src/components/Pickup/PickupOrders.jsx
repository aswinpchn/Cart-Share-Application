import React, { Component } from "react";
import { Col, Form, Container, Row, Card } from "react-bootstrap";
import { properties } from "../../properties";
import axios from "axios";
const backendurl = properties.backendhost;

class PickupOrders extends Component {
  state = {
    orders: [],
    groupOrders: [],
    GroupedById: {},
    numberOfOrders: "",
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

  render() {
    const { orders } = this.state;
    // const { GroupedById } = this.state;

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
                <div>
                  <ul class="list-group">
                    {rows &&
                      rows.map((obj, i) => {
                        return (
                          <div key={i}>
                            <li class="list-group-item list-group-item-primary">
                              {" "}
                              the group is {i}
                            </li>
                            <ul class="list-group">
                              {obj &&
                                obj.map((element, i) => {
                                  console.log("elements are" + element.orderId);
                                  return (
                                    <div key={i}>
                                      {" "}
                                      <li class="list-group-item">
                                        {" "}
                                        orderId is {element.id}{" "}
                                      </li>
                                    </div>
                                  );
                                })}
                            </ul>
                          </div>
                        );
                      })}
                  </ul>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
  }
}

export default PickupOrders;
