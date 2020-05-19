import React, { Component } from "react";
import { Col, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProduct } from "../_actions/productActions";
import Select from "react-select";
import Spinner from "../common/Spinner";

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
      formErrors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onStoreChange = this.onStoreChange.bind(this);
  }
  componentDidMount() {
    this.setState({
      storeId: this.props.storeId,
    });
    console.log("this--->", this, this.props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.product && this.props.product !== prevProps.product) {
      if (this.props.product.responseStatus === 200) {
        this.setState({
          text: "Product Created",
          formErrors: {},
        });
      }
    }
    if (this.props.errors !== prevProps.errors) {
      console.log("errors are" + this.props.errors);
      if (this.props.errors) {
        this.setState({
          text: "",
          formErrors: {},
          errors: this.props.errors.message,
        });
      }
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  validate = () => {
    var numbers = /^[0-9]+$/;
    var priceExp = /^[+]?\d+(\.\d+)?$/;
    let selectedStoresError = "";
    let skuError = "";
    let nameError = "";
    let priceError = "";
    let unitError = "";

    if (
      !Array.isArray(this.state.selectedStores) ||
      !this.state.selectedStores.length
    ) {
      selectedStoresError = "Please select Store";
    }

    if (!this.state.sku) {
      skuError = "Please enter SKU";
    } else if (!this.state.sku.match(numbers)) {
      skuError = "Please enter a valid SKU number";
    }

    if (!this.state.name) {
      nameError = "Please enter Name";
    }

    if (!this.state.price) {
      priceError = "Please enter Price";
    } else if (!this.state.price.match(priceExp)) {
      priceError = "Not a valid value for price";
    }

    if (!this.state.unit) {
      unitError = "Please enter Unit";
    }

    if (
      selectedStoresError ||
      skuError ||
      nameError ||
      priceError ||
      unitError
    ) {
      this.setState((prevState) => ({
        formErrors: {
          // object that we want to update
          ...prevState.formErrors, // keep all other key-value pairs
          selectedStoresError: selectedStoresError, // update the value of specific key
          skuError: skuError,
          nameError: nameError,
          priceError: priceError,
          unitError: unitError,
        },
      }));
      return false;
    }
    return true;
  };

  onImageChange = (event) => {
    this.setState({
      image: event.target.files[0],
    });
  };

  onStoreChange(opt) {
    this.setState({
      selectedStores: opt,
    });
  }

  handleSubmit = (e) => {
    //prevent page from refresh
    e.preventDefault();
    this.setState({
      errors: "",
    });
    const isValid = this.validate();
    if (isValid) {
      let data = new FormData();
      this.state.selectedStores.forEach((eachObj) => {
        data.append("stores", eachObj.value);
      });
      data.append("sku", this.state.sku);
      data.append("name", this.state.name);
      if (this.state.image) {
        data.append("image", this.state.image);
      }
      data.append("brand", this.state.brand);
      data.append("price", this.state.price);
      data.append("unit", this.state.unit);
      data.append("description", this.state.description);
      console.log("data-->", data);

      this.props.createProduct(data);
    }
  };

  render() {
    const { text, errors } = this.state;

    const { loading } = this.props.product;
    let spinner;
    if (loading) {
      spinner = <Spinner />;
    }

    let options = [];
    if (this.props.stores.length) {
      this.props.stores.forEach(function (store) {
        options.push({
          label: store.name,
          value: store.id,
        });
      });
    }

    return (
      <div>
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="store">
              <Form.Label>Select Store</Form.Label>
              <Select
                isMulti
                onChange={this.onStoreChange}
                options={options}
                value={this.state.selectedStores}
                required
              />
              {this.state.formErrors.selectedStoresError ? (
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.formErrors.selectedStoresError}
                </div>
              ) : null}
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
              {this.state.formErrors.skuError ? (
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.formErrors.skuError}
                </div>
              ) : null}
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
              {this.state.formErrors.nameError ? (
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.formErrors.nameError}
                </div>
              ) : null}
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
              {this.state.formErrors.priceError ? (
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.formErrors.priceError}
                </div>
              ) : null}
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
              {this.state.formErrors.unitError ? (
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.formErrors.unitError}
                </div>
              ) : null}
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

          <Button
            className="btn btn-primary"
            type="submit"
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
          <br />
          {spinner}
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
