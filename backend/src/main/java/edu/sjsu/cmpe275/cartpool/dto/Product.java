package edu.sjsu.cmpe275.cartpool.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity(name = "product")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) // Without this thing, there is error in serializing product object. as desciption was null, it can't serialize. (https://stackoverflow.com/questions/45915851/could-not-write-json-no-serializer-found-for-class-org-json-jsonobject-and-no-p)
public class Product {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @ManyToOne(fetch = FetchType.EAGER, optional = true)
  @JoinColumn(name = "store_id")
  private Store store;

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public Store getStore() {
    return store;
  }

  public void setStore(Store store) {
    this.store = store;
  }

  public long getSku() {
    return sku;
  }

  public void setSku(long sku) {
    this.sku = sku;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public String getImageURL() {
    return imageURL;
  }

  public void setImageURL(String imageURL) {
    this.imageURL = imageURL;
  }

  public String getBrand() {
    return brand;
  }

  public void setBrand(String brand) {
    this.brand = brand;
  }

  public double getPrice() {
    return price;
  }

  public void setPrice(double price) {
    this.price = price;
  }

  public String getUnit() {
    return unit;
  }

  public void setUnit(String unit) {
    this.unit = unit;
  }

  private long sku;

  private String name;

  private String description;

  private String imageURL;

  private String brand;

  private double price;

  private String unit;
}
