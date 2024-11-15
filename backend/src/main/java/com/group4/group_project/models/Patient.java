package com.group4.group_project.models;

public class Patient extends User {
    // Attributes specific to Patient
    private String dateOfBirth;
    private String physicalAddress;
    private String medicalHistory;

    // Constructor
    public Patient(int userID, String name, String telephoneNumber, String emailAddress,
                   String dateOfBirth, String physicalAddress, String medicalHistory) {
        super(userID, name, telephoneNumber, emailAddress);
        this.dateOfBirth = dateOfBirth;
        this.physicalAddress = physicalAddress;
        this.medicalHistory = medicalHistory;
    }

    // Getter and Setter methods
    public String getDateOfBirth() { return dateOfBirth; }
    public String getPhysicalAddress() { return physicalAddress; }
    public String getMedicalHistory() { return medicalHistory; }
    public void setDateOfBirth(String dateOfBirth) { this.dateOfBirth = dateOfBirth; }
    public void setPhysicalAddress(String physicalAddress) { this.physicalAddress = physicalAddress; }
    public void setMedicalHistory(String medicalHistory) { this.medicalHistory = medicalHistory; }

    // Method to view appointment history for this patient
    public void viewAppointmentHistory() {
        // Code
    }
}
