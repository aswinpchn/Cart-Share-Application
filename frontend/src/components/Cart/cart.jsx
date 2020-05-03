import React, { Component } from "react";
import { Container, Button, Col, Row, Card } from "react-bootstrap";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartprice: null,
      authFlag: "",
      cart: [],
    };
  }

  componentDidMount() {
    console.log("values from local storage" + localStorage.getItem("cart"));
    let currentCart = JSON.parse(localStorage.getItem("cart"));
    this.setState(
      {
        cart: currentCart,
      },
      () => {
        this.totalprice();
      }
    );
  }

  onQuantityChange = (e, rowIndex) => {
    const newState = Object.assign({}, this.state);
    const newCart = newState.cart;
    newCart[rowIndex].quantity = e.target.value;
    newCart[rowIndex].amount = eval(
      "newCart[rowIndex].price  * e.target.value"
    );

    this.setState(
      {
        cart: newCart,
      },
      () => {
        this.totalprice();
      }
    );

    localStorage.setItem("cart", JSON.stringify(this.state.cart));
  };

  removeItem = (rowIndex) => {
    const newState = Object.assign({}, this.state);
    const newCart = newState.cart;
    newCart.splice(rowIndex, 1);
    this.setState(
      {
        cart: newCart,
      },
      () => {
        this.totalprice();
      }
    );
    localStorage.setItem("cart", JSON.stringify(this.state.cart));
  };

  totalprice = () => {
    let price = 0;
    console.log("the items in cart are" + JSON.stringify(this.state.cart));
    if (this.state.cart) {
      this.state.cart.map((item, i) => {
        price = eval("price + item.price * item.quantity");
      });
      console.log("number " + Number(price));
      price = Number(price);
      this.setState({
        cartprice: price,
      });
    }
  };

  handleSubmit = () => {
    const { history } = this.props;
    history.push('/main/checkout');
  }

  render() {
    const { cart, cartprice } = this.state;
    if (!Array.isArray(cart) || !cart.length) {
      // array does not exist, is not an array, or is empty
      return (
        <div style={{ height: "75vh" }} className="container valign-wrapper">
          <div className="row">
            <div className="col s12 center-align background blue">
              <h2 className="text-center text-white font-italic font-family-sans-serif">
                Cart
              </h2>
            </div>
          </div>
          <Container>
            <Row>
              <Col md={{ span: 10, offset: 4 }}>
                <Card style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Title>
                      There is nothing in the cart at the moment!
                    </Card.Title>
                    <Card.Text>Please add items to Cart!</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      );
    } else {
      return (
        <div style={{ height: "75vh" }} className="container valign-wrapper">
          <div className="row">
            <div className="col s12 center-align background blue">
              <h2 className="text-center text-white font-italic font-family-sans-serif">
                Cart
              </h2>
            </div>
          </div>
          <Container>
            <Row>
              <Col md={{ span: 10, offset: 1 }}>
                <div>
                  <table className="table table-bordered table-hover">
                    <thead className="thead">
                      <tr>
                        <th
                          className="text-center  font-weight-bold"
                          scope="col"
                        >
                          Item Name
                        </th>
                        <th
                          className="text-center  font-weight-bold"
                          scope="col"
                        >
                          Quanity
                        </th>
                        <th
                          className="text-center  font-weight-bold"
                          scope="col"
                        >
                          Price
                        </th>
                        <th
                          className="text-center  font-weight-bold"
                          scope="col"
                        >
                          Amount
                        </th>
                        <th
                          className="text-center  font-weight-bold"
                          scope="col"
                        >
                          Remove
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart &&
                        cart.map((item, rowIndex) => {
                          return (
                            <tr key={rowIndex}>
                              <th className="text-center" scope="row">
                                {item.name}
                              </th>
                              <td className="text-center">
                                <input
                                  type="number"
                                  defaultValue={item.quantity}
                                  name="quanity"
                                  min="0"
                                  className="mt-auto"
                                  onChange={(e) =>
                                    this.onQuantityChange(e, rowIndex)
                                  }
                                ></input>
                              </td>
                              <td className="text-center">{item.price}</td>
                              <td className="text-center">${item.amount}</td>
                              <td className="text-center">
                                {" "}
                                <Button
                                  onClick={() => this.removeItem(rowIndex)}
                                  type="button"
                                  className="btn btn-light mr-1"
                                >
                                  <i className="text-secondary fa fa-trash" />
                                </Button>
                              </td>
                            </tr>
                          );
                        })}

                      <tr>
                        <td className="text-center" colSpan="4">
                          <h5> Total Amount </h5>
                        </td>

                        <td className="text-center">
                          <span className="badge badge-primary badge-pill">
                            <h5> ${cartprice} </h5>
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-center" colSpan="4">
                          <h5>Check out </h5>
                        </td>
                        <td className="text-center">
                          <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={this.handleSubmit}
                          >
                            Check Out
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
  }
}

export default Cart;
