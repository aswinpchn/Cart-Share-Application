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
      products: [],
      userIsPooler: false
    };
  }

  componentDidMount() {
    this.getStores();
  }

  getStores = async () => {
    axios.defaults.withCredentials = true;
    const backendurl = properties.backendhost + 'store/all'
    axios.get(backendurl, {
      headers: {
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
    const getProductsUrl = properties.backendhost + `product/${storeId}`;
    const email = localStorage.getItem('email');
    const getUserDetailsUrl = properties.backendhost + `user?email=${email}`
    let userIsPartOfPool = false;
    let userResponse = await axios.get(getUserDetailsUrl);
    //console.log(userResponse.data);
    userIsPartOfPool = userResponse.data.poolId?true:false;

    axios.get(getProductsUrl, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response) {
        this.setState({
          userIsPartOfPool: userIsPartOfPool,
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
            <ProductCard product={product} store={this.state.storeId} showAddToCart={this.state.userIsPartOfPool} />
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