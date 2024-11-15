package com.group4.group_project.models;

public class Room {
    // Attributes
    private String location;
    private int roomNumber;

    // Constructor
    public Room(String location, int roomNumber) {
        this.location = location;
        this.roomNumber = roomNumber;
    }

    // Getter and Setter methods
    public String getLocation() { return location; }
    public int getRoomNumber() { return roomNumber; }
    public void setLocation(String location) { this.location = location; }
    public void setRoomNumber(int roomNumber) { this.roomNumber = roomNumber; }
}
