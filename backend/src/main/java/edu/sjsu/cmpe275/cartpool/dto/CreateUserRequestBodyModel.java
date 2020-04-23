package edu.sjsu.cmpe275.cartpool.dto;

public class CreateUserRequestBodyModel {

  private String email;

  private String password;

  private String uid;

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
            ", password='" + password + '\'' +
            ", uid='" + uid + '\'' +
            '}';
  }
}
