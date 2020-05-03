import React, { Component } from "react";
import { Col, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProduct } from "../_actions/productActions";
import Select from "react-select";

class ProductInfoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStores: [],
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
    this.onStoreChange = this.onStoreChange.bind(this);
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

  onStoreChange(opt) {
    this.setState({
      selectedStores: opt
    });
  }

  handleSubmit = (e) => {
    //prevent page from refresh
    e.preventDefault();
    let data = new FormData();
    this.state.selectedStores.forEach((eachObj) => {
      data.append('stores', eachObj.value);
    })
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
  };

  render() {
    const { text, errors } = this.state;

    /*
    let options = this.props.stores.map((option, index) => {
      return (
        <option value={option.id}>{option.name}</option>
      );
    });*/

    let options = [];
    if (this.props.stores.length) {
      this.props.stores.forEach(function (store) {
        options.push({
          label: store.name,
          value: store.id
        })
      });
    }

    return (
      <div>
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="store">
              <Form.Label>Select Store</Form.Label>
              <Select isMulti
                onChange={this.onStoreChange}
                options={options}
                value={this.state.selectedStores}
                required
              />
            </Form.Group>
          </Form.Row>

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
