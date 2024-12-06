import {ResultSetHeader, RowDataPacket} from 'mysql2';
import {connection as db} from '../db';

export interface Availability extends RowDataPacket {
  id: number;
  dentistId: number;
  timeSlot: Date;
  status: string;
}

export class AvailabilityView {
  dentistId: number;
  timeSlot: Date;
  status: string;

  constructor(availability: Availability) {
    this.dentistId = availability.dentistId;
    this.timeSlot = availability.timeSlot;
    this.status = availability.status;
  }
}

export abstract class AvailabilityTable {
  static insert(availability: Availability): Promise<Availability> {
    return new Promise((resolve, reject) => {
      db.query<ResultSetHeader>(
        `
INSERT INTO availability (dentistId, startTime, status) 
VALUES (?,?,?);
`,
        [
          availability.dentistId,
          availability.timeSlot,
          availability.status,
        ],
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

  static getById(availabilityId: number): Promise<Availability> {
    return new Promise<Availability>((resolve, reject) => {
      db.query<Availability[]>(
        'SELECT * FROM availability WHERE id = ?',
        [availabilityId],
        (err, res) => {
          if (err) reject(err);
          else if (res.length === 0) reject('availability not found');
          else resolve(res?.[0]);
        },
      );
    });
  }

  static getByDentistID(dentistId: number): Promise<Availability[]> {
    return new Promise<Availability[]>((resolve, reject) => {
      db.query<Availability[]>(
        'SELECT * FROM availability WHERE dentistId = ?',
        [dentistId],
        (err, res) => {
          if (err) reject(err);
          else if (res.length === 0) reject('availability not found');
          else resolve(res);
        },
      );
    });
  }

  static delete(dentistId: number, start: Date, end: Date): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      db.query<ResultSetHeader>(
`
DELETE FROM availability WHERE dentistId = ?
AND timeSlot BETWEEN ? AND ?
`,
        [dentistId, start, end],
        (err, res) => {
          if (err) reject(err);
          else resolve(res.affectedRows);
        }
      )
    })
  }
}
