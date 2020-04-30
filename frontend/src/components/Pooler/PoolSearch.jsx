import React, { Component } from "react";
import {InputGroup, FormControl, Col, Row} from 'react-bootstrap';
import axios from "axios";
import {properties} from "../../properties";
import PoolCard from './PoolCard';
const backendurl = properties.backendhost;
// import Login from "./Login";

class PoolSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText : ""
    }
  }


  onSearchTextChange = async (e) => {
    let value = e.target.value;
    if(value !== "") {
      let response = await axios.get(backendurl + "pool/search/" + value);
      console.log(response);
      console.log(value);

      this.setState({
        pools: response.data,
        searchText: value
      });
    } else {
      this.setState({
        searchText: value
      });
    }
  }

  render() {
    const { user } = this.props;
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
            {this.state.pools &&
            this.state.pools.map((pool, poolIndex) => {
              user.poolName?pool.disabled = false: pool.disabled = true;
              return (
                <Col key={poolIndex} sm={3}>
                  <PoolCard pool={pool} />
                </Col>

              );
            })}
          </Row>
        </div>
      </div>
    );
  }
}

export default PoolSearch;
