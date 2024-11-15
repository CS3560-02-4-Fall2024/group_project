package com.group4.group_project.models;

public class User {
    // Attributes
    private int userID;
    private String name;
    private String telephoneNumber;
    private String emailAddress;

    // Constructor
    public User(int userID, String name, String telephoneNumber, String emailAddress) {
        this.userID = userID;
        this.name = name;
        this.telephoneNumber = telephoneNumber;
        this.emailAddress = emailAddress;
    }

    // Getter and Setter methods
    public int getUserID() { return userID; }
    public String getName() { return name; }
    public String getTelephoneNumber() { return telephoneNumber; }
    public String getEmailAddress() { return emailAddress; }
    public void setName(String name) { this.name = name; }
    public void setTelephoneNumber(String telephoneNumber) { this.telephoneNumber = telephoneNumber; }
    public void setEmailAddress(String emailAddress) { this.emailAddress = emailAddress; }
}
