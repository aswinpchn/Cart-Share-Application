import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, Col } from "react-bootstrap";

class StoreCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
    };
  }

  render() {
    return (
      <Card bg="white" style={{ width: "15rem", margin: "1rem" }}>
        <Card.Body>
          <Card.Img variant="top" src="holder.js/100px160" />
          <Col sm={10}>
            <Link
              to={{
                pathname: "/main/productList",
                state: {
                  storeID: this.props.store.storeID,
                  storeName: this.props.store.storeName,
                },
                target: "_blank",
              }}
            >
              <Card.Title>{this.props.store.storeName}</Card.Title>
            </Link>
          </Col>
        </Card.Body>
      </Card>
    );
  }
}

export default StoreCard;
