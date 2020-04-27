import React, { Component } from "react";
import { Col, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { properties } from "../../properties";

class ProductInfoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storeId: "",
      sku: "",
      name: "",
      description: "",
      image: "",
      brand: "",
      price: "",
      unit: "",
      errors: false,
      success: false,
      errorMessage: "",
      successMessage: ""
    };
  }
  componentDidMount() {
    this.setState({
      storeId : this.props.storeId
    });
    this.handleChange = this.handleChange.bind(this);
    console.log("this--->", this, this.props)
  }

  handleChange(e) {
    console.log("e.target.value-->", e.target.name, e.target.value)
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onImageChange = (event) => {
    this.setState({
      image: event.target.files[0]
    });
  }

  handleSubmit = (e) => {
    //prevent page from refresh
    e.preventDefault();
    let data = new FormData();
    data.append('storeId', this.state.storeId);
    data.append('sku', this.state.sku);
    data.append('name', this.state.name);
    data.append('image', this.state.image);
    data.append('brand', this.state.brand);
    data.append('price', this.state.price);
    data.append('unit', this.state.unit);
    console.log("data-->", data)

    // axios call to set profile
    const backendurl = properties.backendhost + "product/add";
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    axios
      .post(backendurl, data, config)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        if(response.status == 200) {
          this.setState({
            errors: false,
            errorMessage: "",
            success: true,
            successMessage: "Product added successfully."
          })
          // window.location.reload();
        }
      })
      .catch((error) => {
        console.log("Error in adding new product", error, error.message);
        if(error.message.includes("404")) {
          this.setState({
            success: false,
            successMessage: "",
            errors: true,
            errorMessage: "Store not found."
          })
        } else if(error.message.includes("409")) {
          this.setState({
            success: false,
            successMessage: "",
            errors: true,
            errorMessage: "Product already exists with same store and sku."
          })
        } else {
          this.setState({
            success: false,
            successMessage: "",
            errors: true,
            errorMessage: "Server Error. Please try again."
          })
        }
      });
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
        <Form.Row>
            <Form.Group as={Col} controlId="sku">
              <Form.Label>Product SKU</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter store keeping unit number(SKU)"
                name="sku"
                value={this.state.sku}
                onChange={this.handleChange}
                required
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="name">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Product Name"
                name="name"
                value={this.state.name}
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
                value={this.state.brand}
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
                value={this.state.price}
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
                value={this.state.unit}
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
              value={this.state.description}
              onChange={this.handleChange}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              name="image"
              onChange={this.onImageChange}
              required
            />
          </Form.Group>

          <Button className="btn btn-primary" type="submit">
            Submit
          </Button>
          <div>{this.state.errors && <p className="red-text text-darken-1">
            {this.state.errorMessage}</p>}</div>
          <div>{this.state.success && <p className="green-text text-darken-1">
          {this.state.successMessage}</p>}</div>
        </Form>
      </div>
    );
  }
}

export default ProductInfoForm;
