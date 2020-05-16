import React, { Component } from "react";
import { Col, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { properties } from "../../properties";
import swal from "sweetalert";
import Spinner from "../common/Spinner";

class JoinPoolForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenName: "",
      loading: false,
      formErrors: {},
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  validate = () => {
    let screenNameError = "";

    if (!this.state.screenName) {
      screenNameError = "Please enter Screen Name of the Referrer";
    }
    if (screenNameError) {
      this.setState((prevState) => ({
        formErrors: {
          // object that we want to update
          ...prevState.formErrors, // keep all other key-value pairs
          screenNameError: screenNameError,
        },
      }));
      return false;
    }
    return true;
  };

  handleSubmit = async (e) => {
    // prevent page from refresh
    e.preventDefault();

    const isValid = this.validate();
    if (isValid) {
      // Add code here for join Pool API.
      this.setState({
        loading: true,
      });

      try {
        const { pool } = this.props;
        let backendurl = properties.backendhost + "pool/join";
        let joinResponse = await axios.post(backendurl, {
          userScreenName: localStorage.getItem("screenName"),
          poolName: pool.name,
          referrerScreenName: this.state.screenName,
        });
        //console.log(joinResponse);

        if (joinResponse.status == 200) {
          swal(joinResponse.data);
          this.setState({
            loading: false,
            formErrors: {},
          });
        }
      } catch (e) {
        console.log(e.response);
        swal(e.response.data.message);
      }
    }
  };

  render() {
    const { loading } = this.state;
    const { pool } = this.props;
    // console.log(pool);
    // console.log(this.state);
    let spinner;
    if (loading) {
      spinner = <Spinner />;
    }
    return (
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
              {this.state.formErrors.screenNameError ? (
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.formErrors.screenNameError}
                </div>
              ) : null}
            </Form.Group>
          </Form.Row>
          <Button
            className="btn btn-primary"
            onClick={this.handleSubmit}
            type="submit"
          >
            Join Group
          </Button>
          {spinner}
        </Form>
      </div>
    );
  }
}

export default JoinPoolForm;
