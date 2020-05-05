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
	private User deliveryPooler;
	
	private String status;
	
	private Date date;
	
	private String qrCode;
	
	private double price;
	
	private String poolId;

	private String storeName;

	private int groupId;

	@OneToMany(fetch = FetchType.EAGER, mappedBy = "order", cascade = {CascadeType.PERSIST})
	@JsonIgnoreProperties({"order"})
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

	public User getDeliveryPooler() {
		return deliveryPooler;
	}

	public void setDeliveryPooler(User deliveryPooler) {
		this.deliveryPooler = deliveryPooler;
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

	public String getStoreName() {
		return storeName;
	}

	public void setStoreName(String storeName) {
		this.storeName = storeName;
	}

	public int getGroupId() {
		return groupId;
	}

	public void setGroupId(int groupId) {
		this.groupId = groupId;
	}

	@Override
	public String toString() {
		return "Order{" +
				"id=" + id +
				", pooler=" + pooler +
				", deliveryPooler=" + deliveryPooler +
				", status='" + status + '\'' +
				", date=" + date +
				", qrCode='" + qrCode + '\'' +
				", price=" + price +
				", poolId='" + poolId + '\'' +
				", storeName='" + storeName + '\'' +
				", groupId=" + groupId +
				", orderDetails=" + orderDetails +
				'}';
	}
}
