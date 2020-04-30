import React, {Component} from "react";
import {Col, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";

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

  handleSubmit = (e) => {
    // prevent page from refresh
    e.preventDefault();

    // Add code here for join Pool API.
  };

  render() {
    console.log(this.state);
    return(
      <div>
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="screenName">
              <Form.Label>Screen Name</Form.Label>
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