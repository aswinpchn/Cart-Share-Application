import React, { Component } from "react";
import { Card, Col } from "react-bootstrap";

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
    };
  }

  render() {
    const { product } = this.props;
    return (
      <Card bg="white" style={{ width: "15rem", margin: "1rem" }}>
        <Card.Body>
          <Card.Img variant="top" src="holder.js/100px160" />
          <Col sm={30}>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>
              <b>Description: </b>
              {product.description}
            </Card.Text>
            <Card.Text>
              <b>Brand: </b>
              {product.brand}
            </Card.Text>
            <Card.Text>
              <b>Price:</b>${product.price}
            </Card.Text>
            <Card.Text>
              <b>Unit:</b>
              {product.unit}
            </Card.Text>
          </Col>
        </Card.Body>
      </Card>
    );
  }
}

export default ProductCard;
