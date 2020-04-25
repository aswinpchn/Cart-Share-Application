import React, { Component } from "react";
import { InputGroup, FormControl } from 'react-bootstrap';
// import Login from "./Login";

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText : ""
    }
  }

  onSearchTextChange = (e) => {
    this.setState({
      searchText: e.target.value
    });
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
        </div>
      </div>
    );
  }
}

export default Search;
