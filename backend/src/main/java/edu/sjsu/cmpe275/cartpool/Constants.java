package edu.sjsu.cmpe275.cartpool;

/*
  This file will contain constants that may be used across the application.
 */
public final class Constants {

	private Constants() {

	}

	public static final Integer CONFLICT = 409;
	public static final boolean TRUE = true;
	public static final boolean FALSE = false;
	public static final Integer ZERO = 0;
	public static final Integer ONE = 1;
	public static final String POOLER_ROLE = "pooler";
	public static final String ADMIN_ROLE = "admin";
	public static final String DOMAIN = "sjsu.edu";
	public static final String FRONTEND_URL = "http://ec2-54-211-91-116.compute-1.amazonaws.com:3000";
	public static final String BACKEND_URL = "http://ec2-54-211-91-116.compute-1.amazonaws.com:8081";
	public static final String PLACED = "Placed";
	public static final String ASSIGNED = "Assigned";  //Order placed
	public static final String PICKED_UP = "Picked up";
	public static final String PICKED_UP_BY_SELF = "Picked up by self";
	public static final String DELIVERED = "Delivered";
	public static final String DELIVERY_NOT_RECEIVED = "Delivery not received";
}
