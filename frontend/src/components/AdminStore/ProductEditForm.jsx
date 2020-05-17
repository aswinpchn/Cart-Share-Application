import React, { Component } from "react";
import { Col, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateProduct } from "../_actions/productActions";

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
      errors: "",
      text: null,
      formErrors: {},
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
      imageURL: product.imageURL,
    });
    console.log("this--->", this.props);
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.productState &&
      this.props.productState !== prevProps.productState
    ) {
      if (this.props.productState.responseStatus === 200) {
        this.setState({
          text: "Product Updated",
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
    var priceExp = /^[+]?\d+(\.\d+)?$/;
    let nameError = "";
    let priceError = "";
    let unitError = "";

    if (!this.state.name) {
      nameError = "Please enter Name";
    }

    console.log("the price is" + this.state.price);
    if (!this.state.price) {
      priceError = "Please enter Price";
    }

    if (!this.state.unit) {
      unitError = "Please enter Unit";
    }

    if (nameError || priceError || unitError) {
      this.setState((prevState) => ({
        formErrors: {
          // object that we want to update
          ...prevState.formErrors, // keep all other key-value pairs
          nameError: nameError,
          priceError: priceError,
          unitError: unitError,
        },
      }));
      return false;
    }
    return true;
  };

  handleSubmit = (e) => {
    //prevent page from refresh
    e.preventDefault();

    this.setState({
      text: "",
      errors: "",
    });
    const isValid = this.validate();
    if (isValid) {
      console.log(this.state);
      const data = {
        id: this.props.product.id,
        name: this.state.name,
        description: this.state.description,
        image: this.state.image,
        imageURL: this.state.imageURL,
        brand: this.state.brand,
        price: this.state.price,
        unit: this.state.unit,
      };
      console.log("Data for updating product is" + data);
      this.props.updateProduct(data);
    }
  };

  render() {
    const { product } = this.props;
    const { text, errors } = this.state;
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
                defaultValue={product.unit}
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
          <p className="text-danger"> {errors}</p>
          <p className="text-success"> {text}</p>
          <br />
        </Form>
      </div>
    );
  }
}

ProductEditForm.propTypes = {
  productState: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  productState: state.productState,
  errors: state.errorState,
});
export default connect(mapStateToProps, { updateProduct })(ProductEditForm);
