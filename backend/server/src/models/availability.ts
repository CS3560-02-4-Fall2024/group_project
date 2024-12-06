import {ResultSetHeader, RowDataPacket} from 'mysql2';
import {connection as db} from '../db';

export interface Availability extends RowDataPacket {
  id: number;
  dentistId: number;
  timeSlot: Date;
  status: string;
}

export class AvailabilityView {
  id: number;
  dentistId: number;
  timeSlot: Date;
  status: string;

  constructor(availability: Availability) {
    this.id = availability.id;
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
INSERT INTO availability (dentistId, timeSlot, status) 
VALUES (?,?,?);
`,
        [availability.dentistId, availability.timeSlot, availability.status],
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
          else resolve(res);
        },
      );
    });
  }

  static getByDentistIDAndTimeSlot(
    dentistId: number,
    timeSlot: String,
  ): Promise<Availability> {
    return new Promise<Availability>((resolve, reject) => {
      db.query<Availability[]>(
        'SELECT * FROM availability WHERE dentistId = ? AND timeSlot = ?',
        [dentistId, timeSlot.slice(0, 19)],
        (err, res) => {
          if (err) reject(err);
          else if (res.length === 0) reject('doctor not found');
          else resolve(res[0]);
        },
      );
    });
  }
  static book(availabilityId: number): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      db.query<ResultSetHeader>(
        `
UPDATE availability SET status = 'unavailable' WHERE id = ?
`,
        [availabilityId],
        (err, res) => {
          if (err) reject(err);
          else resolve(res.affectedRows);
        },
      );
    });
  }

  static updateAvailability(
    dentistId: number,
    timeSlot: String,
    status: string,
  ) {
    return new Promise<Availability>((resolve, reject) => {
      db.query<ResultSetHeader>(
        `
UPDATE availability SET status = ? WHERE dentistId = ? AND timeSlot = ?
`,
        [status, dentistId, timeSlot.slice(0, 19)],
        (err, res) => {
          if (err) reject(err);
          else {
            this.getByDentistIDAndTimeSlot(dentistId, timeSlot)
              .then((value: Availability) => {
                resolve(value!);
              })
              .catch(reject);
          }
        },
      );
    });
  }

  static delete(
    dentistId: number,
    start: String,
    end: String,
  ): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      db.query<ResultSetHeader>(
        `
DELETE FROM availability WHERE dentistId = ?
AND timeSlot BETWEEN ? AND ?
`,
        [dentistId, start.slice(0, 19), end.slice(0, 19)],
        (err, res) => {
          if (err) reject(err);
          else resolve(res.affectedRows);
        },
      );
    });
  }
}
