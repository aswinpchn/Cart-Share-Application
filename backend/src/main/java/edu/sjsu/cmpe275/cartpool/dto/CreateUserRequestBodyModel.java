package edu.sjsu.cmpe275.cartpool.dto;

public class CreateUserRequestBodyModel {

  private String email;

  private String screenName;

  private String nickName;

  private String street;

  private String city;

  private String state;

  private String password;

  private String uid;

  private String zip;

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getUid() {
    return uid;
  }

  public void setUid(String uid) {
    this.uid = uid;
  }

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

  @Override
  public String toString() {
    return "CreateUserRequestBody{" +
            "email='" + email + '\'' +
            ", screenName='" + screenName + '\'' +
            ", nickName='" + nickName + '\'' +
            ", street='" + street + '\'' +
            ", city='" + city + '\'' +
            ", state='" + state + '\'' +
            ", password='" + password + '\'' +
            ", uid='" + uid + '\'' +
            ", zip='" + zip + '\'' +
            '}';
  }
}
