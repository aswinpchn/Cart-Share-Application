import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserProfile } from "../_actions/profileActions";
import { Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import Spinner from "../common/Spinner";
import swal from "sweetalert";
import { properties } from "../../properties";
const backendurl = properties.backendhost;

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      senderId: "",
      recipientScreenName: "",
      message: "",
      text: "",
      errors: "",
      loading: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let senderId = localStorage.getItem("userId");

    this.setState({
      senderId: senderId,
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit = (e) => {
    //prevent page from refresh
    e.preventDefault();

    this.setState({
      loading: true,
    });

    const data = {
      senderId: this.state.senderId,
      recipientScreenName: this.state.recipientScreenName,
      message: this.state.message,
    };

    console.log("the data for send message is" + data);

    axios
      .post(backendurl + "user/message", data)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          this.setState({
            text: "Message sent sucessfully",
            recipientScreenName: "",
            message: "",
            loading: false,
            errors: "",
          });
          swal("Message sent sucessfully");
        }
      })
      .catch((error) => {
        console.log("Error while sending message", error, error.response);
        this.setState({
          errors: error.response.data.message,
          recipientScreenName: "",
          message: "",
          loading: false,
        });
        swal(error.response.data.message);
      });
  };

  render() {
    const { text, errors, loading } = this.state;
    let spinner;
    if (loading) {
      spinner = <Spinner />;
    }
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align background blue">
            <h2 className="text-center text-white font-italic font-family-sans-serif">
              Send Message
            </h2>
          </div>
        </div>
        <div>
          <br />
          <br />
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="recipientScreenName">
                <Form.Label>Recipient Screen Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Screen Name"
                  name="recipientScreenName"
                  value={this.state.recipientScreenName}
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="message">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="6"
                  placeholder="Enter Message"
                  name="message"
                  value={this.state.message}
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>
            </Form.Row>
            <Button
              className="btn btn-primary"
              type="submit"
              onClick={this.handleSubmit}
            >
              Message
            </Button>
            <br />
            {spinner}
            {/* <p className="text-danger"> {errors}</p>
            <p className="text-success"> {text}</p> */}
            <br />
          </Form>
        </div>
      </div>
    );
  }
}

Message.propTypes = {
  profileState: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profileState: state.profileState,
  errors: state.errorState,
});
export default connect(mapStateToProps, { getUserProfile })(Message);
