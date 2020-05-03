package edu.sjsu.cmpe275.cartpool.dto;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class CreateProductRequestBodyModel {

	@JsonIgnore
    private long storeId;
	
	private long[] stores;

    private long sku;

    private String name;

    private String description;

    private String imageURL;

    private String brand;

    private double price;

    private String unit;
    
    @JsonIgnore
    private MultipartFile image;

    public long getStoreId() {
        return storeId;
    }

    public void setStoreId(long storeId) {
        this.storeId = storeId;
    }

    public long getSku() {
        return sku;
    }

    public long[] getStores() {
		return stores;
	}

	public void setStores(long[] stores) {
		this.stores = stores;
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

    public MultipartFile getImage() {
		return image;
	}

	public void setImage(MultipartFile image) {
		this.image = image;
	}

	@Override
    public String toString() {
        return "CreateProductRequestBodyModel{" +
                "storeId='" + storeId + '\'' +
                ", sku='" + sku + '\'' +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", imageURL='" + imageURL + '\'' +
                ", brand='" + brand + '\'' +
                ", price='" + price + '\'' +
                ", unit='" + unit + '\'' +
                '}';
    }
}

