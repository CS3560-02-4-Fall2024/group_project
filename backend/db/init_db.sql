DROP DATABASE IF EXISTS groupProject;

CREATE DATABASE groupProject;

USE groupProject;

DROP TABLE IF EXISTS patients;

DROP TABLE IF EXISTS offices;

DROP TABLE IF EXISTS dentists;

DROP TABLE IF EXISTS availability;

DROP TABLE IF EXISTS appointments;

CREATE TABLE
  patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    dateOfBirth DATE NOT NULL,
    address VARCHAR(150) NOT NULL,
    insuranceCompany VARCHAR(150) NOT NULL,
    passwordHash VARCHAR(255) NOT NULL
  );

CREATE TABLE
  offices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    address VARCHAR(150) NOT NULL,
    numRooms INT unsigned NOT NULL,
    passwordHash VARCHAR(255) NOT NULL
  );

CREATE TABLE
  dentists (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(150) NOT NULL UNIQUE,
    name VARCHAR(150) NOT NULL,
    type VARCHAR(150) NOT NULL,
    passwordHash VARCHAR(255) NOT NULL
  );

-- This shit wrong lmao
CREATE TABLE
  availability (
    dentistId INT NOT NULL,
    timeSlot DATETIME NOT NULL,
    FOREIGN KEY (dentistId) REFERENCES dentists (id)
  );

CREATE TABLE
  appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patientId INT NOT NULL,
    dentistId INT NOT NULL,
    status VARCHAR(150) NOT NULL,
    date VARCHAR(150) NOT NULL,
    time VARCHAR(150) NOT NULL,
    duration INT NOT NULL,
    purpose VARCHAR(255),
    FOREIGN KEY (patientId) REFERENCES patients (id),
    FOREIGN KEY (dentistId) REFERENCES dentists (id)
  );