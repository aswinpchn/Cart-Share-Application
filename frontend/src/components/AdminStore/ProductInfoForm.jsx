import React, { Component } from "react";
import { Col, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";

class ProductInfoForm extends Component {
  componentDidMount() {
    this.setState({
      name: "",
      description: "",
      image: "",
      brand: "",
      price: "",
      unit: "",
      errors: "",
    });
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit = (e) => {
    //prevent page from refresh
    e.preventDefault();
    //const errors = this.validate();
    //console.log("errors -" + errors);
    //if (errors) return;
    const data = {
      name: this.state.name,
      description: this.state.description,
      image: this.state.image,
      brand: this.state.brand,
      price: this.state.price,
      unit: this.state.unit,
    };

    //console.log("Data for creating store is" + data);
    //this.createStore();
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId="name">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Product Name"
                onChange={this.handleChange}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Brand"
                onChange={this.handleChange}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter price"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="unit">
              <Form.Label>Unit</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Unit"
                onChange={this.handleChange}
              />
            </Form.Group>
          </Form.Row>

          <Form.Group as={Col} controlId="description">
            <Form.Label>Product Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter Product Description"
              onChange={this.handleChange}
            />
          </Form.Group>

          <Button className="btn btn-primary" type="submit">
            Proceed
          </Button>
        </Form>
      </div>
    );
  }
}

export default ProductInfoForm;
