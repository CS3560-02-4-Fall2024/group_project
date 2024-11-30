import {ResultSetHeader, RowDataPacket} from 'mysql2';
import {connection as db} from '../db';

export interface Dentist extends RowDataPacket {
  id: number;
  name: string;
  type: string;
  passwordHash: string;
}

export class DentistView {
  name: string;
  type: string;

  constructor(dentist: Dentist) {
    this.name = dentist.name;
    this.type = dentist.type;
  }
}

export abstract class DentistTable {
  static insert(dentist: Dentist): Promise<Dentist> {
    return new Promise((resolve, reject) => {
      db.query<ResultSetHeader>(
        `
        INSERT INTO dentists (name, type, passwordHash) 
        VALUES (?,?,?);
        `,
        [dentist.name, dentist.type, dentist.passwordHash],
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

  static getByName(name: string): Promise<Dentist> {
    return new Promise<Dentist>((resolve, reject) => {
      db.query<Dentist[]>(
        'SELECT * FROM dentists WHERE name = ?',
        [name],
        (err, res) => {
          if (err) reject(err);
          else if (res.length === 0) reject('Dentist not found');
          else resolve(res?.[0]);
        },
      );
    });
  }

  static getByType(type: string): Promise<Dentist[]> {
    return new Promise<Dentist[]>((resolve, reject) => {
      db.query<Dentist[]>(
        'SELECT * FROM dentists WHERE type = ?',
        [type],
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        },
      );
    });
  }
}
