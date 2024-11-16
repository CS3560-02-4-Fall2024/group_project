USE dentist;

CREATE TABLE IF NOT EXISTS patients
(
  id              INT unsigned NOT NULL AUTO_INCREMENT, # Unique ID for the record
  name            VARCHAR(150) NOT NULL,                # Name of the patient
  phone	          VARCHAR(20) NOT NULL, 				# Patient phone number
  email           VARCHAR(150) NOT NULL,				# Patient email
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS dentists
(
  id              INT unsigned NOT NULL AUTO_INCREMENT, # Unique ID for the record
  name            VARCHAR(150) NOT NULL,                # Name of the patient
  type 			  VARCHAR(150) NOT NULL,
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

CREATE TABLE IF NOT EXISTS appointments
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    patientID INT unsigned NOT NULL,
    dentistID INT unsigned NOT NULL,
    Status VARCHAR(50) NOT NULL,
    Date DATE NOT NULL,
    Time TIME NOT NULL,
    Duration INT NOT NULL COMMENT 'Duration in minutes',
    Purpose TEXT NOT NULL,
    FOREIGN KEY (patientID) REFERENCES patients(id),
    FOREIGN KEY (dentistID) REFERENCES dentists(id)
);