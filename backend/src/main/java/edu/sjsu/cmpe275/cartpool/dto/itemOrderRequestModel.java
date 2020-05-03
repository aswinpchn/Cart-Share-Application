package edu.sjsu.cmpe275.cartpool.dto;

public class itemOrderRequestModel {

  private long productId;

  private long quantity;

  private double price;

  @Override
  public String toString() {
    return "itemOrderRequestModel{" +
            "productId=" + productId +
            ", quantity=" + quantity +
            ", price=" + price +
            '}';
  }

  public long getProductId() {
    return productId;
  }

  public void setProductId(long productId) {
    this.productId = productId;
  }

  public long getQuantity() {
    return quantity;
  }

  public void setQuantity(long quantity) {
    this.quantity = quantity;
  }

  public double getPrice() {
    return price;
  }

  public void setPrice(double price) {
    this.price = price;
  }
}
