package com.group4.group_project.models;

public class Dentist extends User{
    // Attribute specific to Dentist
    private String specialty;

    // Constructor
    public Dentist(int userID, String name, String telephoneNumber, String emailAddress, String specialty) {
        super(userID, name, telephoneNumber, emailAddress);
        this.specialty = specialty;
    }

    // Getter and Setter methods
    public String getSpecialty() { return specialty; }
    public void setSpecialty(String specialty) { this.specialty = specialty; }

    // Method to view dentist's schedule
    public void viewSchedule() {
        // Code
    }
}
