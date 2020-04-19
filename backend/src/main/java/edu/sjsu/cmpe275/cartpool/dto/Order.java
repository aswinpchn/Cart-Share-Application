package edu.sjsu.cmpe275.cartpool.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "order")
public class Order {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id; 
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JsonIgnoreProperties({"orders"})
	@JoinColumn(name = "pooler_id")
	private User pooler;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = true)
	@JsonIgnoreProperties({"orders"})
	@JoinColumn(name = "delivery_pooler_id", nullable = true)
	private User delivery_pooler;
	
	private String status;
	
	private Date date;
	
	private String qrCode;
	
	private double price;

	@OneToMany(fetch = FetchType.EAGER,mappedBy = "order")
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
}
