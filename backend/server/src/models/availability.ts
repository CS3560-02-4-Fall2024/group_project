import {ResultSetHeader, RowDataPacket} from 'mysql2';
import {connection as db} from '../db';

export interface Availability extends RowDataPacket {
  id: number;
  dentistID: number;
  time: string;
  date: Date;
  status: string;
}

export class AvailabilityView {
  dentistID: number;
  time: string;
  date: Date;
  status: string;

  constructor(availability: Availability) {
    this.dentistID = availability.dentistID;
    this.time = availability.time;
    this.date = availability.date;
    this.status = availability.status;
  }
}

export abstract class AvailabilityTable {
  static insert(availability: Availability): Promise<Availability> {
    return new Promise((resolve, reject) => {
      db.query<ResultSetHeader>(
        `
INSERT INTO availability (date, timeSlot, isBooked) 
VALUES (?,?,?);
`,
        [availability.date, availability.timeSlot, availability.isBooked],
        (err, res) => {
          if (err) reject(err);
          else
            this.getById(res.insertId)
              .then((availability: Availability) => resolve(availability!))
              .catch(reject);
        },
      );
    });
  }

  static getById(availabilityID: number): Promise<Availability> {
    return new Promise<Availability>((resolve, reject) => {
      db.query<Availability[]>(
        'SELECT * FROM availability WHERE availabilityID = ?',
        [availabilityID],
        (err, res) => {
          if (err) reject(err);
          else if (res.length === 0) reject('availability not found');
          else resolve(res?.[0]);
        },
      );
    });
  }

  static getByEmail(email: string): Promise<Availability[]> {
    return new Promise<Availability[]>((resolve, reject) => {
      db.query<Availability[]>(
        `
SELECT 
    appointments.*, 
    dentists.name AS dentistName
FROM 
    appointments
JOIN 
    patients 
ON 
    appointments.patientId = patients.id
JOIN 
    dentists 
ON 
    appointments.dentistId = dentists.id
WHERE 
    patients.email = ?;
`,
        [email],
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        },
      );
    });
  }

  static getByAppointmentID(appointmentID: number): Promise<Availability> {
    return new Promise<Availability>((resolve, reject) => {
      db.query<Availability[]>(
        'SELECT * FROM availability WHERE appointmentID = ?',
        [appointmentID],
        (err, res) => {
          if (err) reject(err);
          else if (res.length === 0) reject('availability not found');
          else resolve(res?.[0]);
        },
      );
    });
  }

  static getByPatientId(patientID: number): Promise<Availability> {
    return new Promise<Availability>((resolve, reject) => {
      db.query<Availability[]>(
        'SELECT * FROM availability WHERE patientID = ?',
        [patientID],
        (err, res) => {
          if (err) reject(err);
          else if (res.length === 0) reject('availability not found');
          else resolve(res?.[0]);
        },
      );
    });
  }

  static getByDentistID(dentistID: number): Promise<Availability[]> {
    return new Promise<Availability[]>((resolve, reject) => {
      db.query<Availability[]>(
        'SELECT * FROM availability WHERE dentistId = ?',
        [dentistID],
        (err, res) => {
          if (err) reject(err);
          else if (res.length === 0) reject('availability not found');
          else resolve(res);
        },
      );
    });
  }

  static getIdAndDate(
    dentistID: number,
    date: string,
  ): Promise<Availability[]> {
    return new Promise<Availability[]>((resolve, reject) => {
      db.query<Availability[]>(
        'SELECT * FROM availability WHERE dentistId = ? and date LIKE ?',
        [dentistID, '' + date + '%'],
        (err, res) => {
          if (err) reject(err);
          else if (res.length === 0) reject('availability not found');
          else resolve(res);
        },
      );
    });
  }
}
