package edu.sjsu.cmpe275.cartpool.dto;

public class SendMessageRequestBodyModel {
    private long senderId;

    private String recipientScreenName;

    private String message;

    public long getSenderId() {
        return senderId;
    }

    public void setSenderId(long senderId) {
        this.senderId = senderId;
    }

    public String getRecipientScreenName() {
        return recipientScreenName;
    }

    public void setRecipientScreenName(String recipientScreenName) {
        this.recipientScreenName = recipientScreenName;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "SendMessageRequestBodyModel{" +
                "senderId=" + senderId +
                ", recipientScreenName=" + recipientScreenName +
                ", message='" + message + '\'' +
                '}';
    }
}
