package edu.sjsu.cmpe275.cartpool.dto;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "poolrequest")
public class PoolRequest {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	private String poolName;
	
	private String userScreenName;
	
	private String referrerScreenName;
	
	private String leaderScreenName;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getPoolName() {
		return poolName;
	}

	public void setPoolName(String poolName) {
		this.poolName = poolName;
	}

	public String getUserScreenName() {
		return userScreenName;
	}

	public void setUserScreenName(String userScreenName) {
		this.userScreenName = userScreenName;
	}

	public String getReferrerScreenName() {
		return referrerScreenName;
	}

	public void setReferrerName(String referrerName) {
		this.referrerScreenName = referrerName;
	}

	public String getLeaderScreenName() {
		return leaderScreenName;
	}

	public void setLeaderScreenName(String leaderScreenName) {
		this.leaderScreenName = leaderScreenName;
	}

	public void setReferrerScreenName(String referrerScreenName) {
		this.referrerScreenName = referrerScreenName;
	}
}
