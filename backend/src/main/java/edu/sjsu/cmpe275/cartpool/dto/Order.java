package edu.sjsu.cmpe275.cartpool.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "pool_order")
public class Order {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id; 
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "pooler_id")
	private User pooler;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = true)
	@JoinColumn(name = "delivery_pooler_id", nullable = true)
	private User delivery_pooler;
	
	private String status;
	
	private Date date;
	
	private String qrCode;
	
	private double price;
	
	private String poolId;

	@OneToMany(fetch = FetchType.EAGER, mappedBy = "order", cascade = {CascadeType.PERSIST})
	private List<OrderDetail> orderDetails;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public User getPooler() {
		return pooler;
	}

	public void setPooler(User pooler) {
		this.pooler = pooler;
	}

	public User getDelivery_pooler() {
		return delivery_pooler;
	}

	public void setDelivery_pooler(User delivery_pooler) {
		this.delivery_pooler = delivery_pooler;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public List<OrderDetail> getOrderDetails() {
		return orderDetails;
	}

	public void setOrderDetails(List<OrderDetail> orderDetails) {
		this.orderDetails = orderDetails;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getQrCode() {
		return qrCode;
	}

	public void setQrCode(String qrCode) {
		this.qrCode = qrCode;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getPoolId() {
		return poolId;
	}

	public void setPoolId(String poolId) {
		this.poolId = poolId;
	}
}
