package com.group4.group_project.models;

public class Appointment {
    // Attributes
    private int appointmentID;
    private String date;
    private String time;
    private int duration;
    private String status;
    private String apptPurpose;

    // Constructor
    public Appointment(int appointmentID, String date, String time, int duration, String status, String apptPurpose) {
        this.appointmentID = appointmentID;
        this.date = date;
        this.time = time;
        this.duration = duration;
        this.status = status;
        this.apptPurpose = apptPurpose;
    }

    // Getter and Setter methods
    public int getAppointmentID() { return appointmentID; }
    public String getDate() { return date; }
    public String getTime() { return time; }
    public int getDuration() { return duration; }
    public String getStatus() { return status; }
    public String getApptPurpose() { return apptPurpose; }
    public void setDate(String date) { this.date = date; }
    public void setTime(String time) { this.time = time; }
    public void setDuration(int duration) { this.duration = duration; }
    public void setStatus(String status) { this.status = status; }
    public void setApptPurpose(String apptPurpose) { this.apptPurpose = apptPurpose; }

    // Method to schedule appointment
    public void scheduleAppointment() {
        // Code
    }
    // Method to update appointment status
    public void updateStatus(String newStatus) {
        // Code
    }
}