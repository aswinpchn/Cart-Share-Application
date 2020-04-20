import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import Select from 'react-select'
import ProductCard from "./ProductCard";

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
    this.getStores();
  }

  getStores = async () => {
    const stores = [{
      name: "Costco",
      id: 1
    },
    { name: "Target",
      id: 2 
    }];
    this.setState({
      stores: stores,
    });
  }

  getProducts = async () => {
    const storeId = this.state.storeId;
    console.log(storeId);
    try {
      //const products = await apiService.get(`${config.api_host}/bug/${project_id}`);
      const products = [{
        id: 1,
        name: "Hand Wash",
        price: 10
      }, {
          id: 2,
          name: "Rice",
          price: 6
        }
      ];
      this.setState({
        products: products
      });
    }
    catch (e) {
      console.log(e);
    }
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