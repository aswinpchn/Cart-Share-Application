import React, { Component } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import Modal from "react-responsive-modal";
import ProductEditForm from "./ProductEditForm";

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      blockScroll: true,
      quantity: 0,
    };
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }

  onOpenModal = () => {
    this.setState({ open: true, blockScroll: false });
  };
  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { product } = this.props;
    const { open } = this.state;
    return (
      <Card bg="white" style={{ width: "15rem", margin: "1rem" }}>
        <Card.Body>
          <Card.Img variant="top" src="holder.js/100px160" />
            <Row>
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
            </Row>
            <Row>
            <Col sm={20}>
              <Button
                onClick={this.onOpenModal}
                type="button"
                className="btn btn-light mr-1"
              >
                <i className="text-secondary fa fa-edit" />
              </Button>
              <Modal open={open} onClose={this.onCloseModal} center>
                <p className="text-left tex-secondary  font-weight-bold">
                  Edit Product Details
                </p>
                <ProductEditForm product={product} />
              </Modal>
            </Col>
            <Col sm={20}>
              <Button
                onClick={this.deleteProduct}
                type="button"
                className="btn btn-light mr-1"
              >
                <i className="text-secondary fa fa-trash" />
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

export default ProductCard;
