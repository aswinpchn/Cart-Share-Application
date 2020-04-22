package edu.sjsu.cmpe275.cartpool.dto;

import javax.persistence.*;

@Entity
@Table(name = "user")
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @Column(unique = true)
  private String screenName;

  @Column(unique =  true)
  private String nickName;

  @Column(unique = true)
  private String email;

  private String password;

  private boolean isVerified;

  private String poolId;

  private String uid;

  @Embedded
  private Address address;

  /*private Pool pool;*/

  private int creditScore;

  private String role;

  public User() {
  }

  public int getCreditScore() {
    return creditScore;
  }

  public void setCreditScore(int creditScore) {
    this.creditScore = creditScore;
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
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

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public boolean isVerified() {
    return isVerified;
  }

  public void setVerified(boolean verified) {
    isVerified = verified;
  }

  public Address getAddress() {
    return address;
  }

  public void setAddress(Address address) {
    this.address = address;
  }

  public String getRole() {
    return role;
  }

  public void setRole(String role) {
    this.role = role;
  }

  public String getUid() {
    return uid;
  }

  public void setUid(String uid) {
    this.uid = uid;
  }

  public String getPoolId() {
    return poolId;
  }

  public void setPoolId(String poolId) {
    this.poolId = poolId;
  }

  @Override
  public String toString() {
    return "User{" +
            "id=" + id +
            ", screenName='" + screenName + '\'' +
            ", nickName='" + nickName + '\'' +
            ", email='" + email + '\'' +
            ", password='" + password + '\'' +
            ", isVerified=" + isVerified +
            ", poolId='" + poolId + '\'' +
            ", uid='" + uid + '\'' +
            ", address=" + address +
            ", creditScore=" + creditScore +
            ", role='" + role + '\'' +
            '}';
  }
}
