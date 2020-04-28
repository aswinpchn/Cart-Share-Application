import React, { Component } from "react";
import {InputGroup, FormControl, Col, Row} from 'react-bootstrap';
import axios from "axios";
import {properties} from "../../properties";
import ProductCard from "../AdminStore/ProductCard";
const backendurl = properties.backendhost;
// import Login from "./Login";

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText : ""
    }
  }


  onSearchTextChange = async (e) => {
    let value = e.target.value;
    if(value !== "") {
      let response = await axios.get(backendurl + "search/" + value);

      console.log(response);
      console.log(value);

      this.setState({
        products: response.data,
        searchText: value
      });
    } else {
      this.setState({
        searchText: value
      });
    }
  }

  render() {
    console.log(this.state.searchText);
    return (
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
          <h3>Results: </h3>
          <Row>
            {this.state.products &&
            this.state.products.map((product, productIndex) => {
              return (

                <Col key={productIndex} sm={3}>
                  <ProductCard product={product} />
                </Col>

              );
            })}
          </Row>
        </div>
      </div>
    );
  }
}

export default Search;
