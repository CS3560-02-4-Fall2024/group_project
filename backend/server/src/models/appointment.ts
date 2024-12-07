import {ResultSetHeader, RowDataPacket} from 'mysql2';
import {connection as db} from '../db';

export interface Appointment extends RowDataPacket {
  id: number;
  patientId: number;
  dentistId: number;
  timeSlot: Date;
  purpose: string;
}

export class AppointmentView {
  id: number;
  patientId: number;
  dentistId: number;
  timeSlot: Date;
  purpose: string;

  constructor(appointment: Appointment) {
    this.id = appointment.id;
    this.patientId = appointment.patientId;
    this.dentistId = appointment.dentistId;
    this.timeSlot = appointment.timeSlot;
    this.purpose = appointment.purpose;
  }
}

export abstract class AppointmentTable {
  static insert(appointment: Appointment): Promise<Appointment> {
    return new Promise((resolve, reject) => {
      db.query<ResultSetHeader>(
`
INSERT INTO appointments (patientID, dentistID, timeSlot, purpose)
VALUES (?, ?, ?, ?);
`,
        [
          appointment.patientId,
          appointment.dentistId,
          appointment.timeSlot,
          appointment.purpose,
        ],
        (err, res) => {
          if (err) reject(err);
          else{
            this.getById(res.insertId)
              .then((newAppointment: Appointment) => resolve(newAppointment!))
              .catch(reject);
          }
        },
      );
    });
  }

  static getById(id: number): Promise<Appointment> {
    return new Promise<Appointment>((resolve, reject) => {
      db.query<Appointment[]>(
        'SELECT * FROM appointments WHERE id = ?',
        [id],
        (err, res) => { if (err) reject(err); else if (res.length === 0) reject('Appointment not found');
          else {
            resolve(res?.[0]);
          }
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

  static delete(id: number): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      db.query<ResultSetHeader>('DELETE FROM appointments WHERE id = ?', [id], (err, res) => {
        if (err) reject(err);
        else resolve(res.affectedRows);
      });
    });
  }

  static getByDentistId(dentistID: number): Promise<Appointment[]> {
    return new Promise<Appointment[]>((resolve, reject) => {
      db.query<Appointment[]>(
        'SELECT * FROM appointments WHERE dentistId = ?',
        [dentistID],
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        },
      );
    });
  }
}
