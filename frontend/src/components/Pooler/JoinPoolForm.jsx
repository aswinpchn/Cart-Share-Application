import React, {Component} from "react";
import {Col, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import {properties} from "../../properties";
import swal from "sweetalert";

class JoinPoolForm extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  handleChange = (e) => {
    let name = e.target.name;
    this.setState({
      name: e.target.value
    });
  }

  handleSubmit = async (e) => {
    // prevent page from refresh
    e.preventDefault();

    // Add code here for join Pool API.

    try {
      const { pool } = this.props;
      let backendurl =
        properties.backendhost + "pool/join";
      let joinResponse = await axios.post(backendurl, {
        userScreenName : localStorage.getItem("screenName"),
        poolName : pool.name,
        referrerScreenName : this.state.name
      });
      //console.log(joinResponse);

      if(joinResponse.status == 200) {
        swal(joinResponse.data);
      }
    }catch (e) {
      console.log(e.response);
      swal(e.response.data.message);
    }


  };

  render() {
    const { pool } = this.props;
    // console.log(pool);
    // console.log(this.state);
    return(
      <div>
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="screenName">
              <Form.Label>Referrer Screen Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter ScreenName of the Referrer"
                name="screenName"
                onChange={this.handleChange}
                required
              />
            </Form.Group>
          </Form.Row>
          <Button
            className="btn btn-primary"
            onClick={this.handleSubmit}
            type="submit"
          >
            Join Group
          </Button>
        </Form>
      </div>
    );
  }
}

export default JoinPoolForm;