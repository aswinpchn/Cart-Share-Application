import React, { Component } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import Modal from "react-responsive-modal";
import JoinPoolForm from "./JoinPoolForm";

class PoolCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      blockScroll: true,
      quantity: 0,
    };
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }

  onOpenModal = () => {
    this.setState({ open: true, blockScroll: false });
  };
  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { pool } = this.props;
    const { open } = this.state;
    // console.log(pool);
    return (
      <Card bg="white" style={{ width: "20rem", margin: "1rem" }}>
        <Card.Body>
          <Col sm={30}>
            <Card.Title>{pool.name}</Card.Title>
            <Card.Text>
              <b>Description: </b>
              {pool.description}
            </Card.Text>
            <Card.Text>
              <b>Neighbourhood Name: </b>
              {pool.neighbourhoodName}
            </Card.Text>
            <Card.Text>
              <b>ZipCode: </b>
              {pool.zip}
            </Card.Text>
          </Col>
          {
            pool.disabled?
            <Row>
              <Col sm={20}>
                <Button
                  onClick={this.onOpenModal}
                  type="button"
                  className="btn btn-light mr-1">
                  <i className="text-secondary fa fa-edit" />
                </Button>
                <Modal open={open} onClose={this.onCloseModal} center>
                  <p className="text-left tex-secondary  font-weight-bold">
                    Join Pool Form!
                  </p>
                  <JoinPoolForm />
                </Modal>
              </Col>
            </Row>:
            <Row>
              You are already part of some pool already.
            </Row>
          }
        </Card.Body>
      </Card>
    );
  }
}

export default PoolCard;