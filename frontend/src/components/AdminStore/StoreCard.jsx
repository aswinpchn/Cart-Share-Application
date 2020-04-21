import React, { Component } from "react";
import { Card, Button, Col } from "react-bootstrap";

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
            <Card.Title>{this.props.store.storeName}</Card.Title>
          </Col>
        </Card.Body>
      </Card>
    );
  }
}

export default StoreCard;
