package edu.sjsu.cmpe275.cartpool.dto;

public class UpdateUserProfileRequestBodyModel {
	
	  private String email;

	  private String screenName;

	  private String nickName;

	  private String street;

	  private String city;

	  private String state;

	  private String zip;

	  public String getScreenName() {
	    return screenName;
	  }

	  public void setScreenName(String screenName) {
	    this.screenName = screenName;
	  }

	  public String getNickName() {
	    return nickName;
	  }

	  public void setNickName(String nickName) {
	    this.nickName = nickName;
	  }

	  public String getStreet() {
	    return street;
	  }

	  public void setStreet(String street) {
	    this.street = street;
	  }

	  public String getCity() {
	    return city;
	  }

	  public void setCity(String city) {
	    this.city = city;
	  }

	  public String getState() {
	    return state;
	  }

	  public void setState(String state) {
	    this.state = state;
	  }

	  public String getZip() {
	    return zip;
	  }

	  public void setZip(String zip) {
	    this.zip = zip;
	  }

	  public String getEmail() {
	    return email;
	  }

	  public void setEmail(String email) {
	    this.email = email;
	  }
}
