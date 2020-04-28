import React, { Component } from "react";
import { Col, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { properties } from "../../properties";
const backendurl = properties.backendhost;

class ProductEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        storeId: "",
        sku: "",
        name: "",
        description: "",
        image: "",
        imageURL: "",
        brand: "",
        price: "",
        unit: "",
        errors: false,
        errorMessage: "",
        successMessage: false
      };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    let { product } = this.props;
    this.setState({
        name: product.name,
        description: product.description,
        brand: product.brand,
        price: product.price,
        unit: product.unit,
        imageURL: product.imageURL
    });
    console.log("this--->", this.props)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
    console.log(this.state)
    const data = {
      name: this.state.name,
      description: this.state.description,
      image: this.state.image,
      imageURL: this.state.imageURL,
      brand: this.state.brand,
      price: this.state.price,
      unit: this.state.unit,
    };
    console.log("data-->", data)
    axios
      .post(backendurl + "product/edit/" + this.props.product.id, data)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            success : true,
            successMessage : "Product successfully edited."
          });
        }
      })
      .catch((error) => {
        console.log("Error occured while updating product ", error, error.message);
        this.setState({
          errors: true,
          errorMessage: error.message
        });
      });
  };

  render() {
    const { product } = this.props;
    console.log("product==>", product);
    return (
      <div>
        <Form>
        <Form.Row>
            <Form.Group as={Col} controlId="name">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Product Name"
                name="name"
                defaultValue={product.name}
                onChange={this.handleChange}
                required
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Brand"
                name="brand"
                defaultValue={product.brand}
                onChange={this.handleChange}
                required
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                name="price"
                defaultValue={product.price}
                onChange={this.handleChange}
                required
              />
            </Form.Group>
            <Form.Group as={Col} controlId="unit">
              <Form.Label>Unit</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Unit"
                name="unit"
                defaultValue={product.unit}
                onChange={this.handleChange}
                required
              />
            </Form.Group>
          </Form.Row>

          <Form.Group as={Col} controlId="description">
            <Form.Label>Product Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter Product Description"
              name="description"
              defaultValue={product.description}
              onChange={this.handleChange}
              required
            />
          </Form.Group>

          <Button
            className="btn btn-primary"
            onClick={this.handleSubmit}
            type="submit"
          >
            Update
          </Button>
          <br />
          <div>{this.state.errors && <p className="red-text text-darken-1">
            {this.state.errorMessage}</p>}</div>
          <div>{this.state.success && <p className="green-text text-darken-1">
          {this.state.successMessage}</p>}</div>
        </Form>
      </div>
    );
  }
}

export default ProductEditForm;
