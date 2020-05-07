import React, { Component } from "react";
import { InputGroup, FormControl, Col, Row } from "react-bootstrap";
import axios from "axios";
import { properties } from "../../properties";
import ProductCard from "../Home/ProductCard";
const backendurl = properties.backendhost;

class PoolerProductSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      userIsPartOfPool: false
    };
  }

  componentDidMount = async () => {

    const email = localStorage.getItem('email');
    const getUserDetailsUrl = properties.backendhost + `user?email=${email}`

    let userIsPartOfPool = false;
    let user = await axios.get(getUserDetailsUrl);
    //console.log(user.data);
    userIsPartOfPool = user.data.poolId?true:false;

    this.setState({
      userIsPartOfPool: userIsPartOfPool
    });
  }

  onSearchTextChange = async (e) => {
    let value = e.target.value;
    if (value !== "") {
      let response = await axios.get(backendurl + "product/search/" + value);
      // console.log(response);
      // console.log(value);

      this.setState({
        products: response.data,
        searchText: value,
      });
    } else {
      this.setState({
        searchText: value,
      });
    }
  };

  render() {
    console.log(this.state.searchText);
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper ">
        <div className="container border rounded p-5">
          <div>
            <br />
            <InputGroup className="mb-3 col-sm-4">
              <FormControl
                placeholder="Enter Search Query!"
                value={this.state.searchText}
                onChange={this.onSearchTextChange}
              />
            </InputGroup>
            <br />
            <div>
              <span className="d-block p-2 bg-primary text-white">
                Search Results:
              </span>
              <Row>
                {this.state.products &&
                this.state.products.map((product, productIndex) => {
                  return (
                    <Col key={productIndex} sm={3}>
                      <ProductCard product={product} store={product.store.id} showAddToCart={this.state.userIsPartOfPool} />
                    </Col>
                  );
                })}
              </Row>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PoolerProductSearch;
