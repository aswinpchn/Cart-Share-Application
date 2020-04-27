import React, { Component } from "react";
import { Col } from "react-bootstrap";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import ProductInfoForm from "./ProductInfoForm";
import ProductCard from "./ProductCard";
import { properties } from "../../properties";
import axios from "axios";
const backendurl = properties.backendhost;

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storeId: "",
      productID: "",
      sku: "",
      name: "",
      description: "",
      image: "",
      brand: "",
      price: "",
      unit: "",
      products: [],
      open: false,
      blockScroll: true,
      errors: "",
    };
    console.log("idd--->", this.props, this.props.match.params.storeId);

  }
  componentDidMount() {
    this.getProducts();
    this.setState({
      storeId : this.props.match.params.storeId
    })
  }

  getProducts = async () => {
    let response = await axios.get(backendurl + "product/" +this.props.match.params.storeId);
    console.log("the response products are " + response.data);
    this.setState({
      products: response.data,
    });
  };

  onOpenModal = () => {
    this.setState({ open: true, blockScroll: false,  });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h2>Welcome Admin</h2>
          </div>
        </div>
        <li className="list-group-item border border-white">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.onOpenModal}
          >
            Create New Product
          </button>
          <div className="overflow-auto border">
            <Modal open={open} onClose={this.onCloseModal} center>
              <h4 className="text-center tex-secondary">
                Enter Product Details
              </h4>
              <ProductInfoForm storeId={this.state.storeId}/>
            </Modal>
          </div>
        </li>
        <h3>
          <p>Existing Products</p>
        </h3>
        {this.state.products &&
          this.state.products.map((product, productIndex) => {
            return (
              <Col key={productIndex} sm={3}>
                <ProductCard product={product} />
              </Col>
            );
          })}
      </div>
    );
  }
}

export default ProductList;
