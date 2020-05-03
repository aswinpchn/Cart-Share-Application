package edu.sjsu.cmpe275.cartpool.dto;

import java.util.List;

public class DeferredOrderRequestModel {

  private long poolerId;

  private double price;

  private String poolId;

  private List<itemOrderRequestModel> items;

  @Override
  public String toString() {
    return "DeferredOrderRequestModel{" +
            "poolerId=" + poolerId +
            ", price=" + price +
            ", poolId='" + poolId + '\'' +
            ", items=" + items +
            '}';
  }

  public long getPoolerId() {
    return poolerId;
  }

  public void setPoolerId(long poolerId) {
    this.poolerId = poolerId;
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

  public List<itemOrderRequestModel> getItems() {
    return items;
  }

  public void setItems(List<itemOrderRequestModel> items) {
    this.items = items;
  }
}
