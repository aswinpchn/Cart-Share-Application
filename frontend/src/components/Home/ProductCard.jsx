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

    render() {
        return (
            <Card bg="white" style={{ width: "15rem", margin: "1rem" }}>
                <Card.Body>
                    <Col sm={10}>
                        <Card.Title>{this.props.product.name}</Card.Title>
                        <Card.Text><b>Description: </b>{this.props.product.description}</Card.Text>
                        <Card.Text><b>Price</b>${this.props.product.price}</Card.Text>
                        <Card.Text><b>Quantity: </b></Card.Text>
                        <input type="number" defaultValue="0" name="quanity" min = "0" class="mt-auto" onChange={this.handleChange}></input>
                    </Col>
                    <Col>
                        <Button variant="primary" name={this.props.product.id} quantity= {this.state.quantity} onClick={this.onAddToCartClick}>Add to Cart</Button>
                    </Col>
                </Card.Body>
            </Card>
        );
    }
}

export default ProductCard;
