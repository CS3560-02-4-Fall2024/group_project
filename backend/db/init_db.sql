DROP DATABASE IF EXISTS groupProject;
CREATE DATABASE groupProject;

USE groupProject;

DROP TABLE IF EXISTS patients;
DROP TABLE IF EXISTS offices;
DROP TABLE IF EXISTS dentists;
DROP TABLE IF EXISTS availability;
DROP TABLE IF EXISTS appointments;

CREATE TABLE patients
(
  id              BINARY(16) PRIMARY KEY,
  name            VARCHAR(150) NOT NULL,
  phone	          VARCHAR(20) NOT NULL,
  email           VARCHAR(150) NOT NULL UNIQUE,
  dateOfBirth     DATE NOT NULL,
  address         VARCHAR(150) NOT NULL,
  insuranceCompany VARCHAR(150) NOT NULL,
  passwordHash    VARCHAR(255) NOT NULL
);

CREATE TABLE offices
(
  id              BINARY(16) PRIMARY KEY,
  phone	          VARCHAR(20) NOT NULL,
  email           VARCHAR(150) NOT NULL UNIQUE,
  address         VARCHAR(150) NOT NULL,
  numRooms        INT unsigned NOT NULL,
  passwordHash    VARCHAR(255) NOT NULL
);

CREATE TABLE dentists
(
  id              BINARY(16) PRIMARY KEY,
  name            VARCHAR(150) NOT NULL,
  type 			  VARCHAR(150) NOT NULL,
  officeId        BINARY(16) NOT NULL,
  FOREIGN KEY (officeId) REFERENCES offices(id)
);

CREATE TABLE availability (
    dentistId BINARY(16) NOT NULL,
    startTime DATETIME NOT NULL,
    endTime DATETIME NOT NULL,
    FOREIGN KEY (dentistId) REFERENCES dentists(id)
);

CREATE TABLE appointments
(
    id BINARY(16) PRIMARY KEY,
    patientId BINARY(16) NOT NULL,
    dentistId BINARY(16) NOT NULL,
    startTime DATETIME NOT NULL,
    endTime   DATETIME NOT NULL,
    purpose         VARCHAR(255),
    FOREIGN KEY (patientId) REFERENCES patients(id),
    FOREIGN KEY (dentistId) REFERENCES dentists(id)
);