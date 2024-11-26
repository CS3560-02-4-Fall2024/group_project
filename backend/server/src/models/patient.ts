import {ResultSetHeader, RowDataPacket} from 'mysql2';
import {connection as db} from '../db';

export interface Patient extends RowDataPacket {
  id: number;
  name: string;
  phone: string;
  email: string;
  dateOfBirth: Date;
  address: string;
  insuranceCompany: string;
  passwordHash: string;
}

export abstract class PatientTable {
  static insert(patient: Patient): Promise<Patient> {
    return new Promise((resolve, reject) => {
      db.query<ResultSetHeader>(
        `
INSERT INTO patients (name, phone, email, dateOfBirth, address, insuranceCompany, passwordHash) 
VALUES (?,?,?,?,?,?,?);
`,
        [
          patient.name,
          patient.phone,
          patient.email,
          patient.dateOfBirth,
          patient.address,
          patient.insuranceCompany,
          patient.passwordHash,
        ],
        (err, res) => {
          if (err) reject(err);
          else
            this.getById(res.insertId)
              .then((patient: Patient) => resolve(patient!))
              .catch(reject);
        },
      );
    });
  }

  static getById(id: number): Promise<Patient> {
    return new Promise<Patient>((resolve, reject) => {
      db.query<Patient[]>(
        'SELECT * FROM patients WHERE id = ?',
        [id],
        (err, res) => {
          if (err) reject(err);
          else if (res.length == 0) reject('user not found');
          else resolve(res?.[0]);
        },
      );
    });
  }

  static getByEmail(email: string): Promise<Patient> {
    return new Promise<Patient>((resolve, reject) => {
      db.query<Patient[]>(
        'SELECT * FROM patients WHERE email = ?',
        [email],
        (err, res) => {
          if (err) reject(err);
          else if (res.length == 0) reject('user not found');
          else resolve(res[0]);
        },
      );
    });
  }
}
