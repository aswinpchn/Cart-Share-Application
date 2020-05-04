package edu.sjsu.cmpe275.cartpool.dto;

import java.util.List;

public class OrderPickupRequestModel {
	
	private long orderId;

	private List<Long> fellowPoolersOrders;

	public List<Long> getFellowPoolersOrders() {
		return fellowPoolersOrders;
	}

	public void setFellowPoolersOrders(List<Long> fellowPoolersOrders) {
		this.fellowPoolersOrders = fellowPoolersOrders;
	}

	public long getOrderId() {
		return orderId;
	}

	public void setOrderId(long orderId) {
		this.orderId = orderId;
	}
}
