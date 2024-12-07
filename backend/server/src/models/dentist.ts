import {ResultSetHeader, RowDataPacket} from 'mysql2';
import {connection as db} from '../db';
import { faThemeisle } from '@fortawesome/free-brands-svg-icons';

export interface Dentist extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  officeId: number;
  type: string;
  passwordHash: string;
}

export class DentistView {
  id: number;
  name: string;
  email: string;
  officeId: number;
  type: string;

  constructor(dentist: Dentist) {
    this.id = dentist.id;
    this.name = dentist.name;
    this.email = dentist.email;
    this.officeId = dentist.officeId;
    this.type = dentist.type;
  }
}

export abstract class DentistTable {
  static insert(dentist: Dentist): Promise<Dentist> {
    return new Promise((resolve, reject) => {
      db.query<ResultSetHeader>(
        `
INSERT INTO dentists (name, type, email, officeId, passwordHash) 
VALUES (?,?,?,?,?);
        `,
        [
          dentist.name,
          dentist.type,
          dentist.email,
          dentist.officeId,
          dentist.passwordHash,
        ],
        (err, res) => {
          if (err) reject(err);
          else
            this.getById(res.insertId)
              .then((dentist: Dentist) => resolve(dentist!))
              .catch(reject);
        },
      );
    });
  }
  
  static getAll(): Promise<Dentist[]> {
    return new Promise<Dentist[]>((resolve, reject) => {
      db.query<Dentist[]>(
        'SELECT * FROM dentists',
        (err: any, res: Dentist[]) => {
          if (err) reject(err);
          else resolve(res);
        },
      );
    });
  }

  static getById(id: number): Promise<Dentist> {
    return new Promise<Dentist>((resolve, reject) => {
      db.query<Dentist[]>(
        'SELECT * FROM dentists WHERE id = ?',
        [id],
        (err, res) => {
          if (err) reject(err);
          else if (res.length === 0) reject('Dentist not found');
          else resolve(res?.[0]);
        },
      );
    });
  }

  static getByEmail(email: string): Promise<Dentist> {
    return new Promise<Dentist>((resolve, reject) => {
      db.query<Dentist[]>(
        'SELECT * FROM dentists WHERE email = ?',
        [email],
        (err, res) => {
          if (err) reject(err);
          else if (res.length === 0) reject('user not found');
          else resolve(res[0]);
        },
      );
    });
  }

  static update(id: number, dentist: Dentist) {
    return new Promise<Dentist>((resolve, reject) => {
      db.query<Dentist[]>(
        `
UPDATE dentists SET name = ?, email = ?, officeId = ?, type = ?
WHERE id = ?;
`,
        [dentist.name, dentist.email, dentist.officeId, dentist.type, id],
        (err, res) => {
          if (err) reject(err);
          else {
            this.getById(id)
              .then((value: Dentist) => resolve(value!))
              .catch(reject);
          }
        },
      );
    });
  }

  static delete(id: number) {
    return new Promise<number>((resolve, reject) => {
      db.query<ResultSetHeader>(
        'DELETE FROM dentists WHERE id = ?',
        [id],
        (err, res) => {
          if (err) reject(err);
          else resolve(res.affectedRows);
        },
      );
    });
  }
}
