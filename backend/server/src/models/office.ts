import {QueryError, ResultSetHeader, RowDataPacket} from 'mysql2';
import {connection as db} from '../db';

export interface Office extends RowDataPacket {
  id: number;
  phone: string;
  email: string;
  address: string;
  rooms: number;
}

export class OfficeView {
  phone: string;
  email: string;
  address: string;
  rooms: number;

  constructor(office: Office) {
    this.phone = office.phone;
    this.email = office.email;
    this.address = office.address;
    this.rooms = office.rooms;
  }
}

export abstract class OfficeTable {
  static insert(office: Office): Promise<Office> {
    return new Promise((resolve, reject) => {
      db.query<ResultSetHeader>(
        `
INSERT INTO
    offices (phone, email, address, rooms)
VALUES
    (?, ?, ?, ?)
`,
        [office.phone, office.email, office.address, office.rooms],
        (err, res) => {
          if (err) {
            reject('dickhead');
          } else {
            this.getById(res.insertId)
              .then((office: Office) => resolve(office!))
              .catch(reject);
          }
        },
      );
    });
  }

  static getById(id: number): Promise<Office> {
    return new Promise<Office>((resolve, reject) => {
      db.query<Office[]>(
        'SELECT * FROM offices WHERE id = ?',
        [id],
        (err, res) => {
          if (err) reject(err);
          else if (res.length === 0) reject('user not found');
          else resolve(res?.[0]);
        },
      );
    });
  }

  static getAll(): Promise<Office[]> {
    return new Promise<Office[]>((resolve, reject) => {
      db.query<Office[]>(
        'SELECT * FROM offices',
        (err: QueryError, res: Office[]) => {
          if (err) reject(err);
          else resolve(res);
        },
      );
    });
  }

  static update(id: number, office: Office): Promise<Office> {
    return new Promise<Office>((resolve, reject) => {
      db.query<Office[]>(
        `
UPDATE offices SET phone = ?, email = ?, address = ?, rooms = ? WHERE id = ?;
`,
        [office.phone, office.email, office.address, office.rooms, id, id],
        (err, res) => {
          if (err) reject(err);
          else {
            this.getById(id)
              .then((office: Office) => resolve(office!))
              .catch(reject);
          }
        },
      );
    });
  }

  static delete(id: number): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      db.query<ResultSetHeader>(
        'DELETE FROM offices WHERE id = ?',
        [id],
        (err, res) => {
          if (err) reject(err);
          else resolve(res.affectedRows);
        },
      );
    });
  }
}
