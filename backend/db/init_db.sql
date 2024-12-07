DROP DATABASE IF EXISTS groupProject;

CREATE DATABASE groupProject;

USE groupProject;

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
    rooms INT unsigned NOT NULL
  );

CREATE TABLE
  dentists (
    id INT AUTO_INCREMENT PRIMARY KEY,
    officeId INT NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    name VARCHAR(150) NOT NULL,
    type VARCHAR(150) NOT NULL,
    passwordHash VARCHAR(255) NOT NULL,
    FOREIGN KEY (officeId) REFERENCES offices (id)
  );

CREATE TABLE
  availability (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Unique identifier for availability slots
    dentistId INT NOT NULL,
    timeSlot DATETIME NOT NULL,
    status ENUM ('available', 'unavailable') NOT NULL DEFAULT 'available',
    FOREIGN KEY (dentistId) REFERENCES dentists (id),
    UNIQUE (dentistId, timeSlot)
  );

CREATE TABLE
  appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patientId INT NOT NULL,
    dentistId INT NOT NULL,
    timeSlot DATETIME NOT NULL,
    purpose VARCHAR(255),
    FOREIGN KEY (patientId) REFERENCES patients (id),
    FOREIGN KEY (dentistId) REFERENCES dentists (id),
    UNIQUE (patientId, timeSlot),
    UNIQUE (dentistId, timeSlot)
  );
  
  
INSERT INTO
    offices (phone, email, address, rooms)
VALUES
    (
        '(123) 456-7890',
        'office1@example.com',
        '123 Elm Street, Springfield',
        5
    ),
    (
        '(987) 654-3210',
        'office2@example.com',
        '456 Oak Avenue, Metropolis',
        8
    ),
    (
        '(555) 123-4567',
        'office3@example.com',
        '789 Pine Road, Gotham',
        10
    ),
    (
        '(444) 987-6543',
        'office4@example.com',
        '101 Maple Street, Smallville',
        3
    ),
    (
        '(333) 222-1111',
        'office5@example.com',
        '202 Birch Lane, Star City',
        6
    );