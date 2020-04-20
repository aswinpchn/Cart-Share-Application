import React, { Component } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

class ProductCard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onAddToCartClick = async (e) => {
        e.preventDefault();
        // 
    }

    render() {
        return (
            <Card bg="white" style={{ width: "15rem", margin: "0.50rem" }}>
                <Card.Body>
                    <Col sm={10}>
                        <Card.Title>{this.props.product.name}</Card.Title>
                        <Card.Text><b>Description: </b>{this.props.product.description}</Card.Text>
                        <Card.Text><b>Price</b>${this.props.product.price}</Card.Text>
                    </Col>
                    <Col>
                        <Button variant="primary" name={this.props.product.id} onClick={this.onAddToCartClick}>Add to Cart</Button>
                    </Col>
                   
                </Card.Body>
            </Card>
        );
    }
}

export default ProductCard;
