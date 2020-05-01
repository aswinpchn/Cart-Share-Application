import React, { Component } from "react";
import { Card, Button, Col } from "react-bootstrap";

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
    };
  }

  handleChange = async (e) => {
    this.setState({
      quantity: e.target.value,
    });
  };

  addToCart = (e) => {
    if (this.state.quantity === 0) {
      return;
    }
    e.preventDefault();
    let existing_cart_store_id = localStorage.getItem("cart_store_id");
    let current_cart_store_id = this.props.store;
    if (
      existing_cart_store_id !== null &&
      existing_cart_store_id !== current_cart_store_id
    ) {
      window.alert(
        "Cannot add products from multiple store. Clear the cart to add products from other store"
      );
      return;
    }
    let cartItem = {
      id: this.props.product.id,
      name: this.props.product.name,
      quantity: this.state.quantity,
      price: this.props.product.price,
    };
    let cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    if (cart.length > 0) {
      let existingCartItem = cart.find(
        (element) => element.id === this.props.product.id
      );
      if (existingCartItem) {
        existingCartItem.quantity =
          parseInt(existingCartItem.quantity, 10) +
          parseInt(cartItem.quantity, 10);
      } else {
        cart.push(cartItem);
      }
    } else {
      cart.push(cartItem);
    }
    this.setState({
      quantity: cartItem.quantity,
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("cart_store_id", current_cart_store_id);
  };

  render() {
    return (
      <Card bg="white" style={{ width: "15rem", margin: "1rem" }}>
        <Card.Body>
          <Card.Img variant="top" src={this.props.product.imageURL} />
          <Col sm={10}>
            <Card.Title>{this.props.product.name}</Card.Title>
            <Card.Text>
              <b>Description: </b>
              {this.props.product.description}
            </Card.Text>
            <Card.Text>
              <b>Price: </b>${this.props.product.price} per{" "}
              {this.props.product.unit}
            </Card.Text>
            <Card.Text>
              <b>Quantity: </b>
            </Card.Text>
            <input
              type="number"
              defaultValue="0"
              name="quanity"
              min="0"
              className="mt-auto"
              onChange={this.handleChange}
            ></input>
          </Col>
          <Col>
            {this.props.showAddToCart ? (
              <Button
                variant="primary"
                name={this.props.product.id}
                quantity={this.state.quantity}
                onClick={this.addToCart}
              >
                Add to Cart
              </Button>
            ) : (
              ""
            )}
          </Col>
        </Card.Body>
      </Card>
    );
  }
}

export default ProductCard;
