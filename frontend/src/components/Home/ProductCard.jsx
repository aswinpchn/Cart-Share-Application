import React, { Component } from "react";
import { Card, Button, Col } from "react-bootstrap";

class ProductCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 0
        };
    }

    onAddToCartClick = async (e) => {
        e.preventDefault();
        console.log(e.target); 
    }

    handleChange = async (e) => {
        this.setState({
            quantity: e.target.value
        })
    }

    addToCart = (e) => { 
        e.preventDefault();
        let cartItem = {
            id: this.props.product.id,
            name: this.props.product.name,
            quantity: this.state.quantity,
            price: this.props.product.price
        };
        let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        if (cart.length > 0) {
            let existingCartItem = cart.find(element => element.id === this.props.product.id);
            if (existingCartItem) {
                existingCartItem.quantity = parseInt(cartItem.quantity, 10);
            } else {
                cart.push(cartItem);
            }
        } else {
            cart.push(cartItem);
        }
        this.setState({
            quantity: cartItem.quantity
        })
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    render() {
        return (
            <Card bg="white" style={{ width: "15rem", margin: "1rem" }}>
                <Card.Body>
                    <Card.Img variant="top" src="holder.js/100px160" />
                    <Col sm={10}>
                        <Card.Title>{this.props.product.name}</Card.Title>
                        <Card.Text><b>Description: </b>{this.props.product.description}</Card.Text>
                        <Card.Text><b>Price</b>${this.props.product.price}</Card.Text>
                        <Card.Text><b>Quantity: </b></Card.Text>
                        <input type="number" defaultValue="0" name="quanity" min = "0" className="mt-auto" onChange={this.handleChange}></input>
                    </Col>
                    <Col>
                        <Button variant="primary" name={this.props.product.id} quantity={this.state.quantity} onClick={this.addToCart}>Add to Cart</Button>
                    </Col>
                </Card.Body>
            </Card>
        );
    }
}

export default ProductCard;
