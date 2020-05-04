import React, { Component } from "react";
import { Col, Form, Container, Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { properties } from "../../properties";
const backendurl = properties.backendhost;

class SelfPickup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			numberOfOrders: "",
			orderList: [],
			noOfOrdersToPickUp: "",
			orderListToShow: [],
			errors: "",
			text: null,
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		let userId = localStorage.getItem("userId")
		axios
			.get(backendurl + "orders/fellowpoolers/" + userId)
			.then((response) => {
				console.log(response);
				if (response.status == 200) {
					this.setState({
						numberOfOrders: response.data.length,
						orderList: response.data,
						errors: "",
					});
				}
			})
			.catch((error) => {
				console.log("Error in getting fellow pooler orders", error, error.response);
				this.setState({
					errors: error,
				});
			});
	};

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value,
		});
	}

	handleSubmit = (e) => {
		e.preventDefault();
		console.log("Number of orders to pick up-->", this.state.noOfOrdersToPickUp)
		if (this.state.noOfOrdersToPickUp < 0 || this.state.noOfOrdersToPickUp > this.state.numberOfOrders) {
			this.setState({ errors: `Please input value from range 0 - ${this.state.numberOfOrders}` })
		} else {
			this.setState({
				orderListToShow: this.state.orderList.slice(0, this.state.noOfOrdersToPickUp)
			})
		}
	};

	render() {
		const { text, errors, orderListToShow } = this.state;
		return (
			<div style={{ height: "75vh" }} className="container valign-wrapper">
				<div className="row">
					<div className="col s12 center-align background blue">
						<h2 className="text-center text-white font-italic font-family-sans-serif">
							Self Pick-Up
			</h2>
					</div>
				</div>
				<div>
					<Form>
						<Form.Row>
							<Form.Group as={Col} controlId="poolId">
								<Form.Label>Total number of orders available from fellow poolers:</Form.Label>
							</Form.Group>
						</Form.Row>
						<Form.Row>
							<Form.Group as={Col} controlId="poolId">
								<Form.Label>{this.state.numberOfOrders}</Form.Label>
							</Form.Group>
						</Form.Row>

						<Form.Row>
							<Form.Group as={Col} controlId="poolId">
								<Form.Label>How many number of orders you want to pick up for your fellow poolers:</Form.Label>
							</Form.Group>
						</Form.Row>

						<Form.Row>
							<Form.Group as={Col} controlId="name">
								<Form.Control
									type="number"
									placeholder="Number of orders to pick up"
									name="noOfOrdersToPickUp"
									value={this.state.noOfOrdersToPickUp}
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
							Submit
						 </Button>
						<br />
						<p className="text-danger"> {errors}</p>
						<p className="text-success"> {text}</p>
						<br />
					</Form>
					{/* <div>{this.state.orderListToShow}</div> */}
					<Container>
						{orderListToShow
							&& orderListToShow.length > 0
							&& orderListToShow.map((order, rowIndex) => {
								return (
									<tr key={rowIndex}>
										<td className="text-center" colSpan="3">
											<h5> Store Name </h5>
										</td>

										<td className="text-center">
											<span className="badge badge-primary badge-pill">
												<h5> ${order.storeName} </h5>
											</span>
										</td>
										<tr>{order.orderDetails.map((orderDetail, rowIndex) => {
											return (
												<tr key={rowIndex}>
													<td className="text-center" scope="row">
														{orderDetail.product.name}
													</td>
													<td className="text-center" scope="row">
														{orderDetail.product.unit}
													</td>
													<td className="text-center" scope="row">
														{orderDetail.quantity}
													</td>
													{/* <td className="text-center" scope="row">
														<Card.Img variant="top" src={orderDetail.product.imageURL} />
													</td> */}
												</tr>
											);
										})}</tr>
									</tr>);
							})}
					</Container>
				</div>
			</div>
		);
	}
}

export default SelfPickup;
