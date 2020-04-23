import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import Select from 'react-select'
import ProductCard from "./ProductCard";
import axios from 'axios';
import { properties } from '../../properties';

class PoolerHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStore: "",
      storeId: "",
      stores: [],
      products: []
    };
  }

  componentDidMount() {
    console.log("In pooler home ----------------");
    this.getStores();
  }

  getStores = async () => {
    axios.defaults.withCredentials = true;
    const backendurl = properties.backendhost + 'store/all'
    let token = localStorage.getItem('token');
    axios.get(backendurl, {
      headers: {
        'Authorization': "bearer " + token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response) {
        this.setState({
          stores: response.data
        })
      }
    });
  }

  getProducts = async () => {
    const storeId = this.state.storeId;
    axios.defaults.withCredentials = true;
    const backendurl = properties.backendhost + `product/${storeId}`;
    let token = localStorage.getItem('token');
    axios.get(backendurl, {
      headers: {
        'Authorization': "bearer " + token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response) {
        this.setState({
          products: response.data
        })
      }
    });
  };

  onStoreChange = async (item) => {
    await this.setState({
      selectedStore: item,
      storeId: item.value
    });
    this.getProducts();
  };

  render() {
    let options = [];
    let products = [];
    if (this.state.stores.length) {
      this.state.stores.forEach(function (store) {
        options.push({
          label: store.name,
          value: store.id
        })
      });
    }

    if (this.state.products.length) {
      products = this.state.products.map(product => {
        return (
          <Col key={product.id} sm={3}>
            <ProductCard product={product} />
          </Col>
        )
      })
    }

    return (
      <div className=" container">
        <div className="container">
          <form>
            <br />
            <Select
              options={options}
              autosize={true}
              value={this.state.selectedStore}
              onChange={value => this.onStoreChange(value)}
              defaultValue={{ label: 'Select Store..', value: '' }}
              placeholder="Select Store.."
            />
            <br />
            <div>
              <Row>{products}</Row>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default PoolerHome;