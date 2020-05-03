import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import "react-responsive-modal/styles.css";
import ProductCard from "./ProductCard";
import { getProducts } from "../_actions/productActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";

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
    console.log("Store Id--->", this.props, this.props.match.params.storeId);
  }
  componentDidMount() {
    this.setState({
      storeId: this.props.match.params.storeId,
    });
    this.props.getProducts(this.props.match.params.storeId);
  }

  onOpenModal = () => {
    this.setState({ open: true, blockScroll: false });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    console.log("this.props-->");
    const { open } = this.state;
    const { products, loading } = this.props.productState;
    let productContent;
    if (products === null || loading) {
      productContent = <Spinner />;
    } else {
      productContent = products.map((product, productIndex) => {
        return (
          <Col key={productIndex} sm={3}>
            <ProductCard product={product} />
          </Col>
        );
      });
    }

    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align background blue">
            <h2 className="text-center text-white font-italic font-family-sans-serif">
              Welcome Admin
            </h2>
          </div>
        </div>

        <div className=" container">
          <div className="container">
            <div>
              <Row>{productContent}</Row>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProductList.propTypes = {
  errors: PropTypes.object.isRequired,
  products: PropTypes.array,
};
const mapStateToProps = (state) => ({
  productState: state.productState,
  errors: state.errorState,
});
export default connect(mapStateToProps, { getProducts })(ProductList);
