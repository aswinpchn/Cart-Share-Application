import React, { Component } from "react";
import { Col, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProduct } from "../_actions/productActions";
import axios from 'axios';
import { properties } from '../../properties';

class ProductInfoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storeId: "",
      sku: "",
      name: "",
      description: "",
      brand: "",
      price: "",
      unit: "",
      errors: "",
      text: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.setState({
      storeId : this.props.storeId
    });
    console.log("this--->", this, this.props)
  }

  componentDidUpdate(prevProps) {
    if (this.props.product && this.props.product !== prevProps.product) {
      if (this.props.product.responseStatus === 200) {
        this.setState({
          text: "Product Created",
        });
      }
    }
    if (this.props.errors !== prevProps.errors) {
      console.log("errors are" + this.props.errors);
      if (this.props.errors) {
        this.setState({ text: "", errors: this.props.errors.message });
      }
    }
  }

  handleChange(e) {
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
    console.log("this.state.storeId-->", this.state.storeId)
    data.append('storeId', this.state.storeId);
    data.append('sku', this.state.sku);
    data.append('name', this.state.name);
    if (this.state.image) {
      data.append('image', this.state.image);
    }
    data.append('brand', this.state.brand);
    data.append('price', this.state.price);
    data.append('unit', this.state.unit);
    console.log("data-->", data)

    this.props.createProduct(data);
     /*
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
       });*/
  };

  render() {
    const { text, errors } = this.state;

    return (
      <div>
        <Form>
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

          <Button className="btn btn-primary" type="submit" onClick={this.handleSubmit}>
            Submit
          </Button>
          <br />
          <p className="text-danger"> {errors}</p>
          <p className="text-success"> {text}</p>
          <br />
        </Form>
      </div>
    );
  }
}

ProductInfoForm.propTypes = {
  product: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  product: state.productState,
  errors: state.errorState,
});
export default connect(mapStateToProps, { createProduct })(ProductInfoForm);
