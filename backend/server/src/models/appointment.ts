import {ResultSetHeader, RowDataPacket} from 'mysql2';
import {connection as db} from '../db';

export interface Appointment extends RowDataPacket {
  appointmentID: number;
  patientID: number;
  dentistID: number;
  status: string;
  date: Date;
  time: string;
  duration: number;
  purpose: string;
}

export class AppointmentView {
  patientID: number;
  dentistID: number;
  status: string;
  date: Date;
  time: string;
  duration: number;
  purpose: string;

  constructor(appointment: Appointment) {
    this.patientID = appointment.patientID;
    this.dentistID = appointment.dentistID;
    this.status = appointment.status;
    this.date = appointment.date;
    this.time = appointment.time;
    this.duration = appointment.duration;
    this.purpose = appointment.purpose;
  }
}

export abstract class AppointmentTable {
  static insert(appointment: Appointment): Promise<Appointment> {
    return new Promise((resolve, reject) => {
      db.query<ResultSetHeader>(
        `
                INSERT INTO appointments (patientID, dentistID, status, date, time, duration, purpose)
                VALUES (?, ?, ?, ?, ?, ?, ?,);
                `,
        [
          appointment.patientID,
          appointment.dentistID,
          appointment.status,
          appointment.date,
          appointment.time,
          appointment.duration,
          appointment.purpose,
        ],
        (err, res) => {
          if (err) reject(err);
          else
            this.getById(res.insertId)
              .then((newAppointment: Appointment) => resolve(newAppointment!))
              .catch(reject);
        },
      );
    });
  }

  static getById(id: number): Promise<Appointment> {
    return new Promise<Appointment>((resolve, reject) => {
      db.query<Appointment[]>(
        'SELECT * FROM appointments WHERE appointmentID = ?',
        [id],
        (err, res) => {
          if (err) reject(err);
          else if (res.length === 0) reject('Appointment not found');
          else resolve(res[0]);
        },
      );
    });
  }

  static getByPatientId(patientID: number): Promise<Appointment[]> {
    return new Promise<Appointment[]>((resolve, reject) => {
      db.query<Appointment[]>(
        'SELECT * FROM appointments WHERE patientID = ?',
        [patientID],
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        },
      );
    });
  }

  static getByDentistId(dentistID: number): Promise<Appointment[]> {
    return new Promise<Appointment[]>((resolve, reject) => {
      db.query<Appointment[]>(
        'SELECT * FROM appointments WHERE dentistID = ?',
        [dentistID],
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        },
      );
    });
  }

  static deleteById(id: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      db.query(
        'DELETE FROM appointments WHERE appointmentID = ?',
        [id],
        (err, res) => {
          if (err) reject(err);
          else resolve();
        },
      );
    });
  }

  static update(
    id: number,
    updatedData: Partial<Appointment>,
  ): Promise<Appointment> {
    return new Promise((resolve, reject) => {
      const fields = Object.keys(updatedData)
        .map(field => `${field} = ?`)
        .join(', ');
      const values = Object.values(updatedData);

      db.query(
        `UPDATE appointments SET ${fields} WHERE appointmentID = ?`,
        [...values, id],
        err => {
          if (err) reject(err);
          else this.getById(id).then(resolve).catch(reject);
        },
      );
    });
  }

  static getByDate(date: string): Promise<Appointment[]> {
    return new Promise((resolve, reject) => {
      db.query<Appointment[] & RowDataPacket[]>(
        'SELECT * FROM appointments WHERE date = ?',
        [date],
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        },
      );
    });
  }
}
