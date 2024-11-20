CREATE DATABASE IF NOT EXISTS groupProject;

USE groupProject;

CREATE TABLE IF NOT EXISTS patients
(
  id              INT unsigned NOT NULL AUTO_INCREMENT, # Unique ID for the record
  name            VARCHAR(150) NOT NULL,                # Name of the patient
  phone	          VARCHAR(20) NOT NULL, 				# Patient phone number
  email           VARCHAR(150) NOT NULL,				# Patient email
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS offices
(
  id              INT unsigned NOT NULL AUTO_INCREMENT,
  phone	          VARCHAR(20) NOT NULL,
  email           VARCHAR(150) NOT NULL,
  address         VARCHAR(150) NOT NULL,
  numRooms        INT unsigned NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS dentists
(
  id              INT unsigned NOT NULL AUTO_INCREMENT, # Unique ID for the record
  name            VARCHAR(150) NOT NULL,                # Name of the patient
  type 			  VARCHAR(150) NOT NULL,
  officeId        INT unsigned NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (officeId) REFERENCES offices(id)
);

CREATE TABLE IF NOT EXISTS availability (
    dentistId INT UNSIGNED NOT NULL,
    startTime DATETIME NOT NULL,
    endTime DATETIME NOT NULL,
    FOREIGN KEY (dentistId) REFERENCES dentists(id)
);

CREATE TABLE IF NOT EXISTS appointments
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    patientId INT unsigned NOT NULL,
    dentistId INT unsigned NOT NULL,
    appointmentTime DATETIME NOT NULL,
    FOREIGN KEY (patientId) REFERENCES patients(id),
    FOREIGN KEY (dentistId) REFERENCES dentists(id)
);