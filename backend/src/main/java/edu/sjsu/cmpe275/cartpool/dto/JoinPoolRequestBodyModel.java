package edu.sjsu.cmpe275.cartpool.dto;

public class JoinPoolRequestBodyModel {
	
	String userScreenName;
	
	String poolName;
	
	String referrerScreenName;

	public String getUserScreenName() {
		return userScreenName;
	}

	public void setUserScreenName(String userScreenName) {
		this.userScreenName = userScreenName;
	}

	public String getPoolName() {
		return poolName;
	}

	public void setPoolName(String poolName) {
		this.poolName = poolName;
	}

	public String getReferrerScreenName() {
		return referrerScreenName;
	}

	public void setReferrerScreenName(String referrerScreenName) {
		this.referrerScreenName = referrerScreenName;
	}

}
