import {ResultSetHeader, RowDataPacket} from 'mysql2';
import {connection as db} from '../db';

export interface Appointment extends RowDataPacket {
  id: number;
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
                VALUES (?, ?, ?, ?, ?, ?, ?);
                `,
        [
          appointment.patientId,
          appointment.dentistId,
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
        'SELECT * FROM appointments WHERE id = ?',
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
    console.log('querying!');
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

  static cancelById(id: number): Promise<void> {
    console.log('deleting', id);

    return new Promise<void>((resolve, reject) => {
      db.query('DELETE FROM appointments WHERE id = ?', [id], (err, res) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  static getPastApptsByPatientId(patientId: number): Promise<Appointment[]> {
    return new Promise<Appointment[]>((resolve, reject) => {
      db.query<Appointment[]>(
        'SELECT * FROM appointments WHERE status = "Done" AND patientId = ?',
        [patientId],
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
        'SELECT * FROM appointments WHERE dentistID = ? AND status = "Done"',
        [dentistID],
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        },
      );
    });
  }

  static getByDentistIdScheduled(dentistID: number): Promise<Appointment[]> {
    return new Promise<Appointment[]>((resolve, reject) => {
      db.query<Appointment[]>(
        'SELECT * FROM appointments WHERE dentistID = ? AND status = "Scheduled"',
        [dentistID],
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        },
      );
    });
  }

  static getBofa(patientID: number, dentistID: number): Promise<Appointment[]> {
    return new Promise<Appointment[]>((resolve, reject) => {
      db.query<Appointment[]>(
        'SELECT * FROM appointments WHERE patientID = ? AND dentistID = ? AND status = "Done"',
        [patientID, dentistID],
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        },
      );
    });
  }
}
